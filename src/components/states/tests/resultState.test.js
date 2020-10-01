import  { useResultSpecs } from "./../resultState"
import  { useAnswers } from "./../answerState.js";
import { renderHook, act } from "@testing-library/react-hooks"

import result_map from "./../../journey/documents/resultmap.json";
import result_specs from "./../../journey/documents/resultspecs.json";

test('Fail to match empty answer object', () => {
  const { result } = renderHook(() => useResultSpecs())
  let answers_vals={};
  let answers_keys=[];
  let resMatch;

  act(() => { resMatch = result.current.matchAnswer(answers_vals, answers_keys) })
  expect(resMatch).toBe(-1)
})

test('Match answer object to case 0', () => {
  const { result } = renderHook(() => useResultSpecs())
  let answers_vals={
    "merkmal":["Geschlecht"],
    "lebensbereich":["Arbeit"],
    "frist": ["Ja"]
  };
  let answers_keys=Object.keys(answers_vals);
  let resMatch;

  act(() => { resMatch = result.current.matchAnswer(answers_vals, answers_keys) })
  expect(resMatch).toBe(0)
})

test('Match answer object to case 2', () => {
  const { result } = renderHook(() => useResultSpecs())
  let answers_vals={
    "merkmal":["Sozialer Status (Finanzen, Bildung, Sozialleistung)"],
    "lebensbereich":["Freizeit"],
    "frist": ["Ja"]
  };
  let answers_keys=Object.keys(answers_vals);
  let resMatch;

  act(() => { resMatch = result.current.matchAnswer(answers_vals, answers_keys) })
  expect(resMatch).toBe(2)
})
