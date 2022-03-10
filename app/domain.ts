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
  location: { lat: string; lng: string };
  closeby: string[];
}
