import  { useActiveStep } from "./../activeStepState.js";
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

test('Jump to valid position along the queue', () => {
  const queue_length=4;
  const newStep = 3;

  const { result } = renderHook(() => useActiveStep())
  act(() => result.current.jumpTo(newStep, queue_length))
  expect(result.current.self).toBe(newStep)
})

test('Jump to0 far along the queue', () => {
  const queue_length=4;
  const newStep = 4;

  const { result } = renderHook(() => useActiveStep())
  act(() => result.current.jumpTo(newStep, queue_length))
  expect(result.current.self).toBe(0)
})

test('Jump to far back along the queue', () => {
  const queue_length=4;
  const newStep = -1;

  const { result } = renderHook(() => useActiveStep())
  act(() => result.current.jumpTo(newStep, queue_length))
  expect(result.current.self).toBe(0)
})

test('Active Step is last', () => {
  const queue_length=4;
  const currentStep = 3;
  let isLast;

  const { result } = renderHook(() => useActiveStep(currentStep))
  act(() => {
    isLast = result.current.isLast(queue_length)
  })
  expect(isLast).toBe(true)
})

test('Active Step is NOT last', () => {
  const queue_length=4;
  const currentStep = 2;
  let isLast;

  const { result } = renderHook(() => useActiveStep(currentStep))
  act(() => {
    isLast = result.current.isLast(queue_length)
  })
  expect(isLast).toBe(false)
})