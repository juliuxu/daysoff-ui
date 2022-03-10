import { json, LoaderFunction, useLoaderData } from "remix";
import { fetchAllCabins } from "~/daysoffClient";
import { CabinDetailed, Category } from "~/domain";
import DebugData from "~/components/DebugData";

export const loader: LoaderFunction = async () => {
  const mountainCabins = await fetchAllCabins(Category.Mountain);
  return json(mountainCabins);
};

export default function Index() {
  const cabins = useLoaderData<CabinDetailed[]>();

  return (
    <>
      <header className="container">
        <h1>Daysoff, but better</h1>
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
        {cabins.map((cabin) => (
          <Card cabin={cabin} />
        ))}
        <DebugData data={cabins} />
      </main>
    </>
  );
}

// predicates
const allowsDogs = (cabin: CabinDetailed) =>
  cabin.rules.Husregler?.includes("Tillat med husdyr") &&
  !cabin.rules.Husregler?.includes("Ikke tillat med husdyr");

const hasSauna = (cabin: CabinDetailed) => cabin.facilities.includes("Badstue");

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
