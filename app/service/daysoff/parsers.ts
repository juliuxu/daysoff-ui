import { load } from "cheerio";
import type { Cabin, CabinShallow } from "~/domain";

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
  };

  return cabin;
};
