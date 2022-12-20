import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { z } from "zod";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

import type { Cabin } from "~/domain";
import {
  CabinAttribute,
  cabinAttributes,
  cabinCategoryTitles,
  cabinPropertyTitles,
  DatePeriod,
} from "~/domain";
import {
  cabinFeatures,
  CabinFeature,
  fixDatesInline,
  isAvailableForPeriod,
  getPriceForPeriod,
} from "~/domain";
import { Category } from "~/domain";

import { CabinTable } from "~/components/cabin-table";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";
import { DaterangeList } from "~/components/daterange-list";
import { daterangeFormat, daterangeId, dateToYearMonthDay } from "~/utils/misc";
import { config } from "~/config";

const dateRangeSchema = z.preprocess((arg) => {
  if (typeof arg == "string") {
    return arg.split(":").map((x) => new Date(x));
  }
}, z.tuple([z.date(), z.date()]));

const formSchema = z.preprocess(
  (arg) => {
    if (typeof arg === "object" && arg !== null) {
      const attributes = Object.entries(arg)
        .filter(([key]) => key.startsWith("attributes-"))
        .map(([key, value]) => [key.split("-")[1], value]);
      return { ...arg, attributes };
    }
  },
  z.object({
    category: z.nativeEnum(Category),
    features: z.array(z.nativeEnum(CabinFeature)).default([]),
    attributes: z
      .array(z.tuple([z.nativeEnum(CabinAttribute), z.string()]))
      .default([]),
    dates: z.array(dateRangeSchema).default([]),
  }),
);

export const loader = async ({ context, request }: LoaderArgs) => {
  // Parse input
  const searchParams = new URL(request.url).searchParams;
  if (!searchParams.has("category")) return redirect("/?category=1");
  const input = formSchema.parse({
    ...Object.fromEntries(searchParams),
    features: searchParams.getAll("features"),
    attributes: searchParams.getAll("attributes"),
    dates: searchParams.getAll("dates"),
  });

  // Fetch data
  let cabins = await new CachedDaysoffApi(context, {}).fetchCabinsForCategory(
    input.category,
  );

  // Filter by features
  cabins = cabins.filter((cabin) =>
    input.features.every((p) => cabinFeatures[p](cabin)),
  );

  // Filter by attributes
  const stringMatch = (haystack: string, needle: string) =>
    haystack.toLowerCase().trim().includes(needle.toLowerCase().trim());
  const numberMinMatch = (haystack: number, needle: number) =>
    needle <= haystack;
  const attributeFilter: Record<
    CabinAttribute,
    (cabin: Cabin, value: string) => boolean
  > = {
    [CabinAttribute.Title]: (cabin, value) =>
      stringMatch(cabinAttributes[CabinAttribute.Title](cabin), value),
    [CabinAttribute.Location]: (cabin, value) =>
      stringMatch(cabinAttributes[CabinAttribute.Location](cabin), value),
    [CabinAttribute.Bedrooms]: (cabin, value) =>
      numberMinMatch(
        cabinAttributes[CabinAttribute.Bedrooms](cabin),
        Number(value),
      ),
    [CabinAttribute.Beds]: (cabin, value) =>
      numberMinMatch(
        cabinAttributes[CabinAttribute.Beds](cabin),
        Number(value),
      ),
  };
  console.log("filter", input.attributes);
  cabins = cabins.filter((cabin) =>
    input.attributes.every(([attribute, value]) =>
      attributeFilter[attribute](cabin, value),
    ),
  );

  // Group by date ranges
  const byAvailableDates = input.dates.map((daterange) => ({
    daterange,
    cabins: cabins.filter((cabin) => isAvailableForPeriod(cabin, daterange)),
  }));
  const availableCabins = new Set(
    byAvailableDates.flatMap((x) => x.cabins).map((x) => x.link),
  );

  // Filter by availability
  cabins = cabins.filter(
    (cabin) => input.dates.length === 0 || availableCabins.has(cabin.link),
  );

  return json({ cabins, byAvailableDates, input });
};

