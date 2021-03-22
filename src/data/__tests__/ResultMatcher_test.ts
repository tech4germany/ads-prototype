import { getResultReferrals, getResultTemplates, getResultMaterials } from "data/Interface";
import { retrieveResultType } from "data/ResultMatcher";

test('Answer Case 1', () => {

  // testcase
  let answers_test = {
    "merkmal": "Sexuelle Identität",
    "lebensbereich": "Bildungsbereich",
    "lebensbereich_bildung_detail": "Privatschule/Privatunterricht",
    "frist": "Ja"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 0;
  let non_default_identifier: Array<number> = [4, 15, 24, 37];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 2', () => {

  // testcase
  let answers_test = {
    "merkmal": "Sozialer Status",
    "lebensbereich": "Justiz und Polizei",
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 2;
  let non_default_identifier: Array<number> = [6, 20, 38];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 3', () => {

  // testcase
  let answers_test = {
    "merkmal": "Geschlecht / Geschlechtsidentität / Sexuelle Belästigung",
    "merkmal_gender_detail": "Trans*",
    "lebensbereich": "Justiz und Polizei"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 2;
  let non_default_identifier: Array<number> = [3, 13, 15, 20, 35, 38];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 4 - Sexuelle Belästugung NICHT am Arbeitsplatz', () => {

  // testcase
  let answers_test = {
    "merkmal": "Geschlecht / Geschlechtsidentität / Sexuelle Belästigung",
    "merkmal_gender_detail": "Sexuelle Belästigung",
    "lebensbereich": "Bildungsbereich",
    "lebensbereich_bildung_detail": "Kita",
    "frist": "Ja"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 0;
  let non_default_identifier: Array<number> = [11, 12, 55];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 5 - Sexuelle Belästugung am Arbeitsplatz', () => {

  // testcase
  let answers_test = {
    "merkmal": "Geschlecht / Geschlechtsidentität / Sexuelle Belästigung",
    "merkmal_gender_detail": "Sexuelle Belästigung",
    "lebensbereich": "Arbeitsleben",
    "lebensbereich_arbeit_detail": "Im Beschäftigungsverhältnis",
    "frist": "Ja"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 0;
  let non_default_identifier: Array<number> = [11, 22, 25, 36];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 6 - Weltanschauug NICHT am Arbeitsplatz', () => {

  // testcase
  let answers_test = {
    "merkmal": "Religion/Weltanschauung",
    "merkmal_religion_detail": "Weltanschauung",
    "lebensbereich": "Gesundheit und Pflege",
    "lebensbereich_gesundheit_detail": "Gesetzliche Krankenkasse"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 2;
  let non_default_identifier: Array<number> = [5, 40, 48, 50];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 7 - Weltanschauug am Arbeitsplatz', () => {

  // testcase
  let answers_test = {
    "merkmal": "Religion/Weltanschauung",
    "merkmal_religion_detail": "Weltanschauung",
    "lebensbereich": "Arbeitsleben",
    "lebensbereich_arbeit_detail": "Kündigung/Beendigung",
    "frist": "Nein"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 1;
  let non_default_identifier: Array<number> = [23, 36];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 8 - M:Sonstiges L:AGG', () => {

  // testcase
  let answers_test = {
    "merkmal": "Sonstiges",
    "lebensbereich": "Gesundheit und Pflege",
    "lebensbereich_gesundheit_detail": "Arztbesuch",
    "frist": "Ja"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 0;
  let non_default_identifier: Array<number> = [5, 16, 43];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 9 - M:Sonstiges L:Non-AGG', () => {

  // testcase
  let answers_test = {
    "merkmal": "Sonstiges",
    "lebensbereich": "Justiz und Polizei",
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 2;
  let non_default_identifier: Array<number> = [20, 43];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 10 - M:AGG L:Sonstiges', () => {

  // testcase
  let answers_test = {
    "merkmal": "Sexuelle Identität",
    "lebensbereich": "Sonstiges",
    "frist": "Nein"
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 1;
  let non_default_identifier: Array<number> = [4, 15, 44];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})

test('Answer Case 11 - M:Non-AGG L:Sonstiges', () => {

  // testcase
  let answers_test = {
    "merkmal": "Sozialer Status",
    "lebensbereich": "Sonstiges",
  }
  let result_match = retrieveResultType(answers_test);

  // expected answers
  let default_identifier: number = 2;
  let non_default_identifier: Array<number> = [6, 44];

  expect(result_match["default_identifier"]).toBe(default_identifier)
  expect(result_match["non_default_identifier"]).toStrictEqual(non_default_identifier)
})
