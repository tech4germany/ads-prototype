import  { useAnswers } from "./../answerState.js";
import { renderHook, act } from "@testing-library/react-hooks"

test('Add answer to empty step answers', () => {
  const { result } = renderHook(() => useAnswers())
  const identifier = "merkmal"
  const label = "Ethnische Herkunft/Rassistische Diskriminierung"
  const mchoice = true
  let stepAnswers;

  act(() => { result.current.update(identifier, mchoice, label) })
  act(() => { stepAnswers = result.current.getAnswersById(identifier) })
  expect(stepAnswers).toStrictEqual(["Ethnische Herkunft/Rassistische Diskriminierung"])
})

test('Double click on selection', () => {
  const { result } = renderHook(() => useAnswers())
  const identifier = "merkmal"
  const label = "Ethnische Herkunft/Rassistische Diskriminierung"
  const mchoice = true
  let stepAnswers;

  act(() => { result.current.update(identifier, mchoice, label) })
  act(() => { result.current.update(identifier, mchoice, label) })
  act(() => { stepAnswers = result.current.getAnswersById(identifier) })
  expect(stepAnswers).toStrictEqual([])
})

test('Valid multiple answer selection', () => {
  const { result } = renderHook(() => useAnswers())
  const identifier = "merkmal"

  const label1 = "Ethnische Herkunft/Rassistische Diskriminierung"
  const label2 = "Geschlecht"
  const mchoice = true
  let stepAnswers;

  act(() => { result.current.update(identifier, mchoice, label1) })
  act(() => { result.current.update(identifier, mchoice, label2) })
  act(() => { stepAnswers = result.current.getAnswersById(identifier) })
  expect(stepAnswers).toStrictEqual(["Ethnische Herkunft/Rassistische Diskriminierung", "Geschlecht"])
})

test('Valid single answer selection', () => {
  const { result } = renderHook(() => useAnswers())
  const identifier = "merkmal"

  const label1 = "Ethnische Herkunft/Rassistische Diskriminierung"
  const label2 = "Geschlecht"
  const mchoice = false
  let stepAnswers;

  act(() => { result.current.update(identifier, mchoice, label1) })
  act(() => { result.current.update(identifier, mchoice, label2) })
  act(() => { stepAnswers = result.current.getAnswersById(identifier) })
  expect(stepAnswers).toStrictEqual(["Geschlecht"])
})
