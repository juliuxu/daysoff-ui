import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "react-router";
import { Category } from "~/domain";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";

export const loader = async ({ context }: LoaderArgs) => {
  const api = new CachedDaysoffApi(context, { maxAge: 60 * 3 });
  return json({
    mountain: await api.fetchCabinsForCategory(Category.Mountain),
    ocean: await api.fetchCabinsForCategory(Category.Ocean),
    abroad: await api.fetchCabinsForCategory(Category.Abroad),
  });
};
