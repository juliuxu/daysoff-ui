import { json, useLoaderData } from "remix";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { load } from "cheerio";
import React from "react";

// api.ts
const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const parseToken = (data: string) => {
  const $ = load(data);
  const token = $("form input[name=_token]").first().attr("value");
  if (token === undefined) throw new Error("could not fetch token");
  return token;
};
const fetchToken = async () => {
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

enum Category {
  Mountain = 1,
  Beach = 2,
  Abroad = 3,
}
interface CabinSimple {
  link: string;
  title: string;
  image: string;
}
const fetchCabins = async (category: Category): Promise<CabinSimple[]> => {
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

  return cabins;
};

interface CabinDetailed {}

const fetchCabinDetails = async (
  cabinSimple: CabinSimple
): Promise<CabinDetailed> => {
  const response = await client.get(
    `https://firmahytte.daysoff.no${cabinSimple.link}`
  );
  const $ = load(response.data);

  const locationMatch = response.data.match(
    /new google.maps.LatLng\((.+), (.+)\);/
  );
  const lat = locationMatch[1];
  const lng = locationMatch[2];

  return {
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
};

export async function loader() {
  await login();
  const cabinsSimple = await fetchCabins(Category.Mountain);

  // Get info of the 5 first
  // const cabinsDetailed = await Promise.all(
  //   cabinsSimple.slice(1).map(fetchCabinDetails)
  // );
  const cabinsDetailed = await fetchCabinDetails(cabinsSimple[0]);

  return json({ cabinsDetailed, cabinsSimple });
}

const DebugData = ({ data }: { data: any }) => {
  if (typeof data === "string") return <pre>{data}</pre>;
  const entries = Object.entries(data).map(([key, value]) => (
    <React.Fragment key={key}>
      <h3>{key}</h3>
      <pre>
        {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
      </pre>
    </React.Fragment>
  ));
  return <>{entries}</>;
};

export default function Index() {
  const data = useLoaderData();

  return (
    <>
      <header>
        <h1>Hello, worldz</h1>
        <DebugData data={data} />
      </header>
    </>
  );
}
