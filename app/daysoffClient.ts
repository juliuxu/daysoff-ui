import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { load } from "cheerio";
import LRU from "lru-cache";
import { CabinDetailed, CabinSimple, Category } from "./domain";

const cache = new LRU({ max: 500 });
const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const fetchToken = async () => {
  const parseToken = (data: string) => {
    const $ = load(data);
    const token = $("form input[name=_token]").first().attr("value");
    if (token === undefined) throw new Error("could not fetch token");
    return token;
  };
  const html = await client.get("https://firmahytte.daysoff.no/");
  return parseToken(html.data);
};
const login = async () => {
  const token = await fetchToken();
  const response = await client.post(
    "https://firmahytte.daysoff.no/check",
    new URLSearchParams({
      _token: token,
      email: process.env.DAYSOFF_EMAIL!,
      password: process.env.DAYSOFF_PASSWORD!,
    })
  );
  return {
    status: response.status,
  };
};

export const fetchCabinsSimple = async (
  category: Category
): Promise<CabinSimple[]> => {
  const cacheKey = `cabinsSimple-${category}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as CabinSimple[];
  }
  const response = await client.get(
    `https://firmahytte.daysoff.no/resultater?cat=${category}`
  );
  const $ = load(response.data);
  const cabinsRaw = $("a.search-results--listings--items__item").get();
  const cabins = cabinsRaw.map((e) => ({
    link: e.attribs.href,
    title: e.attribs.title,
    image: $(e).find("img").first().attr("src")!,
  }));

  cache.set(cacheKey, cabins);
  return cabins;
};

export const fetchCabinDetailed = async (
  cabinSimple: CabinSimple
): Promise<CabinDetailed> => {
  const cacheKey = `cabinDetailed-${cabinSimple.link}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as CabinDetailed;
  }

  const response = await client.get(
    `https://firmahytte.daysoff.no${cabinSimple.link}`
  );
  const $ = load(response.data);

  const locationMatch = response.data.match(
    /new google.maps.LatLng\((.+), (.+)\);/
  );
  const lat = locationMatch[1];
  const lng = locationMatch[2];

  const cabinDetailed = {
    link: cabinSimple.link,
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

  cache.set(cacheKey, cabinDetailed);
  return cabinDetailed;
};

// Helper
function chunk<T>(array: T[], size: number): T[][] {
  const chunkedArray = [];
  for (var i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

export const fetchAllCabins = async (category: Category) => {
  if (cache.has(`category-${category}`)) {
    return cache.get(`category-${category}`);
  }

  await login();
  const cabinsSimple = await fetchCabinsSimple(category);

  let cabinsDetailed: CabinDetailed[] = [];
  for (let cabins of chunk(cabinsSimple, 10)) {
    const res = await Promise.all(cabins.map(fetchCabinDetailed));
    cabinsDetailed = cabinsDetailed.concat(res);

    // Only fetch 10 when developing
    if (process.env.NODE_ENV === "development") {
      break;
    }
  }
  cache.set(`category-${category}`, cabinsDetailed);
  return cabinsDetailed;
};
