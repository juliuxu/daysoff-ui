import { config } from "~/config";
import type { Cabin, DatePeriod } from "~/domain";
import { getPriceForPeriod } from "~/domain";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const currencyFormatter = new Intl.NumberFormat("no-nb", {
  style: "currency",
  currency: "NOK",
});

interface CabinLongCardListProps {
  cabins: Cabin[];
  period?: DatePeriod;
}
export const CabinLongCardList = ({
  cabins,
  period,
}: CabinLongCardListProps) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {cabins.map((cabin) => (
          <li key={cabin.link}>
            <a
              href={`${config.DAYSOFF_BASEURL}${cabin.link}`}
              target="_blank"
              className="block hover:bg-gray-50"
              rel="noreferrer"
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-24 w-24 rounded-3xl"
                      src={`${config.DAYSOFF_BASEURL}${cabin.images[0]}`}
                      alt=""
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">
                      {cabin.title}
                    </p>
                  </div>

                  <div className="">
                    <div className="flex items-center text-sm text-gray-500 sm:mt-0">
                      {period &&
                        currencyFormatter.format(
                          getPriceForPeriod(cabin, period),
                        )}
                    </div>
                  </div>
                </div>

                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
