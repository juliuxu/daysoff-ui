import makeFetchCookie from "fetch-cookie";
import { load } from "cheerio";
import type { CabinShallow, Category, Cabin } from "~/domain";
import { parseCabin, parseCabinsShallow } from "./parsers";
import { chunked } from "~/utils/misc";
import { config } from "~/config";

const daysoffFetch = makeFetchCookie(fetch);

const fetchToken = async () => {
  const parseToken = (data: string) => {
    const $ = load(data);
    const token = $("form input[name=_token]").first().attr("value");
    if (token === undefined) throw new Error("could not fetch token");
    return token;
  };

  const response = await daysoffFetch(`${config.DAYSOFF_BASEURL}/`);
  const text = await response.text();

  return parseToken(text);
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const token = await fetchToken();

  const formData = new FormData();
  formData.set("_token", token);
  formData.set("email", email);
  formData.set("password", password);

  const response = await daysoffFetch(`${config.DAYSOFF_BASEURL}/check`, {
    method: "POST",
    body: formData,
  });

  return {
    status: response.status,
  };
};

export const authenticatedRequest = async <T>(
  fn: () => T,
  { email, password }: { email: string; password: string },
) => {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Error && e.cause === ERROR_CAUSE_REDIRECT_RESPONSE) {
      await login({ email, password });
      return await fn();
    } else {
      throw e;
    }
  }
};

const setSearchCategory = async (category: Category) => {
  const token = await fetchToken();

  const formData = new FormData();
  formData.set("_token", token);
  formData.set("category", category);

  const response = await daysoffFetch(
    `${config.DAYSOFF_BASEURL}/changeSearchCategoryFilter`,
    {
      method: "POST",
      body: formData,
    },
  );

  return {
    status: response.status,
  };
};

export const ERROR_CAUSE_REDIRECT_RESPONSE = "ERROR_CAUSE_REDIRECT_RESPONSE";
export const fetchCabinsShallowForCategory = async (category: Category) => {
  await setSearchCategory(category);
  const response = await daysoffFetch(
    `${config.DAYSOFF_BASEURL}/resultater?cat=${category}`,
    {
      redirect: "manual",
    },
  );
  if (!response.ok) {
    throw new Error("Got redirect", { cause: ERROR_CAUSE_REDIRECT_RESPONSE });
  }

  const data = parseCabinsShallow(await response.text());
  return data;
};

export const fetchCabin = async (cabinShallow: CabinShallow) => {
  const response = await daysoffFetch(
    `${config.DAYSOFF_BASEURL}${cabinShallow.link}`,
    {
      redirect: "error",
    },
  );
  const data = parseCabin(await response.text(), cabinShallow.link);
  return data;
};

export const fetchCabinsForCategory = async (category: Category) => {
  const cabinsShallow = await fetchCabinsShallowForCategory(category);

  const cabins: Cabin[] = [];
  for (const chunk of chunked(cabinsShallow, 6)) {
    const res = await Promise.all(chunk.map(fetchCabin));
    cabins.push(...res);
  }
  return cabins;
};
