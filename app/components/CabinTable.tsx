import React from "react";
import { CabinDetailed, preparedCabin, DAYSOFF_BASEURL } from "~/domain";

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

export default CabinTable;
