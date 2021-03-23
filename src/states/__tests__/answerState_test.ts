import { renderHook, act } from "@testing-library/react-hooks"
import { useAnswers } from 'states/answerState'
import { AnswersLayout, AnswerObject } from "data/customTypes"

test('Simple add', () => {

    // initialse object
    let initial_answer_object = {"answers": {}, "last_insert": []}
    const { result } = renderHook(() => useAnswers(initial_answer_object))

    // define insert
    let new_key = "merkmal"
    let new_value = "Religion/Weltanschauung"
    act(() => result.current.add(new_key, new_value))

    let answers = {"merkmal": "Religion/Weltanschauung"}
    let last_keys = ["merkmal"]
    expect(result.current.self["answers"]).toStrictEqual(answers)
    expect(result.current.self["last_insert"]).toStrictEqual(last_keys)
  })

test('Multiple add', () => {

    // initialse object
    let initial_answer_object = {"answers": {}, "last_insert": []}
    const { result } = renderHook(() => useAnswers(initial_answer_object))

    // first insert
    let new_key_1 = "merkmal"
    let new_value_1 = "Religion/Weltanschauung"
    act(() => result.current.add(new_key_1, new_value_1))

    // second insert
    let new_key_2 = "merkmal_religion_detail"
    let new_value_2 = "Weltanschauung"
    act(() => result.current.add(new_key_2, new_value_2))

    let answers = {
      "merkmal": "Religion/Weltanschauung",
      "merkmal_religion_detail": "Weltanschauung"
    }
    let last_keys = ["merkmal", "merkmal_religion_detail"]

    expect(result.current.self["answers"]).toStrictEqual(answers)
    expect(result.current.self["last_insert"]).toStrictEqual(last_keys)
  })

test('Prune last answer', () => {

    // initialse object
    let initial_answers = {
      "merkmal": "Religion/Weltanschauung",
      "merkmal_religion_detail": "Weltanschauung"
    }
    let initial_last_keys = ["merkmal", "merkmal_religion_detail"]
    let initial_answer_object = {
      "answers": initial_answers,
      "last_insert": initial_last_keys
    }
    const { result } = renderHook(() => useAnswers(initial_answer_object))

    // Prune
    act(() => result.current.prune())

    let answers = {"merkmal": "Religion/Weltanschauung"}
    let last_keys = ["merkmal"]
    expect(result.current.self["answers"]).toStrictEqual(answers)
    expect(result.current.self["last_insert"]).toStrictEqual(last_keys)
  })
