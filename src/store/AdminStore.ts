import { apiOptions, handleResponse } from "../api";
import { fetchAdmId } from "../config";

//definisjon av objekt. Egneskaper. I = interface = "kontakt"
export interface IAdm {
  conceptId: string;
  pt: { term: string };
}
//array av objekter
interface IAdms {
  items: IAdm[];
}

export const fetchAdms = (
  host: string,
  branch: string,
  conceptIdSubstance: string,
) => {
  const url = new URL(`${branch + fetchAdmId(conceptIdSubstance)}`, host);
  return fetch(url.toString(), apiOptions).then((response) =>
    handleResponse<IAdms>(response),
  );
};
