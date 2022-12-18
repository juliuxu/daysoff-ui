import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { z } from "zod";

import {
  cabinProperties,
  CabinProperty,
  fixDatesInline,
  isAvailableForPeriod,
} from "~/domain";
import { Category } from "~/domain";

import { CabinTable } from "~/components/cabin-table";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";
import { DaterangeList } from "~/components/daterange-list";

const dateRangeSchema = z.preprocess((arg) => {
  if (typeof arg == "string") {
    return arg.split(":").map((x) => new Date(x));
  }
}, z.tuple([z.date(), z.date()]));

const formSchema = z.object({
  category: z.nativeEnum(Category),
  properties: z.array(z.nativeEnum(CabinProperty)).default([]),
  dates: z.array(dateRangeSchema).default([]),
});

export const loader = async ({ context, request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  if (!searchParams.has("category")) return redirect("/?category=1");

  const input = formSchema.parse({
    ...Object.fromEntries(searchParams),
    properties: searchParams.getAll("properties"),
    dates: searchParams.getAll("dates"),
  });

  const cabins = await new CachedDaysoffApi(context, {}).fetchCabinsForCategory(
    input.category,
  );

  // Selected date ranges
  const byAvailableDates = input.dates.map((daterange) => ({
    daterange,
    cabins: cabins.filter((cabin) => isAvailableForPeriod(cabin, daterange)),
  }));
  const availableCabins = new Set(
    byAvailableDates.flatMap((x) => x.cabins).map((x) => x.link),
  );

  const filteredCabins = cabins

    // Filter by available
    .filter(
      (cabin) => input.dates.length === 0 || availableCabins.has(cabin.link),
    )

    // Filter by properties
    .filter((cabin) =>
      input.properties.every((p) => cabinProperties[p](cabin)),
    );

  return json({ cabins: filteredCabins, input });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const cabins = fixDatesInline(data.cabins);
  const submit = useSubmit();

  return (
    <>
      <header>
        <h1>Bedre daysoff visning</h1>
      </header>
      <main>
        <section>
          <Form
            onChange={(e) => {
              submit(e.currentTarget);
            }}
          >
            <fieldset>
              <legend>
                <strong>Kategori</strong>
                {(Object.values(Category) as Category[]).map((x) => (
                  <label key={x}>
                    <input
                      type="radio"
                      name="category"
                      value={x}
                      defaultChecked={data.input.category === x}
                    />
                    {CategoryTitles[x]}
                  </label>
                ))}
              </legend>
            </fieldset>

            <fieldset>
              <legend>
                <strong>Filtrer hytter</strong>
              </legend>
              {(Object.values(CabinProperty) as CabinProperty[]).map((x) => (
                <label key={x}>
                  <input
                    type="checkbox"
                    name="properties"
                    value={x}
                    defaultChecked={data.input.properties?.includes(x)}
                  />
                  {CabinPropertyTitles[x]}
                </label>
              ))}
            </fieldset>
            <DaterangeList name="dates" defaultValues={data.input.dates} />
          </Form>
        </section>
        Count: {cabins.length}
        <CabinTable cabins={cabins} />
        {/* {cabins.map((cabin) => (
          <CabinCard key={cabin.link} cabin={cabin} />
        ))} */}
        {/* <DebugData data={cabins} /> */}
      </main>
    </>
  );
}

const CategoryTitles: Record<Category, React.ReactNode> = {
  [Category.Mountain]: "Fjellet 🗻",
  [Category.Ocean]: "Sjøen 🌊",
  [Category.Abroad]: "Utlandet ☀️",
};
const CabinPropertyTitles: Record<CabinProperty, React.ReactNode> = {
  [CabinProperty.Dogs]: "Hunder 🐶",
  [CabinProperty.Sauna]: "Badstue 🧖",
  [CabinProperty.Hottub]: "Boblebad ♨️",
  [CabinProperty.Internet]: "Internett 🌐",
};
