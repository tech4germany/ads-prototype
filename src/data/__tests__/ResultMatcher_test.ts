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

test('Answer Case 3', () => {

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
