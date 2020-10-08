import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ActiveStepLayout } from "customTypes"

export function useActiveStep(initialState: ActiveStepLayout = 0) {
  let [self, setActiveStep] = useState(initialState)

  let _validateNonNegativeStep = () => {
    if (self > 0) { return true }
    else { return false }
  }

  let increment = (remainingSteps: number): void => {
    if (remainingSteps > 0) {
      setActiveStep(self + 1)
    }
  }

  let decrement = () => {
    if (_validateNonNegativeStep()) {
      setActiveStep(self - 1)
    }
  }

  let isLast = (documentQueueLength: number): boolean => {
    if (self+1 === documentQueueLength) { return true}
    else { return false }
  }

  let isSecondLast = (documentQueueLength: number): boolean => {
    if (self+2 === documentQueueLength) { return true}
    else { return false }
  }

  return { self, increment, decrement, isLast, isSecondLast }
}
export const ActiveStep = createContainer(useActiveStep)
