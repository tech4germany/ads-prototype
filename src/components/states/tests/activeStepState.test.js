import  {useActiveStep} from "./../activeStepState.js";
import { renderHook, act } from "@testing-library/react-hooks"

test('Increment while in middle of Queue', () => {
    const queue_length=4;
    const initial_step=1;

    const { result } = renderHook(() => useActiveStep(initial_step))
    act(() => result.current.increment(queue_length))
    expect(result.current.self).toBe(initial_step+1)
  })

test('Increment while at end of Queue', () => {
    const queue_length=4;
    const initial_step=3;

    const { result } = renderHook(() => useActiveStep(initial_step))
    act(() => result.current.increment(queue_length))
    expect(result.current.self).toBe(initial_step)
  })

test('Decrement while in middle of Queue', () => {
    const queue_length=4;
    const initial_step=2;

    const { result } = renderHook(() => useActiveStep(initial_step))
    act(() => result.current.decrement())
    expect(result.current.self).toBe(initial_step-1)
  })

test('Decrement while at beginning of Queue', () => {
    const queue_length=4;
    const initial_step=0;

    const { result } = renderHook(() => useActiveStep(initial_step))
    act(() => result.current.decrement())
    expect(result.current.self).toBe(initial_step)
  })