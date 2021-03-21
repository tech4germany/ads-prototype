import { renderHook, act } from "@testing-library/react-hooks"
import { useDocumentQueue } from 'states/documentQueueState'
import { DocumentQueueLayout } from "data/customTypes"
import { initialiseDocQueue } from "data/Interface"

test('Move forward', () => {

    // initialse object
    const initialQueue: DocumentQueueLayout = initialiseDocQueue()
    const { result } = renderHook(() => useDocumentQueue(JSON.parse(JSON.stringify(initialQueue))));

    // before
    expect(result.current.self[3]["visible"]).toBe(false)

    let activeStep: number = 0;
    let label: string = "Religion/Weltanschauung";
    act(() => result.current.move_forward(activeStep, label))

    // after
    expect(result.current.self[3]["visible"]).toBe(true)
  })

test('Move backward', () => {

    // initialse object
    const initialQueue: DocumentQueueLayout = initialiseDocQueue()
    const { result } = renderHook(() => useDocumentQueue(JSON.parse(JSON.stringify(initialQueue))));

    // before
    expect(result.current.self[3]["visible"]).toBe(false)

    let activeStep: number = 0;
    let label: string = "Religion/Weltanschauung";
    act(() => result.current.move_forward(activeStep, label))

    // in between
    expect(result.current.self[3]["visible"]).toBe(true)

    // move backward
    let activeStep_new: number = 3;
    let remains_agg: boolean = true;
    act(() => result.current.move_backward(activeStep_new, remains_agg))

    // after
    expect(result.current.self[3]["visible"]).toBe(false)

  })

test('Move forward frist question agg', () => {

    // initialse object
    const initialQueue: DocumentQueueLayout = initialiseDocQueue()
    const { result } = renderHook(() => useDocumentQueue(JSON.parse(JSON.stringify(initialQueue))));

    // before
    expect(result.current.self[9]["visible"]).toBe(true)

    let activeStep: number = 0;
    let label: string = "Religion/Weltanschauung";
    act(() => result.current.move_forward(activeStep, label))

    // after
    expect(result.current.self[9]["visible"]).toBe(true)
  })

test('Move forward frist question non-agg', () => {

    // initialse object
    const initialQueue: DocumentQueueLayout = initialiseDocQueue()
    const { result } = renderHook(() => useDocumentQueue(JSON.parse(JSON.stringify(initialQueue))));

    // before
    expect(result.current.self[9]["visible"]).toBe(true)

    let activeStep: number = 0;
    let label: string = "Sozialer Status";
    act(() => result.current.move_forward(activeStep, label))

    // after
    expect(result.current.self[9]["visible"]).toBe(false)
  })

test('Move backward frist question non-agg A', () => {

    // initialse object
    const initialQueue: DocumentQueueLayout = initialiseDocQueue()
    const { result } = renderHook(() => useDocumentQueue(JSON.parse(JSON.stringify(initialQueue))));

    // before
    let activeStep: number = 0;
    let label: string = "Sozialer Status";
    act(() => result.current.move_forward(activeStep, label))

    // check state
    expect(result.current.self[9]["visible"]).toBe(false)

    // move backward
    let activeStep_new: number = 3;
    let remains_agg: boolean = true;
    act(() => result.current.move_backward(activeStep_new, remains_agg))

    // after
    expect(result.current.self[9]["visible"]).toBe(true)

  })

test('Move backward frist question non-agg B', () => {

    // initialse object
    const initialQueue: DocumentQueueLayout = initialiseDocQueue()
    const { result } = renderHook(() => useDocumentQueue(JSON.parse(JSON.stringify(initialQueue))));

    // before
    let activeStep: number = 4;
    let label: string = "Justiz und Polizei";
    act(() => result.current.move_forward(activeStep, label))

    // check state
    expect(result.current.self[9]["visible"]).toBe(false)

    // move backward
    let activeStep_new: number = 4;
    let remains_agg: boolean = true;
    act(() => result.current.move_backward(activeStep_new, remains_agg))

    // after
    expect(result.current.self[9]["visible"]).toBe(true)

  })
