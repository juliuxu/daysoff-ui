import { useEffect, useId, useRef, useState } from "react";
import { daterangeId, daterangeFormat, dateToYearMonthDay } from "~/utils/misc";

type Daterange = [from: string, to: string];
interface DaterangeListProps {
  name: string;
  defaultValues: Daterange[];
  min?: string;
  counts: Record<string, number>;
}
export const DaterangeList = ({
  name,
  defaultValues,
  min,
  counts,
}: DaterangeListProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedDates, setSelectedDates] = useState(
    () =>
      defaultValues
        .slice()
        .sort((a, b) => (a < b ? -1 : 1))
        .map((l) => l.map(dateToYearMonthDay)) as Daterange[],
  );

  // Trigger onChange events after initial mount, when the user mutates the list
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (mounted) {
      selectRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  const add = (v: Daterange) => {
    setSelectedDates((l) => [...l, v].slice().sort((a, b) => (a < b ? -1 : 1)));
  };
  const remove = ([from, to]: Daterange) => {
    setSelectedDates((l) =>
      l.filter(([xFrom, xTo]) => xFrom !== from && xTo !== to),
    );
  };

  // Date range input
  const toRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const addDateRange = () => {
    if (!to || !from) return;
    add([from, to]);
    setFrom("");
    setTo("");
  };

  // Disabled in favor of manual button
  // useEffect(() => {
  //   if (from && to) {
  //     addDateRange();
  //     fromRef.current?.blur();
  //     toRef.current?.blur();
  //   } else if (from) {
  //     toRef.current?.focus();
  //     setTimeout(() => toRef.current?.showPicker?.(), 100);
  //   } else if (to) {
  //     fromRef.current?.focus();
  //     setTimeout(() => fromRef.current?.showPicker?.(), 100);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [from, to]);

  const id = useId();
  return (
    <>
      <ul className="flex flex-wrap gap-1 py-2 px-1">
        {selectedDates.map((v) => (
          <span
            key={daterangeId(v)}
            className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
          >
            <span>{daterangeFormat(v)}</span>
            <span className="text-sm text-gray-600">
              {" "}
              ({counts[daterangeId(v)]})
            </span>
            <button
              type="button"
              className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
              onClick={() => remove(v)}
            >
              <span className="sr-only">
                Fjern tidsrom {daterangeFormat(v)}
              </span>
              <svg
                className="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </button>
          </span>
        ))}
      </ul>

      <select
        ref={selectRef}
        name={name}
        multiple
        value={selectedDates.map(daterangeId)}
        hidden
        onChange={() => {}}
      >
        {selectedDates.map((v) => (
          <option key={daterangeId(v)} value={daterangeId(v)}>
            {daterangeFormat(v)}
          </option>
        ))}
      </select>

      <div>
        <label>
          Fra
          <input
            id={id + "-from"}
            ref={fromRef}
            type="date"
            value={from}
            min={min}
            max={to}
            onChange={(e) => {
              e.stopPropagation();
              setFrom(e.currentTarget.value);
            }}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>
        <label>
          Til
          <input
            id={id + "-to"}
            ref={toRef}
            type="date"
            value={to}
            min={from}
            onChange={(e) => {
              e.stopPropagation();
              setTo(e.currentTarget.value);
            }}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>

        <button disabled={!to || !from} onClick={() => addDateRange()}>
          Legg til
        </button>
      </div>
    </>
  );
};
