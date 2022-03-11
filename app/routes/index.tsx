import { json, LoaderFunction, useLoaderData } from "remix";
import { fetchCabinsForCategory, login } from "~/daysoffClient";
import {
  allowsDogs,
  CabinDetailed,
  Category,
  preparedCabin,
  hasSauna,
} from "~/domain";
import DebugData from "~/components/DebugData";
import React from "react";

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
          <Card key={cabin.link} cabin={cabin} />
        ))}
        <DebugData data={cabins} />
      </main>
    </>
  );
}

interface CabinsTableProps {
  cabins: CabinDetailed[];
}
const CabinTable = ({ cabins: cabinsRaw }: CabinsTableProps) => {
  interface SortState {
    name: string;
    dir: "🔼" | "🔽" | "";
  }
  const [sortState, setSortState] = React.useState<SortState>({
    name: "Lokasjon",
    dir: "",
  });
  const toggleSortState = (name: string) =>
    setSortState((current) => {
      if (name !== current.name) return { name, dir: "🔼" };
      else if (current.dir === "") return { name, dir: "🔼" };
      else if (current.dir === "🔼") return { name, dir: "🔽" };
      else return { name, dir: "🔼" };
    });

  const cabins = cabinsRaw.map(preparedCabin);
  if (sortState.dir !== "") {
    const x = (cabin: any) => {
      if (sortState.name === "Lokasjon") return cabin.locationName;
      if (sortState.name === "Soverom") return cabin.bedrooms;
      if (sortState.name === "Hunder") return cabin.allowsDogs;
      if (sortState.name === "Internett") return cabin.hasInternet;
      if (sortState.name === "Badstue") return cabin.hasSauna;
      if (sortState.name === "Boblebad") return cabin.hasHottub;
      throw new Error(`unhandled sort ${sortState.name}`);
    };
    cabins.sort((a, b) => {
      if (x(a) < x(b)) {
        return sortState.dir === "🔼" ? -1 : 1;
      }
      if (x(a) > x(b)) {
        return sortState.dir === "🔼" ? 1 : -1;
      }
      return 0;
    });
  }

  const Th = (name: string) => (
    <th scope="col" onClick={() => toggleSortState(name)}>
      {name} {name === sortState.name && sortState.dir}
    </th>
  );
  return (
    <figure>
      <table>
        <thead>
          <tr>
            {Th("Lokasjon")}
            {Th("Soverom")}
            {Th("Hunder")}
            {Th("Internett")}
            {Th("Badstue")}
            {Th("Boblebad")}
          </tr>
        </thead>
        <tbody>
          {cabins.map((cabin) => (
            <tr key={cabin.link}>
              <td>
                <a href={`${DAYSOFF_BASEURL}${cabin.link}`} target="_blank">
                  {cabin.locationName} ↗
                </a>
              </td>
              <td>{cabin.bedrooms}</td>
              <td>{cabin.allowsDogs ? "🐶" : "-"}</td>
              <td>{cabin.hasInternet ? "🌐" : "-"}</td>
              <td>{cabin.hasSauna ? "🧖" : "-"}</td>
              <td>{cabin.hasHottub ? "♨️" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};

interface CabinCardProps {
  cabin: CabinDetailed;
}
const DAYSOFF_BASEURL = "https://firmahytte.daysoff.no";
const Card = ({ cabin }: CabinCardProps) => {
  return (
    <article>
      <header>
        <a href={`${DAYSOFF_BASEURL}${cabin.link}`}>
          <h2>{cabin.title}</h2>
        </a>
      </header>
      {allowsDogs(cabin) && "🐶"}
      {hasSauna(cabin) && "🧖"}
      <img src={`${DAYSOFF_BASEURL}${cabin.images[0]}`} alt="" />
      <details>
        <summary>Beskrivelse</summary>
        <p dangerouslySetInnerHTML={{ __html: cabin.description }} />
      </details>
    </article>
  );
};
