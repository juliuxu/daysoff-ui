import { useLoaderData } from "@remix-run/react";
import { fixDatesInline } from "~/domain";
import { allowsDogs, Category } from "~/domain";

import { CabinTable } from "~/components/cabin-table";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";

export const loader = async ({ context }: LoaderArgs) => {
  const mountainCabins = await new CachedDaysoffApi(
    context,
    {},
  ).fetchCabinsForCategory(Category.Mountain);

  return json(mountainCabins);
};

export default function Index() {
  const rawCabins = useLoaderData<typeof loader>();
  const cabins = fixDatesInline(rawCabins);

  return (
    <>
      <header>
        <h1>Bedre daysoff visning</h1>
      </header>
      <main>
        <section>
          <fieldset onChange={(e) => console.log({ e: e.target })}>
            <legend>
              <strong>Filtrer hytter</strong>
            </legend>
            <label>
              <input role="switch" type="checkbox" name="allowDogs" />
              Hunder 🐶
            </label>
            <label>
              <input role="switch" type="checkbox" name="hasInternet" />
              Internett 🌐
            </label>
            <label>
              <input role="switch" type="checkbox" name="hasSauna" />
              Badstue 🧖
            </label>
            <label>
              <input role="switch" type="checkbox" name="hasHottub" />
              Boblebad ♨️
            </label>
          </fieldset>
        </section>
        Count: {cabins.length}
        <br />
        Count allow dogs: {cabins.filter((cabin) => allowsDogs(cabin)).length}
        <CabinTable cabins={cabins} />
        {/* {cabins.map((cabin) => (
          <CabinCard key={cabin.link} cabin={cabin} />
        ))} */}
        {/* <DebugData data={cabins} /> */}
      </main>
    </>
  );
}
