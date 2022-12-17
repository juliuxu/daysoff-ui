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
type Metadata = {
  createdDate: string;
};
type CacheOptions = {
  maxAge: number;
};
const kvCachedRequest = async <T>(
  kv: KVNamespace,
  key: string,
  options: CacheOptions,
  fn: () => T,
) => {
  let { value, metadata } = await kv.getWithMetadata<T, Metadata>(key, "json");
  const createdDate = metadata?.createdDate && new Date(metadata.createdDate);
  const now = new Date();
  if (
    value &&
    createdDate &&
    (now.getTime() - createdDate.getTime()) / 1000 < options.maxAge
  ) {
    return value;
  }

  value = await fn();

  metadata = { createdDate: new Date().toISOString() };
  await kv.put(key, JSON.stringify(value), {
    metadata,
  });
  return value;
};

export class CachedDaysoffApi {
  #context: AppLoadContext;
  #cacheOptions: CacheOptions;
  constructor(context: AppLoadContext, cacheOptions: Partial<CacheOptions>) {
    this.#context = context;
    this.#cacheOptions = { maxAge: Infinity, ...cacheOptions };
  }
  get #kv() {
    const kv = this.#context[config.KV_NAMESPACE] as KVNamespace;
    if (!kv)
      throw new Error(`kv namespace ${config.KV_NAMESPACE} not available`);
    return kv;
  }

  fetchCabinsShallowForCategory = (category: Category) =>
    kvCachedRequest(
      this.#kv,
      `fetchCabinsShallowForCategory-${category}`,
      this.#cacheOptions,
      () =>
        authenticatedRequest(
          () => fetchCabinsShallowForCategory(category),
          getAuth(this.#context),
        ),
    );

  fetchCabin = (cabinShallow: CabinShallow) =>
    kvCachedRequest(
      this.#kv,
      `fetchCabin-${cabinShallow.link}`,
      this.#cacheOptions,
      () =>
        authenticatedRequest(
          () => fetchCabin(cabinShallow),
          getAuth(this.#context),
        ),
    );

  fetchCabinsForCategory = (category: Category) =>
    kvCachedRequest(
      this.#kv,
      `fetchCabinsForCategory-${category}`,
      this.#cacheOptions,
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
