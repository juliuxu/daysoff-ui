import type { DatePeriod } from "~/domain";

export function chunked<T>(array: T[], size: number): T[][] {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

export function uniqueBy<T>(list: T[], selector: (x: T) => any) {
  const s = new Set();
  const result: T[] = [];
  list.forEach((x) => {
    const key = selector(x);
    if (s.has(key)) return;
    result.push(x);
    s.add(key);
  });
  return result;
}

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Inclusive
export const datesBetween = ([from, to]: DatePeriod) => {
  const days = Math.round((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
  return [...new Array(days + 1)].map((_, i) => addDays(from, i));
};

type Daterange = [from: string, to: string];
const formatter = new Intl.DateTimeFormat("no-nb", { dateStyle: "full" });
export const daterangeId = ([from, to]: Daterange) => `${from}:${to}`;
export const daterangeFormat = ([from, to]: Daterange) =>
  formatter.formatRange(new Date(from), new Date(to));
