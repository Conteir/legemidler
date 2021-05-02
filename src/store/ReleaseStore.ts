import { apiOptions, handleResponse } from "../api";
import { fetchRelId } from "../config";

//definisjon av objekt. Egneskaper. I = interface = "kontakt"
export interface IRel {
  conceptId: string;
  pt: { term: string };
}
//array av objekter
interface IRels {
  items: IRel[];
}

export const fetchReleases = (
  host: string,
  branch: string,
  conceptIdSubstance: string,
) => {
  const url = new URL(`${branch + fetchRelId(conceptIdSubstance)}`, host);
  return fetch(url.toString(), apiOptions).then((response) =>
    handleResponse<IRels>(response),
  );
};
