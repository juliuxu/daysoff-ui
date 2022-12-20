import type { SerializeFrom } from "@remix-run/cloudflare";
import { datesBetween } from "./utils/misc";

// Domain
export type DatePeriod = [from: Date, to: Date];
export interface LatLng {
  lat: string;
  lng: string;
}
export enum Category {
  Mountain = "1",
  Ocean = "2",
  Abroad = "3",
}

export interface CabinShallow {
  link: string;
  title: string;
  image: string;
}
export interface Cabin {
  link: string;
  title: string;
  images: string[];
  specifications: Record<string, string>;
  description: string;
  rules: Record<string, string>;
  facilities: string[];
  location: LatLng;
  closeby: string[];
  availableBookingPeriods: AvailableBookingPeriod[];
  priceData: PriceData;
}

export type AvailableBookingPeriod = {
  from: Date;
  to: Date;
  fullPeriodMandetory?: boolean;
};

export type SpecialPricePeriod = {
  from: Date;
  to: Date;
  price: number;
};
export type PriceMap = {
  [year: number]: {
    [month: number]: {
      // Sunday is 0, monday is 1, etc..
      [weekday: number]: number;
    };
  };
};
export type PriceData = PriceMap & {
  specialPricePeriods: SpecialPricePeriod[];
};

// TODO: Bug, http://127.0.0.1:8788/?category=1&features=dogs&features=sauna&dates=2023-01-06%3A2023-01-08
const getPriceForDay = (cabin: Cabin, date: Date) => {
  // First check special price
  const specialPricePeriod = cabin.priceData.specialPricePeriods.find(
    (x) => x.from <= date && date <= x.to,
  );
  if (specialPricePeriod) return specialPricePeriod.price;

  const res =
    cabin.priceData[date.getFullYear()]?.[date.getMonth()]?.[date.getDay()];

  return res ?? -999999;
};
export const getPriceForPeriod = (cabin: Cabin, datePeriod: DatePeriod) => {
  const cleaningFee = Number(cabin.rules.Utvask?.match(/(\d+) NOK/)?.[1] ?? 0);

  return (
    cleaningFee +
    datesBetween(datePeriod)
      .slice(0, -1)
      .map((x) => getPriceForDay(cabin, x))
      .reduce((acc, x) => acc + x, 0)
  );
};

// Fix Date
export const fixDatesInline = (cabinsRaw: SerializeFrom<Cabin[]>) => {
  for (const cabin of cabinsRaw) {
    for (const x of cabin.availableBookingPeriods) {
      (x as any).from = new Date(x.from);
      (x as any).to = new Date(x.to);
    }
    for (const x of cabin.priceData.specialPricePeriods) {
      (x as any).from = new Date(x.from);
      (x as any).to = new Date(x.to);
    }
  }
  return cabinsRaw as any as Cabin[];
};

// If a day price is 0, or does not exists, it is not a valid date that can't be booked
// the getPriceForDay returns a big negative number when that happens
const isValidAvailabilityBasedOnPrice = (
  cabin: Cabin,
  datePeriod: DatePeriod,
) =>
  datesBetween(datePeriod)
    .slice(0, -1)
    .map((x) => getPriceForDay(cabin, x))
    .reduce((acc, x) => acc + x, 0) > 0;

export const isAvailableForPeriod = (
  cabin: Cabin,
  [from, to]: [from: Date, to: Date],
) =>
  isValidAvailabilityBasedOnPrice(cabin, [from, to]) &&
  cabin.availableBookingPeriods.some(
    (availableBookingPeriod) =>
      availableBookingPeriod.from <= from && to <= availableBookingPeriod.to,
  );

export enum CabinFeature {
  Dogs = "dogs",
  Sauna = "sauna",
  Hottub = "hottub",
  Internet = "internet",
}
export const cabinFeatures: Record<CabinFeature, (cabin: Cabin) => boolean> = {
  [CabinFeature.Dogs]: (cabin) =>
    cabin.rules.Husregler?.includes("Tillat med husdyr") &&
    !cabin.rules.Husregler?.includes("Ikke tillat med husdyr"),
  [CabinFeature.Sauna]: (cabin) => cabin.facilities.includes("Badstue"),
  [CabinFeature.Hottub]: (cabin) => cabin.facilities.includes("Boblebad"),
  [CabinFeature.Internet]: (cabin) => cabin.facilities.includes("Internett"),
};

export enum CabinAttribute {
  Title = "title",
  Location = "location",
  Bedrooms = "bedrooms",
  Beds = "beds",
}
export const cabinAttributes = {
  [CabinAttribute.Title]: (cabin) => cabin.title,
  [CabinAttribute.Location]: (cabin) => cabin.specifications.Beliggenhet,
  [CabinAttribute.Bedrooms]: (cabin) => Number(cabin.specifications.Soverom),
  [CabinAttribute.Beds]: (cabin) => Number(cabin.specifications.Sengeplasser),
} satisfies Record<CabinAttribute, (cabin: Cabin) => any>;

export const cabinProperties = {
  ...cabinFeatures,
  ...cabinAttributes,
} as const;

export const cabinPropertyTitles: Record<CabinFeature, string> &
  Record<CabinAttribute, string> = {
  [CabinAttribute.Title]: "Tittel",
  [CabinAttribute.Location]: "Lokasjon",
  [CabinAttribute.Bedrooms]: "Soverom 🚪",
  [CabinAttribute.Beds]: "Sengeplasser 🛏",
  [CabinFeature.Dogs]: "Hunder 🐶",
  [CabinFeature.Sauna]: "Badstue 🧖",
  [CabinFeature.Hottub]: "Boblebad ♨️",
  [CabinFeature.Internet]: "Internett 🌐",
};
export const cabinPropertyValues: Record<
  CabinFeature,
  (cabin: Cabin) => string | number
> &
  Record<CabinAttribute, (cabin: Cabin) => string | number> = {
  ...cabinAttributes,
  [CabinFeature.Dogs]: (cabin) =>
    cabinFeatures[CabinFeature.Dogs](cabin) ? "🐶" : "-",
  [CabinFeature.Sauna]: (cabin) =>
    cabinFeatures[CabinFeature.Sauna](cabin) ? "🧖" : "-",
  [CabinFeature.Hottub]: (cabin) =>
    cabinFeatures[CabinFeature.Hottub](cabin) ? "♨️" : "-",
  [CabinFeature.Internet]: (cabin) =>
    cabinFeatures[CabinFeature.Internet](cabin) ? "🌐" : "-",
};

export const cabinCategoryTitles: Record<Category, React.ReactNode> = {
  [Category.Mountain]: "Fjellet 🗻",
  [Category.Ocean]: "Sjøen 🌊",
  [Category.Abroad]: "Utlandet ☀️",
};
