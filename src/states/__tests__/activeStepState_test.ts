import { renderHook, act } from "@testing-library/react-hooks"
import { useActiveStep } from 'states/activeStepState'
import { ActiveStepLayout } from "data/customTypes"

test('Increment', () => {

    // initialse active step element
    let initialState: ActiveStepLayout = 0
    const { result } = renderHook(() => useActiveStep(initialState))
    let visQueue = [true, false, true, true]
    act(() => result.current.increment(visQueue))
    expect(result.current.self).toBe(2)
  })

test('Decrement', () => {

    // initialse active step element
    let initialState: ActiveStepLayout = 6
    const { result } = renderHook(() => useActiveStep(initialState))
    let visQueue = [true, false, true, true, false, false, true]
    act(() => result.current.decrement(visQueue))
    expect(result.current.self).toBe(3)
  })
