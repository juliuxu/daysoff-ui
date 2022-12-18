import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { z } from "zod";

import type { DatePeriod } from "~/domain";
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
import { daterangeFormat, daterangeId } from "~/utils/misc";
import { config } from "~/config";

const dateRangeSchema = z.preprocess((arg) => {
  if (typeof arg == "string") {
    return arg.split(":").map((x) => new Date(x));
  }
}, z.tuple([z.date(), z.date()]));

const formSchema = z.object({
  category: z.nativeEnum(Category),
  features: z.array(z.nativeEnum(CabinFeature)).default([]),
  dates: z.array(dateRangeSchema).default([]),
});

export const loader = async ({ context, request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  if (!searchParams.has("category")) return redirect("/?category=1");

  const input = formSchema.parse({
    ...Object.fromEntries(searchParams),
    features: searchParams.getAll("features"),
    dates: searchParams.getAll("dates"),
  });

  let cabins = await new CachedDaysoffApi(context, {}).fetchCabinsForCategory(
    input.category,
  );

  // Filter by features
  cabins = cabins.filter((cabin) =>
    input.features.every((p) => cabinFeatures[p](cabin)),
  );

  // Selected date ranges
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

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const cabins = fixDatesInline(data.cabins);
  const byAvailableDates = data.byAvailableDates.map((x) => ({
    ...x,
    cabins: fixDatesInline(x.cabins),
  }));
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
              {(Object.values(CabinFeature) as CabinFeature[]).map((x) => (
                <label key={x}>
                  <input
                    type="checkbox"
                    name="features"
                    value={x}
                    defaultChecked={data.input.features?.includes(x)}
                  />
                  {CabinFeatureTitles[x]}
                </label>
              ))}
            </fieldset>
            <DaterangeList
              name="dates"
              defaultValues={data.input.dates}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form>
        </section>
        Count: {cabins.length}
        {/* By available dates */}
        <h2>Datoer</h2>
        {byAvailableDates.map(({ cabins, daterange }) => (
          <div key={daterangeId(daterange)}>
            <h3>{daterangeFormat(daterange)}</h3>
            {cabins.map((cabin) => (
              <div key={cabin.link}>
                {getPriceForPeriod(cabin, [
                  new Date(daterange[0]),
                  new Date(daterange[1]),
                ])}{" "}
                -{" "}
                <a
                  href={`${config.DAYSOFF_BASEURL}${cabin.link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cabin.title}
                </a>
              </div>
            ))}
          </div>
        ))}
        <h2>Alle</h2>
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
const CabinFeatureTitles: Record<CabinFeature, React.ReactNode> = {
  [CabinFeature.Dogs]: "Hunder 🐶",
  [CabinFeature.Sauna]: "Badstue 🧖",
  [CabinFeature.Hottub]: "Boblebad ♨️",
  [CabinFeature.Internet]: "Internett 🌐",
};
