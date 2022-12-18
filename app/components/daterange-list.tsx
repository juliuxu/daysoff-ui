import { useEffect, useRef, useState } from "react";

const formatter = new Intl.DateTimeFormat("no-nb", { dateStyle: "full" });
const daterangeId = ([from, to]: Daterange) => `${from}:${to}`;
const daterangeFormat = ([from, to]: Daterange) =>
  formatter.formatRange(new Date(from), new Date(to));

type Daterange = [from: string, to: string];
interface DaterangeListProps {
  name: string;
  defaultValues: Daterange[];
  min?: string;
}
export const DaterangeList = ({
  name,
  defaultValues,
  min,
}: DaterangeListProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedDates, setSelectedDates] = useState(
    () =>
      defaultValues
        .slice()
        .sort((a, b) => (a < b ? -1 : 1))
        .map((l) => l.map((d) => d.split("T")[0])) as Daterange[],
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

  return (
    <>
      <fieldset>
        <legend>
          <strong>Dato</strong>
        </legend>
        <ul className="flex flex-wrap gap-1">
          {selectedDates.map((v) => (
            <li
              key={daterangeId(v)}
              className="inline-block border p-0.5 text-sm"
            >
              {daterangeFormat(v)}
              <button onClick={() => remove(v)}>X</button>
            </li>
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
      </fieldset>

      <div>
        <label>
          Fra
          <input
            ref={fromRef}
            type="date"
            value={from}
            min={min}
            max={to}
            onChange={(e) => {
              e.stopPropagation();
              setFrom(e.currentTarget.value);
            }}
          />
        </label>
        <label>
          Til
          <input
            ref={toRef}
            type="date"
            value={to}
            min={from}
            onChange={(e) => {
              e.stopPropagation();
              setTo(e.currentTarget.value);
            }}
          />
        </label>

        <button disabled={!to || !from} onClick={() => addDateRange()}>
          Legg til
        </button>
      </div>
    </>
  );
};
