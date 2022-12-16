import { useLoaderData } from "@remix-run/react";
import { fetchCabinsForCategory } from "~/service/daysoff";
import type { CabinDetailed } from "~/domain";
import { allowsDogs, Category } from "~/domain";
import { DebugData } from "~/components/debug-data";
import { CabinCard } from "~/components/cabin-card";
import { CabinTable } from "~/components/cabin-table";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async () => {
  let mountainCabins: CabinDetailed[];
  mountainCabins = await fetchCabinsForCategory(Category.Mountain);
  return json(mountainCabins);
};

export default function Index() {
  const cabins = useLoaderData<CabinDetailed[]>();

  return (
    <>
      <header className="container">
        <h1>Bedre daysoff visning</h1>
      </header>
      <main className="container">
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
        {cabins.map((cabin) => (
          <CabinCard key={cabin.link} cabin={cabin} />
        ))}
        <DebugData data={cabins} />
      </main>
    </>
  );
}
