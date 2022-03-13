import axios from "axios";
import { LatLng } from "./domain";
import { definitions } from "./geonorgeTypes";

// npx openapi-typescript https://ws.geonorge.no/adresser/v1/openapi.json --output geonorgeTypes.ts
type Response = definitions["OutputAdresseList"];

// https://ws.geonorge.no/adresser/v1/punktsok?koordsys=4258&treffPerSide=1&side=0&asciiKompatibel=true&lon=10.1332578659058&utkoordsys=4258&radius=100&lat=61.4752273559570
export const latLngToLocation = async ({ lat, lng }: LatLng) => {
  const search = new URLSearchParams({
    lat,
    lon: lng,
    radius: "100",
  });
  const res = await axios.get<Response>(
    `https://ws.geonorge.no/adresser/v1/punktsok?${search}`
  );
  const first = res.data.adresser?.[0];
  if (first === undefined) throw new Error("no geopunkt matches");

  return {
    kommunenavn: first.kommunenavn,
    poststed: first.poststed,
  };
};
