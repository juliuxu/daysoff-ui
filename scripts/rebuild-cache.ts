enum Category {
  Mountain = "1",
  Ocean = "2",
  Abroad = "3",
}
const cabinCategoryTitles: Record<Category, string> = {
  [Category.Mountain]: "Fjellet 🗻",
  [Category.Ocean]: "Sjøen 🌊",
  [Category.Abroad]: "Utlandet ☀️",
};

const BASE = "https://daysoff-ui.pages.dev";
// const BASE = "http://127.0.0.1:8788";

for (const category in Category) {
  console.log("Fetching for ", cabinCategoryTitles[category as Category]);

  for (let i = 0; i < 6; i += 1) {
    console.log("attempt", i);
    const url = new URL(
      `/rebuild-cache?category=${Category[category as keyof typeof Category]}`,
      BASE,
    );
    const response = await fetch(url);
    if (response.status === 200) {
      console.log("got 200");
      break;
    } else {
      console.log("got response", response.status);
    }

    if (response.status === 503) {
      await new Promise((r) => setTimeout(r, 15_000));
    } else {
      await new Promise((r) => setTimeout(r, 5_000));
    }
  }
}

export {};
