import { useLoaderData, useSubmit, Form } from "@remix-run/react";
import {
  Category,
  cabinCategoryTitles,
  CabinFeature,
  cabinPropertyTitles,
  CabinAttribute,
} from "~/domain";
import type { loader } from "~/routes/index";
import { dateToYearMonthDay, daterangeId } from "~/utils/misc";
import { DaterangeList } from "./daterange-list";

export const Filtering = () => {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();

  type Filter = {
    id: string;
    name: React.ReactNode;
    type: "radio" | "checkbox";
    options: {
      value: string;
      label: React.ReactNode;
      defaultChecked: boolean;
    }[];
  };
  // | {
  //     id: string;
  //     name: React.ReactNode;
  //     type: "number";
  //     options: { value: string; label: React.ReactNode }[];
  //   };

  const filters: Filter[] = [
    {
      id: "category",
      name: "Kategori",
      type: "radio",
      options: (Object.values(Category) as Category[]).map((x) => ({
        value: x,
        label: cabinCategoryTitles[x],
        defaultChecked: data.input.category?.includes(x),
      })),
    },
    {
      id: "features",
      name: "Egenskaper",
      type: "checkbox",
      options: (Object.values(CabinFeature) as CabinFeature[]).map((x) => ({
        value: x,
        label: cabinPropertyTitles[x],
        defaultChecked: data.input.features?.includes(x),
      })),
    },
  ];
  return (
    <aside>
      <h2 className="sr-only">Filters</h2>

      <Form
        // Remove extraneous query params from url
        ref={(ref) => {
          ref?.addEventListener("formdata", (e) => {
            for (const [key, value] of e.formData.entries()) {
              if (value === "") {
                console.log(`remove ${key} ${value}`);
                e.formData.delete(key);
              }
            }
          });
        }}
        onChange={(e) => {
          submit(e.currentTarget);
        }}
        className="space-y-10 divide-y divide-gray-200"
      >
        {filters.map((section, sectionIdx) => (
          <div
            key={sectionIdx}
            className={sectionIdx === 0 ? undefined : "pt-4"}
          >
            <fieldset>
              <legend className="block text-sm font-medium text-gray-900">
                {section.name}
              </legend>
              <div className="space-y-3 pt-6">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`${section.id}-${optionIdx}`}
                      name={`${section.id}`}
                      value={option.value}
                      defaultChecked={option.defaultChecked}
                      type={section.type}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        ))}

        {/* Attributes */}
        <div className="pt-4">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Attributter
            </legend>
            <div className="space-y-3 pt-6">
              <div className="">
                <label
                  htmlFor={`attributes-${CabinAttribute.Title}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Title]}
                </label>
                <input
                  id={`attributes-${CabinAttribute.Title}`}
                  name={`attributes-${CabinAttribute.Title}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Title,
                    )?.[1]
                  }
                  type="search"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label
                  htmlFor={`attributes-${CabinAttribute.Location}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Location]}
                </label>
                <input
                  id={`attributes-${CabinAttribute.Location}`}
                  name={`attributes-${CabinAttribute.Location}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Location,
                    )?.[1]
                  }
                  type="search"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label
                  htmlFor={`attributes-${CabinAttribute.Bedrooms}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Bedrooms]}
                </label>
                <input
                  id={`attributes-${CabinAttribute.Bedrooms}`}
                  name={`attributes-${CabinAttribute.Bedrooms}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Bedrooms,
                    )?.[1]
                  }
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label
                  htmlFor={`attributes-${CabinAttribute.Beds}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  {cabinPropertyTitles[CabinAttribute.Beds]}
                </label>
                <input
                  id={`attributes-${CabinAttribute.Beds}`}
                  name={`attributes-${CabinAttribute.Beds}`}
                  defaultValue={
                    data.input.attributes.find(
                      ([x]) => x === CabinAttribute.Beds,
                    )?.[1]
                  }
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Dates */}
        <div className="pt-4">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Datoer
            </legend>
            <div className="space-y-3 pt-6">
              <DaterangeList
                name="dates"
                defaultValues={data.input.dates}
                min={dateToYearMonthDay(new Date())}
                counts={data.byAvailableDates
                  .map((x) => ({
                    [daterangeId(
                      x.daterange.map(dateToYearMonthDay) as [string, string],
                    )]: x.cabins.length,
                  }))
                  .reduce<Record<string, number>>(
                    (acc, x) => ({ ...acc, ...x }),
                    {},
                  )}
              />
            </div>
          </fieldset>
        </div>
      </Form>
    </aside>
  );
};
