import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "react-router";
import { Category } from "~/domain";
import { getAuth } from "~/utils/env";
import {
  fetchCabinsShallowForCategory,
  authenticatedRequest,
} from "~/service/daysoff/api";

export const loader = async ({ context }: LoaderArgs) => {
  const cabins = await authenticatedRequest(
    () => fetchCabinsShallowForCategory(Category.Mountain),
    getAuth(context),
  );

  return json({
    cabins,
  });
};
