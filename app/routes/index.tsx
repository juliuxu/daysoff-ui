import { json, LoaderFunction, useLoaderData } from "remix";
import { fetchCabinsForCategory, login } from "~/daysoffClient";
import {
  allowsDogs,
  CabinDetailed,
  Category,
  computedCabin,
  hasSauna,
} from "~/domain";
import DebugData from "~/components/DebugData";

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
          Filter
          <fieldset>
            <label>
              <input type="checkbox" name="allowDogs" />
              Allows dogs 🐶
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
const CabinTable = ({ cabins }: CabinsTableProps) => {
  return (
    <figure>
      <table>
        <thead>
          <tr>
            <th scope="col">Lokasjon</th>
            <th scope="col">Hunder</th>
            <th scope="col">Internett</th>
            <th scope="col">Badstue</th>
          </tr>
        </thead>
        <tbody>
          {cabins.map(computedCabin).map((cabin) => (
            <tr key={cabin.link}>
              <td>{cabin.locationName}</td>
              <td>{cabin.allowsDogs ? "🐶" : "🚫"}</td>
              <td>{cabin.hasInternet ? "🌐" : "🚫"}</td>
              <td>{cabin.hasSauna ? "🧖" : "🚫"}</td>
              <td>Cell</td>
              <td>Cell</td>
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
