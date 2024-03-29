import { config } from "~/config";
import type { Cabin, DatePeriod, CabinFeature } from "~/domain";
import { getGoogleMapsDirectionsFrom } from "~/domain";
import { cabinFeatures, cabinPropertyValues } from "~/domain";
import { CabinAttribute, cabinAttributes } from "~/domain";
import { getPriceForPeriod } from "~/domain";
import { datesBetween } from "~/utils/misc";
import { SortRow, useCabinsSort } from "./cabin-table";

const currencyFormatter = new Intl.NumberFormat("no-nb", {
  style: "currency",
  currency: "NOK",
});

export interface CabinCardProps {
  cabin: Cabin;
  period?: DatePeriod;
}
const CabinCard = ({ cabin, period }: CabinCardProps) => (
  <div
    className="block overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-xl"
    title={cabin.title}
  >
    <a
      href={`${config.DAYSOFF_BASEURL}${cabin.link}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="relative pb-[40%] sm:pb-[60%]">
        <img
          className="absolute h-full w-full object-cover"
          src={`${config.DAYSOFF_BASEURL}${cabin.images[0]}`}
          alt=""
        />
      </div>
    </a>
    <div className="p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {cabinAttributes[CabinAttribute.Beds](cabin)} senger &bull;{" "}
        {cabinAttributes[CabinAttribute.Bedrooms](cabin)} soverom
      </div>
      <a
        href={`${config.DAYSOFF_BASEURL}${cabin.link}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        <h2 className="truncate text-lg font-semibold leading-tight">
          {cabin.title}
        </h2>
      </a>
      <div className="mt-1">
        {period && (
          <>
            {currencyFormatter.format(getPriceForPeriod(cabin, period))}{" "}
            <span className="text-sm text-gray-600">
              / {datesBetween(period).length - 1}{" "}
              {datesBetween(period).length - 1 === 1 ? "natt" : "netter"}
            </span>
          </>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="font-semibold text-teal-600">
          {cabinAttributes[CabinAttribute.Location](cabin)}
        </span>
        <div className="flex gap-1 rounded-full bg-gray-100 px-2">
          {Object.keys(cabinFeatures)
            .map((key) => cabinPropertyValues[key as CabinFeature](cabin))
            .map((x, i) => (
              <div key={i} className="w-4">
                {x === "-" ? " " : x}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-1 flex items-end">
        {/* <a
          className="text-xs text-gray-800 hover:underline"
          target="_blank"
          href={getGoogleMapsLink(cabin)}
          rel="noreferrer"
        >
          Google Maps ↗
        </a> */}
        <a
          className="text-xs text-gray-800 hover:underline"
          target="_blank"
          href={getGoogleMapsDirectionsFrom(cabin, "Oslo")}
          rel="noreferrer"
        >
          Reise fra Oslo ↗
        </a>
      </div>
    </div>
  </div>
);

interface CabinLongCardListProps {
  cabins: Cabin[];
  period?: DatePeriod;
}
export const CabinCardList = ({
  cabins: cabinsRaw,
  period,
}: CabinLongCardListProps) => {
  const [cabins, sortState, toggleSortState] = useCabinsSort({
    cabinsRaw,
    period,
  });

  return (
    <div>
      <SortRow
        cabins={cabins}
        sortState={sortState}
        toggleSortState={toggleSortState}
        period={period}
      />
      <div className="mt-6" />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cabins.map((cabin) => (
          <li key={cabin.link}>
            <CabinCard cabin={cabin} period={period} />
          </li>
        ))}
      </ul>
    </div>
  );
};
