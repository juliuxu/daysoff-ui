import type { AppLoadContext } from "@remix-run/cloudflare";
import { config } from "~/config";
import type { Cabin, CabinShallow, Category } from "~/domain";
import { getAuth } from "~/utils/env";
import { chunked } from "~/utils/misc";
import {
  authenticatedRequest,
  fetchCabin,
  fetchCabinsShallowForCategory,
} from "./api";

// TODO: Implement max-age and stale-while-revalidate
const kvCachedRequest = async <T>(
  kv: KVNamespace,
  key: string,
  fn: () => T,
) => {
  let value = await kv.get<T>(key, "json");
  if (value) return value;

  value = await fn();

  await kv.put(key, JSON.stringify(value));
  return value;
};

export class CachedDaysoffApi {
  #context: AppLoadContext;
  constructor(context: AppLoadContext) {
    this.#context = context;
  }
  get #kv() {
    const kv = this.#context[config.KV_NAMESPACE] as KVNamespace;
    if (!kv)
      throw new Error(`kv namespace ${config.KV_NAMESPACE} not available`);
    return kv;
  }

  fetchCabinsShallowForCategory = (category: Category) =>
    kvCachedRequest(this.#kv, `fetchCabinsShallowForCategory-${category}`, () =>
      authenticatedRequest(
        () => fetchCabinsShallowForCategory(category),
        getAuth(this.#context),
      ),
    );

  fetchCabin = (cabinShallow: CabinShallow) =>
    kvCachedRequest(this.#kv, `fetchCabin-${cabinShallow.link}`, () =>
      authenticatedRequest(
        () => fetchCabin(cabinShallow),
        getAuth(this.#context),
      ),
    );

  fetchCabinsForCategory = (category: Category) =>
    kvCachedRequest(
      this.#kv,
      `fetchCabinsForCategory-${category}`,
      async () => {
        const cabinsShallow = await this.fetchCabinsShallowForCategory(
          category,
        );

        const cabins: Cabin[] = [];
        for (const chunk of chunked(cabinsShallow, 6)) {
          const res = await Promise.all(chunk.map(this.fetchCabin));
          cabins.push(...res);
        }
        return cabins;
      },
    );
}
