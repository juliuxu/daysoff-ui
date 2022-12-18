import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { z } from "zod";

import { cabinProperties, CabinProperty, fixDatesInline } from "~/domain";
import { Category } from "~/domain";

import { CabinTable } from "~/components/cabin-table";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { CachedDaysoffApi } from "~/service/daysoff/cf-cached-api";
import React, { useEffect, useRef, useState } from "react";

const dateRangeSchema = z.preprocess((arg) => {
  if (typeof arg == "string") {
    return arg.split("_").map((x) => new Date(x));
  }
}, z.tuple([z.date(), z.date()]));

const formSchema = z.object({
  category: z.nativeEnum(Category),
  properties: z.array(z.nativeEnum(CabinProperty)).default([]),
  dates: z.array(dateRangeSchema).default([]),
});

export const loader = async ({ context, request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  if (!searchParams.has("category")) return redirect("/?category=1");

  const input = formSchema.parse({
    ...Object.fromEntries(searchParams),
    properties: searchParams.getAll("properties"),
    dates: searchParams.getAll("dates"),
  });

  const cabins = await new CachedDaysoffApi(context, {}).fetchCabinsForCategory(
    input.category,
  );

  const filteredCabins = cabins.filter((cabin) =>
    input.properties.every((p) => cabinProperties[p](cabin)),
  );

  return json({ cabins: filteredCabins, input });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const cabins = fixDatesInline(data.cabins);
  const submit = useSubmit();

  return (
    <>
      <header>
        <h1>Bedre daysoff visning</h1>
      </header>
      <main>
        <section>
          <Form
            onChange={(e) => {
              console.log("got onChange", e);
              submit(e.currentTarget);
            }}
          >
            <fieldset>
              <legend>
                <strong>Kategori</strong>
                {(Object.values(Category) as Category[]).map((x) => (
                  <label key={x}>
                    <input
                      type="radio"
                      name="category"
                      value={x}
                      defaultChecked={data.input.category === x}
                    />
                    {CategoryTitles[x]}
                  </label>
                ))}
              </legend>
            </fieldset>

            <fieldset>
              <legend>
                <strong>Filtrer hytter</strong>
              </legend>
              {(Object.values(CabinProperty) as CabinProperty[]).map((x) => (
                <label key={x}>
                  <input
                    type="checkbox"
                    name="properties"
                    value={x}
                    defaultChecked={data.input.properties?.includes(x)}
                  />
                  {CabinPropertyTitles[x]}
                </label>
              ))}
            </fieldset>
            <DaterangeList name="dates" defaultValues={data.input.dates} />
          </Form>
        </section>
        Count: {cabins.length}
        <CabinTable cabins={cabins} />
        {/* {cabins.map((cabin) => (
          <CabinCard key={cabin.link} cabin={cabin} />
        ))} */}
        {/* <DebugData data={cabins} /> */}
      </main>
    </>
  );
}

const CategoryTitles: Record<Category, React.ReactNode> = {
  [Category.Mountain]: "Fjellet 🗻",
  [Category.Ocean]: "Sjøen 🌊",
  [Category.Abroad]: "Utlandet ☀️",
};
const CabinPropertyTitles: Record<CabinProperty, React.ReactNode> = {
  [CabinProperty.Dogs]: "Hunder 🐶",
  [CabinProperty.Sauna]: "Badstue 🧖",
  [CabinProperty.Hottub]: "Boblebad ♨️",
  [CabinProperty.Internet]: "Internett 🌐",
};

interface DaterangeListProps {
  name: string;
  defaultValues: [from: string, to: string][];
}
const DaterangeList = ({ name, defaultValues }: DaterangeListProps) => {
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const [selectedDates, setSelectedDates] = useState(() =>
    defaultValues
      .slice()
      .sort((a, b) => (a < b ? -1 : 1))
      .map((l) => l.map((d) => d.split("T")[0])),
  );
  const triggerOnChange = () => {
    const e = new Event("change");
    fieldsetRef.current?.dispatchEvent(e);
    console.log("dispatch", fieldsetRef.current?.dispatchEvent);
  };

  const add = (v: [from: string, to: string]) => {
    setSelectedDates((l) => [...l, v].slice().sort((a, b) => (a < b ? -1 : 1)));
    setTimeout(() => triggerOnChange(), 100);
  };
  const remove = ([from, to]: [from: string, to: string]) => {
    setSelectedDates((l) =>
      l.filter(([xFrom, xTo]) => xFrom !== from && xTo !== to),
    );
    // setTimeout(() => triggerOnChange(), 100);
  };

  // Date range input
  const toRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const addDateRange = () => {
    if (!to || !from) return;
    add([from, to]);
    setFrom("");
    setTo("");
  };

  useEffect(() => {
    if (from && to) {
      addDateRange();
      fromRef.current?.blur();
      toRef.current?.blur();
    } else if (from) toRef.current?.focus();
    else if (to) fromRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  return (
    <>
      <fieldset ref={fieldsetRef}>
        <legend>
          <strong>Dato</strong>
        </legend>
        <ul className="flex flex-wrap gap-1">
          {selectedDates.map(([from, to]) => (
            <li
              key={`${from}_${to}`}
              className="inline-block border p-0.5 text-sm"
            >
              <input type="hidden" name={name} value={`${from}_${to}`} />
              {from} - {to}
              <button onClick={() => remove([from, to])}>X</button>
            </li>
          ))}
        </ul>
      </fieldset>

      <div>
        <label>
          Fra
          <input
            ref={fromRef}
            type="date"
            value={from}
            max={to}
            onChange={(e) => {
              e.stopPropagation();
              setFrom(e.currentTarget.value);
            }}
          />
        </label>
        <label>
          Til
          <input
            ref={toRef}
            type="date"
            value={to}
            min={from}
            onChange={(e) => {
              e.stopPropagation();
              setTo(e.currentTarget.value);
            }}
          />
        </label>
        {/* <button onClick={addDateRange}>Legg til</button> */}
      </div>
    </>
  );
};
