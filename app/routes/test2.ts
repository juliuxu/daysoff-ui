import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "react-router";
import { Category } from "~/domain";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";

export const loader = async ({ context }: LoaderArgs) => {
  const api = new CachedDaysoffApi(context);
  return json({
    cabins: await api.fetchCabinsForCategory(Category.Mountain),
  });
};
