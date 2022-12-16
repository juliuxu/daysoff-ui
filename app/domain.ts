export interface LatLng {
  lat: string;
  lng: string;
}
export enum Category {
  Mountain = 1,
  Ocean = 2,
  Abroad = 3,
}

export interface CabinSimple {
  link: string;
  title: string;
  image: string;
}
export interface CabinDetailed {
  link: string;
  title: string;
  images: string[];
  specifications: Record<string, string>;
  description: string;
  rules: Record<string, string>;
  facilities: string[];
  location: LatLng;
  closeby: string[];
}

// Domain functions
export const allowsDogs = (cabin: CabinDetailed) =>
  cabin.rules.Husregler?.includes("Tillat med husdyr") &&
  !cabin.rules.Husregler?.includes("Ikke tillat med husdyr");

export const hasSauna = (cabin: CabinDetailed) =>
  cabin.facilities.includes("Badstue");

export const preparedCabin = (cabin: CabinDetailed) => ({
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

export const DAYSOFF_BASEURL = "https://firmahytte.daysoff.no";
