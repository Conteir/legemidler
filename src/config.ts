export const defaultBranch = "MAIN/SNOMEDCT-NO";

export const hosts = [
  "https://test.terminologi.ehelse.no",
  "https://qa.terminologi.ehelse.no",
  "https://terminologi.ehelse.no",
];

export const codeSystems = [];

export const referenceSets = [
  {
    id: "",
    title: "[Not specified]",
  },
  {
    id: "816210007",
    title: "MedDRA",
  },
];

export const limit = "3";

export const languages = ["nb-NO", "nb", "nn", "no"];

export const defaultConceptIdSubstance = ""; //Diazepam hardcode was 387264003

export const fetchConceptIdSite = (
  conceptIdSubstance: string = defaultConceptIdSubstance,
) =>
  /*"/concepts?ecl=%3C%3C736479009%3A%20R736474004%3D(*%3AR411116001%3D(%3C%3C763158003%3A762949000%3D(" +
  conceptIdSubstance +
  "%20OR%20(%3C%3C261217004%3A738774007%3D" +
  conceptIdSubstance +
  "))))";*/
  "/concepts?ecl=<<736479009:R736474004=(*:R411116001=(<<763158003:762949000=(" +
  conceptIdSubstance +
  " OR (<<261217004:738774007=" +
  conceptIdSubstance +
  "))))";

export const fetchFormId = "/concepts?ecl=<736478001 Minus <!736478001";

export const fetchRelId = (
  conceptIdSubstance: string = defaultConceptIdSubstance,
) =>
  "/concepts?ecl=<<736480007: R736475003=(*:R411116001=(<<763158003:762949000=(" +
  conceptIdSubstance +
  " OR (<<261217004:738774007=" +
  conceptIdSubstance +
  "))))";

export const fetchAdmId = (
  conceptIdSubstance: string = defaultConceptIdSubstance,
) =>
  "/concepts?ecl=<<736665006: R736472000=(*:R411116001=(<<763158003:762949000=(" +
  conceptIdSubstance +
  " OR (<<261217004:738774007=" +
  conceptIdSubstance +
  "))))";