export default function Component() {
  const data = useLoaderData<typeof loader>();
  const cabins = fixDatesInline(data.cabins);
  const byAvailableDates = data.byAvailableDates.map((x) => ({
    ...x,
    cabins: fixDatesInline(x.cabins),
  }));

  return (
    <>
      <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Daysoff Søkeui
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Enklere finn en hytte som passer ditt behov (f.eks. tillater
            hunder), som er ledig på gitte dato, og innenfor en rimlig pris
          </p>
        </div>

        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <Filtering />
          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            {/* Table view */}
            <CabinTable cabins={cabins} />
          </div>
        </div>
      </main>
    </>
  );
}

const Filtering = () => {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();

  type Filter = {
    id: string;
    name: React.ReactNode;
    type: "radio" | "checkbox";
    options: {
      value: string;
      label: React.ReactNode;
      defaultChecked: boolean;
    }[];
  };
  // | {
  //     id: string;
  //     name: React.ReactNode;
  //     type: "number";
  //     options: { value: string; label: React.ReactNode }[];
  //   };

  const filters: Filter[] = [
    {
      id: "category",
      name: "Kategori",
      type: "radio",
      options: (Object.values(Category) as Category[]).map((x) => ({
        value: x,
        label: cabinCategoryTitles[x],
        defaultChecked: data.input.category?.includes(x),
      })),
    },
    {
      id: "features",
      name: "Egenskaper",
      type: "checkbox",
      options: (Object.values(CabinFeature) as CabinFeature[]).map((x) => ({
        value: x,
        label: cabinPropertyTitles[x],
        defaultChecked: data.input.features?.includes(x),
      })),
    },
  ];
  return (
    <aside>
      <h2 className="sr-only">Filters</h2>

      <Form
        onChange={(e) => {
          submit(e.currentTarget);
        }}
        className="space-y-10 divide-y divide-gray-200"
      >
        {filters.map((section, sectionIdx) => (
          <div
            key={sectionIdx}
            className={sectionIdx === 0 ? undefined : "pt-10"}
          >
            <fieldset>
              <legend className="block text-sm font-medium text-gray-900">
                {section.name}
              </legend>
              <div className="space-y-3 pt-6">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`${section.id}-${optionIdx}`}
                      name={`${section.id}`}
                      value={option.value}
                      defaultChecked={option.defaultChecked}
                      type={section.type}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        ))}

        {/* Attributes */}
        <div className="pt-10">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Attributter
            </legend>
            <div className="space-y-3 pt-6">
              <div className="flex items-center">
                <input
                  id={`attributes-${CabinAttribute.Title}`}
                  name={`attributes-${CabinAttribute.Title}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Title,
                    )?.[1]
                  }
                  type="search"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <label
                  htmlFor={`attributes-${CabinAttribute.Title}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Title]}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id={`attributes-${CabinAttribute.Location}`}
                  name={`attributes-${CabinAttribute.Location}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Location,
                    )?.[1]
                  }
                  type="search"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <label
                  htmlFor={`attributes-${CabinAttribute.Location}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Location]}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id={`attributes-${CabinAttribute.Bedrooms}`}
                  name={`attributes-${CabinAttribute.Bedrooms}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Bedrooms,
                    )?.[1]
                  }
                  type="number"
                  min={1}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <label
                  htmlFor={`attributes-${CabinAttribute.Bedrooms}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Bedrooms]}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id={`attributes-${CabinAttribute.Beds}`}
                  name={`attributes-${CabinAttribute.Beds}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Beds,
                    )?.[1]
                  }
                  type="number"
                  min={1}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <label
                  htmlFor={`attributes-${CabinAttribute.Beds}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Beds]}
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Dates */}
        <div className="pt-10">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Datoer
            </legend>
            <div className="space-y-3 pt-6">
              <DaterangeList
                name="dates"
                defaultValues={data.input.dates}
                min={dateToYearMonthDay(new Date())}
                counts={data.byAvailableDates
                  .map((x) => ({
                    [daterangeId(
                      x.daterange.map(dateToYearMonthDay) as [string, string],
                    )]: x.cabins.length,
                  }))
                  .reduce<Record<string, number>>(
                    (acc, x) => ({ ...acc, ...x }),
                    {},
                  )}
              />
            </div>
          </fieldset>
        </div>
      </Form>
    </aside>
  );
};
