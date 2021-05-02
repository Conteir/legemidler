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

export const limit = "10";

export const languages = ["nb-NO", "nb", "nn", "no"];

export const defaultConceptIdSubstance = "387264003"; //Diazepam hardcode

export const fetchConceptIdSite = (
  conceptIdSubstance: string = defaultConceptIdSubstance,
) =>
  "/concepts?ecl=%3C%3C736479009%3A%20R736474004%3D(*%3AR411116001%3D(%3C%3C763158003%3A762949000%3D(" +
  conceptIdSubstance +
  "%20OR%20(%3C%3C261217004%3A738774007%3D" +
  conceptIdSubstance +
  "))))";

export const fetchFormId = "/concepts?ecl=%3C736478001%20Minus%20%3C!736478001";

export const fetchRelId = (
  conceptIdSubstance: string = defaultConceptIdSubstance,
) =>
  "/concepts?ecl=%3C%3C736480007%3A%20R736475003%3D(*%3AR411116001%3D(%3C%3C763158003%3A762949000%3D(" +
  conceptIdSubstance +
  "%20OR%20(%3C%3C261217004%3A738774007%3D" +
  conceptIdSubstance +
  "))))";

export const fetchAdmId = (
  conceptIdSubstance: string = defaultConceptIdSubstance,
) =>
  "/concepts?ecl=%3C%3C736665006%3A%20R736472000%3D(*%3AR411116001%3D(%3C%3C763158003%3A762949000%3D(" +
  conceptIdSubstance +
  "%20OR%20(%3C%3C261217004%3A738774007%3D" +
  conceptIdSubstance +
  "))))";
