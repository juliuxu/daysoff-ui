import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

import type { Cabin, DatePeriod } from "~/domain";
import { CabinAttribute, cabinAttributes } from "~/domain";
import {
  cabinFeatures,
  CabinFeature,
  fixDatesInline,
  isAvailableForPeriod,
} from "~/domain";
import { Category } from "~/domain";

import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";
import { daterangeFormat, daterangeId } from "~/utils/misc";
import { CabinCardList } from "~/components/cabin-card";
import { Filtering } from "~/components/filtering";

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
      <main className="mx-auto max-w-2xl py-16 px-4 sm:max-w-4xl sm:py-16 sm:px-4 lg:max-w-7xl lg:px-6">
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
          {/* Filter */}
          <Filtering />

          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            {/* Table view */}
            {/* <CabinTable cabins={cabins} /> */}

            {/* Card view */}
            {byAvailableDates.length === 0 && (
              <>
                <p className="mb-4 text-xl font-semibold uppercase tracking-wide text-gray-600">
                  {cabins.length} hytter
                </p>
                <CabinCardList cabins={cabins} />
              </>
            )}

            {/* Card view by availability */}
            <div className="flex flex-col gap-12">
              {byAvailableDates.map(
                ({ cabins: availableCabins, daterange }, i) => (
                  <section key={daterangeId(daterange)}>
                    <details
                      open={i === 0}
                      className="[&>summary>h2:before]:content-['►'] [&>summary>h2:before]:open:content-['▼']"
                    >
                      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                          {availableCabins.length} hytter
                        </p>
                        <h2 className="text-3xl hover:underline [&:before]:text-2xl [&:before]:text-gray-600">
                          {daterangeFormat(daterange)}
                        </h2>
                      </summary>
                      <div className="mt-4" />
                      <CabinCardList
                        period={daterange.map((x) => new Date(x)) as DatePeriod}
                        cabins={availableCabins}
                      />
                    </details>
                  </section>
                ),
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
