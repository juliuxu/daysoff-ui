import { load } from "cheerio";
import type {
  Cabin,
  CabinShallow,
  AvailableBookingPeriod,
  PriceMap,
  PriceData,
  SpecialPricePeriod,
} from "~/domain";

export const parseCabinsShallow = (data: string): CabinShallow[] => {
  const $ = load(data);
  const cabinsRaw = $("a.search-results--listings--items__item").get();
  if (cabinsRaw.length === 0) throw new Error("Error parsing cabins");

  const cabins = cabinsRaw.map((e) => ({
    link: e.attribs.href,
    title: e.attribs.title,
    image: $(e).find("img").first().attr("src")!,
  }));

  return cabins;
};

export const parseCabin = (data: string, link: string): Cabin => {
  const $ = load(data);
  if ($(".object--specifications__item").length === 0)
    throw new Error("Could not parse cabin");

  // Location
  const locationMatch = data.match(/new google.maps.LatLng\((.+), (.+)\);/);
  if (!locationMatch) {
    throw new Error("Could not get location data for cabin");
  }
  const lat = locationMatch[1];
  const lng = locationMatch[2];

  const cabin: Cabin = {
    link,
    title: $("h1").text(),
    images: $(".image_lightbox--images--item")
      .get()
      .map((e) => $(e).find("img").attr("src")!),
    specifications: $(".object--specifications__item")
      .get()
      .map((e) => ({
        [$(e).find(".specification-label").text()]: $(e)
          .find(".specification-content")
          .text(),
      }))
      .reduce((acc, x) => ({ ...acc, ...x }), {}),
    description: $(".object--description > .column").html()!.trim(),
    rules: $(".object--rules__content__content")
      .get()
      .map((e) => ({
        [$(e).find("h2").text()]: $(e)
          .html()!
          .replace(/\<h2\>.+\<\/h2\>/, "")
          .trim(),
      }))
      .reduce((acc, x) => ({ ...acc, ...x }), {}),
    facilities: $(".object--facilities__list--item")
      .get()
      .map((e) => $(e).text().trim()),
    location: { lat, lng },
    closeby: $(".object--closeby__wrap__item--content")
      .get()
      .map((e) => $(e).find("h3").text().trim()),
    availableBookingPeriods: parseAvailableBookingPeriods(data),
    priceData: parsePriceData(data),
  };

  return cabin;
};

const parsePriceData = (data: string): PriceData => {
  // Parse
  const landlord_discount = Number(
    data.match(/const landlord_discount = (\d+);/)?.[1],
  );
  const applyLandlordDiscount = (n: number) =>
    n * ((100 - landlord_discount) / 100);

  const specialPriceData = JSON.parse(
    data.match(/const specialpricedata = (.+);/)?.[1] ?? "[]",
  ) as Record<string, DaysoffResponseSpecialPriceData>;
  const priceData = JSON.parse(
    data.match(/const pricedata = (.+);/)?.[1] ?? "[]",
  ) as DaysoffResponsePriceData[];

  const result: PriceData = {
    specialPricePeriods: [],
  };

  // Prepare special price periods
  result.specialPricePeriods = Object.values(specialPriceData)
    .sort((a, b) => (a.date_from < b.date_from ? -1 : 1))
    .map<SpecialPricePeriod>((x) => ({
      from: new Date(x.date_from),
      to: new Date(x.date_to),
      price: x.price.map(Number).map(applyLandlordDiscount)[0],
    }));

  // Prepare price map
  for (const year of priceData) {
    result[Number(year.year)] = {};
    for (const monthsChunk of year.data) {
      const prices = monthsChunk.prices.map(Number).map(applyLandlordDiscount);
      (monthsChunk.months ?? [...Array(12).keys()])
        .map(Number)
        .forEach((month) => {
          result[Number(year.year)][month] = prices;
        });
    }
  }

  return result;
};

const parseAvailableBookingPeriods = (
  data: string,
): AvailableBookingPeriod[] => {
  const dateData = JSON.parse(
    data.match(/const datedata = (.+);/)?.[1] ?? "[]",
  ) as DaysoffResponseDateData[];

  // Prepare
  // Calculdate 2 years from now
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setFullYear(start.getFullYear() + 2);

  const sortedDateData = dateData
    .slice()
    // Lets worry about the mandatory-period later
    .filter((x) => x.type === "blocked")
    .sort((a, b) => (a.time_from < b.time_from ? -1 : 1));
  const boundedDateData: DaysoffResponseDateData[] = [
    { time_from: "2000-01-01", time_to: start.toISOString(), type: "blocked" },
    ...sortedDateData,
    { time_from: end.toISOString(), time_to: "9999-01-01", type: "blocked" },
  ];

  const result: AvailableBookingPeriod[] = [];
  let current = start;
  for (const x of boundedDateData) {
    const blockedFrom = new Date(x.time_from);
    const blockedTo = new Date(x.time_to);
    if (current > blockedTo) continue;
    if (current < blockedFrom) {
      result.push({
        from: current,
        to: blockedFrom,
      });
    }

    current = blockedTo;
  }

  return result;
};

// Response
export type DaysoffResponseDateData = {
  time_from: string;
  time_to: string;
  type: "mandatory-period" | "blocked";
};
export type DaysoffResponseSpecialPriceData = {
  date_from: string;
  date_to: string;
  price: string[]; // ["2200"]
};
export type DaysoffResponsePriceData = {
  year: string; // "2022"
  data: {
    months?: string[]; // ["10", "11"]
    prices: string[]; // ["1200", "1200", "1200", "1200", "2400", "2400", "1200"]
    matrix: number; // 19
  }[];
};
