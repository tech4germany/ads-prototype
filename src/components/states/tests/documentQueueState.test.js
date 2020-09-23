import  { useDocumentQueue } from "./../documentQueueState.js";
import { renderHook, act } from "@testing-library/react-hooks"

import decision_tree from "./../../journey/documents/decisiontree_v2.json";

const initialiseDocumentQueue = () => {
  return decision_tree.filter(function (element) {
    return element.type === "default"
  })
}

const retrieveNonDefaultDocument = (identifier) => {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

const insertNewDoc = (newDocumentIdentifier, activeStep, documentQueue) => {
  let existingIdentifiers = documentQueue.map(obj => obj.identifier);
  if (!(existingIdentifiers.includes(newDocumentIdentifier.identifier))) {
    let newDocument = retrieveNonDefaultDocument(newDocumentIdentifier);
    documentQueue.splice(activeStep+1, 0, newDocument);
    }
  return documentQueue
}

const removeNewDoc = (newDocumentIdentifier, documentQueue) => {
  return documentQueue.filter(function (el) {
    return el.identifier !== newDocumentIdentifier
  })
}

test('Length of queue after valid insert', () => {
  const initialQueueLength=3;
  const activeStep=0;
  const label="Religion / Weltanschauung"

  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  act(() => result.current.add(activeStep, label))
  expect(result.current.self.length).toBe(initialQueueLength+1)
})

test('Error for insert at invalid position', () => {
  const initialQueueLength=3;
  const activeStep=1;
  const label="Religion / Weltanschauung"

  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  try {
    act(() => result.current.add(activeStep, label))
  } catch (error) {
    expect(error.message).toBe("Cannot read property 'identifier' of undefined");
  }
})

test('Index of new document after valid insert', () => {
    const activeStep=0;
    const label="Religion / Weltanschauung"
    const identifier="merkmal_religion_detail"
    let indexNewDoc;

    const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
    act(() => result.current.add(activeStep, label))
    act(() => {
      indexNewDoc = result.current.retrieveIndexOfDoc(identifier)
    })
    expect(indexNewDoc).toBe(1)
  })

test('Count of default-documents at end of queue with no additional documents', () => {
  const activeStep=2;
  let defaultCount;
  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  act(() => {
    defaultCount = result.current.activeDefaultStep(activeStep)
  })
  expect(defaultCount).toBe(2)
})

test('Length of queue after valid removal', () => {
  const activeStep=0;
  const label="Religion / Weltanschauung"

  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  const initialQueueLength=result.current.self.length;
  act(() => result.current.add(activeStep, label))
  act(() => result.current.remove(activeStep, label))
  expect(result.current.self.length).toBe(initialQueueLength)
})

test('Length of queue after invalid index removal', () => {
  const activeStep=0;
  const newActiveStep=1;
  const label="Religion / Weltanschauung"

  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  const initialQueueLength=result.current.self.length;
  act(() => result.current.add(activeStep, label))
  act(() => result.current.remove(newActiveStep, label))
  expect(result.current.self.length).toBe(initialQueueLength+1)
})

test('Length of queue after invalid index removal', () => {
  const activeStep=0;
  const label="Religion / Weltanschauung"
  const wrongLabel="Religion / Weltanschauung "

  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  const initialQueueLength=result.current.self.length;
  act(() => result.current.add(activeStep, label))
  act(() => result.current.remove(activeStep, wrongLabel))
  expect(result.current.self.length).toBe(initialQueueLength+1)
})

test('Steps after addition of non-default document', () => {
  const activeStep=0;
  const label="Religion / Weltanschauung"
  let initialSteps;
  let postAddSteps;

  const { result } = renderHook(() => useDocumentQueue(initialiseDocumentQueue()))
  const initialQueueLength=result.current.self.length;
  act(() => { initialSteps = result.current.steps() })
  act(() => result.current.add(activeStep, label))
  act(() => { postAddSteps = result.current.steps() })
  expect(initialSteps).toStrictEqual(postAddSteps)
})