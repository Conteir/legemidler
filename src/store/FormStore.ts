import { apiOptions, handleResponse } from "../api";
import { fetchFormId } from "../config";

export interface IForm {
  conceptId: string;
  pt: { term: string };
}
interface IForms {
  items: IForm[];
}

export const fetchForms = (host: string, branch: string) => {
  const url = new URL(`${branch + fetchFormId}`, host);
  return fetch(url.toString(), apiOptions).then((response) =>
    handleResponse<IForms>(response),
  );
};
