import React from "react";
import { config } from "~/config";
import type { Cabin } from "~/domain";
import { cabinPropertyValues } from "~/domain";
import { CabinAttribute } from "~/domain";
import { cabinProperties } from "~/domain";
import { cabinPropertyTitles } from "~/domain";

type SortKey = keyof typeof cabinProperties;
interface SortState {
  name: SortKey;
  dir: "🔼" | "🔽" | "";
}
interface CabinsTableProps {
  cabins: Cabin[];
}

export const CabinTable = ({ cabins: cabinsRaw }: CabinsTableProps) => {
  const cabins = cabinsRaw.slice();
  const [sortState, setSortState] = React.useState<SortState>({
    name: CabinAttribute.Location,
    dir: "",
  });
  const toggleSortState = (name: SortKey) =>
    setSortState((current) => {
      if (name !== current.name) return { name, dir: "🔽" };
      else if (current.dir === "") return { name, dir: "🔽" };
      else if (current.dir === "🔼") return { name, dir: "" };
      else return { name, dir: "🔼" };
    });

  if (sortState.dir !== "") {
    const x = (cabin: Cabin) => cabinProperties[sortState.name](cabin);
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

  return (
    <table>
      <thead>
        <tr>
          {Object.entries(cabinPropertyTitles).map(([key, title]) => (
            <th
              key={title}
              scope="col"
              // TODO: Make accessible
              className="cursor-pointer"
              onClick={() => toggleSortState(key as SortKey)}
            >
              {title} {key === sortState.name && sortState.dir}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cabins.map((cabin) => (
          <tr key={cabin.link}>
            {Object.keys(cabinPropertyTitles).map((key) => {
              if (key === CabinAttribute.Location) {
                return (
                  <td key={key}>
                    <a
                      href={`${config.DAYSOFF_BASEURL}${cabin.link}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {cabinProperties[key as SortKey](cabin)}
                    </a>
                  </td>
                );
              }
              return (
                <td key={key} className="text-ellipsis">
                  {cabinPropertyValues[key as SortKey](cabin)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
