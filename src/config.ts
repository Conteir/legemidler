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

export const defaultDrugId = "386983007";

export const fetchConceptIdSite =
  "/concepts?ecl=%3C%3C736479009%3A%20R736474004%3D(*%3AR411116001%3D(%3C%3C763158003%3A762949000%3D(" +
  defaultDrugId +
  "%20OR%20(%3C%3C261217004%3A738774007%3D" +
  defaultDrugId +
  "))))";

export const fetchFormId = "/concepts?ecl=%3C736478001%20Minus%20%3C!736478001";
