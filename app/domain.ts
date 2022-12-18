import type { SerializeFrom } from "@remix-run/cloudflare";

// Domain
export interface LatLng {
  lat: string;
  lng: string;
}
export enum Category {
  Mountain = 1,
  Ocean = 2,
  Abroad = 3,
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

// Fix Date
// export const fixDates = (cabinsRaw: SerializeFrom<Cabin[]>) =>
//   cabinsRaw.map<Cabin>((cabin) => ({
//     ...cabin,
//     availableBookingPeriods: cabin.availableBookingPeriods.map((x) => ({
//       ...x,
//       from: new Date(x.from),
//       to: new Date(x.to),
//     })),
//     priceData: {
//       ...cabin.priceData,
//       specialPricePeriods: cabin.priceData.specialPricePeriods.map((x) => ({
//         ...x,
//         from: new Date(x.from),
//         to: new Date(x.to),
//       })),
//     },
//   }));

// TODO: Test out performance
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

// Domain functions
export const allowsDogs = (cabin: Cabin) =>
  cabin.rules.Husregler?.includes("Tillat med husdyr") &&
  !cabin.rules.Husregler?.includes("Ikke tillat med husdyr");

export const hasSauna = (cabin: Cabin) => cabin.facilities.includes("Badstue");

export const preparedCabin = (cabin: Cabin) => ({
  ...cabin,

  get locationName() {
    return cabin.specifications.Beliggenhet;
  },
  get allowsDogs() {
    return allowsDogs(cabin);
  },
  get hasInternet() {
    return cabin.facilities.includes("Internett");
  },
  get hasSauna() {
    return hasSauna(cabin);
  },
  get hasHottub() {
    return cabin.facilities.includes("Boblebad");
  },
  get bedrooms() {
    return Number(cabin.specifications.Soverom);
  },
});
