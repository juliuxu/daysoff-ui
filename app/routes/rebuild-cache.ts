import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "react-router";
import { z } from "zod";
import { Category } from "~/domain";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";

const formSchema = z.object({
  category: z.nativeEnum(Category).optional(),
});

export const loader = async ({ context, request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const input = formSchema.parse({
    ...Object.fromEntries(searchParams),
  });

  const api = new CachedDaysoffApi(context, { maxAge: 60 * 10 });
  if (input.category) {
    return json({
      [input.category]: await api.fetchCabinsForCategory(input.category),
    });
  }
  return json({
    mountain: await api.fetchCabinsForCategory(Category.Mountain),
    ocean: await api.fetchCabinsForCategory(Category.Ocean),
    abroad: await api.fetchCabinsForCategory(Category.Abroad),
  });
};
