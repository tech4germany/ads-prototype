import { renderHook, act } from "@testing-library/react-hooks"
import { useActiveNode } from 'states/activeNodeState'
import { AnswersLayout, AnswerObject } from "data/customTypes"
import { initialiseDocQueue, mapLabelToFeature } from "data/Interface"

test('Initialise queue', () => {

  // initialse object
  let initialQueue: DocumentQueueLayout = initialiseDocQueue()
  let initialNode = {
    "activeDoc": initialQueue[0],
    "previousNode": []
  }
  const { result } = renderHook(() => useActiveNode(JSON.parse(JSON.stringify(initialNode))))

  let expected_identifier: string = "merkmal"
  expect(result.current.getStepIdentifier()).toBe(expected_identifier)
})

test('Move forward', () => {

  // initialse object
  let initialQueue: DocumentQueueLayout = initialiseDocQueue()
  let initialNode = {
    "activeDoc": initialQueue[0],
    "previousNode": []
  }
  const { result } = renderHook(() => useActiveNode(JSON.parse(JSON.stringify(initialNode))))
  let initial_identifier = result.current.getStepIdentifier()

  // move forward
  let next_label: string = "Behinderung / Chronische Krankheiten"
  act(() => result.current.move_forward(next_label))

  let expected_identifier: string = "lebensbereich"
  expect(result.current.getStepIdentifier()).toBe(expected_identifier)
  expect(result.current.self.previousNode[0]).toBe(initial_identifier)
})

test('Move backward', () => {

  // initialse object
  let initialQueue: DocumentQueueLayout = initialiseDocQueue()
  let initialNode = {
    "activeDoc": initialQueue[0],
    "previousNode": []
  }
  const { result } = renderHook(() => useActiveNode(JSON.parse(JSON.stringify(initialNode))))
  let initial_identifier = result.current.getStepIdentifier()

  // move forward
  let next_label1: string = "Behinderung / Chronische Krankheiten"
  act(() => result.current.move_forward(next_label1))

  let next_label2: string = "Arbeitsleben"
  act(() => result.current.move_forward(next_label2))

  // move backward
  act(() => result.current.move_backward())

  let expected_identifier: string = "lebensbereich"
  expect(result.current.getStepIdentifier()).toBe(expected_identifier)
})
