import { createContainer } from 'unstated-next';
import { useState } from 'react';

export function useActiveStep(initialState = 0) {
  let [self, setActiveStep] = useState(initialState)

  let increment = (documentQueueLength) => {
    if (self+1 < documentQueueLength) {
      setActiveStep(self + 1)
    }
  }

  let decrement = () => {
    if (self > 0) {
      setActiveStep(self - 1)
    }
  }

  let jumpTo = (newStep, documentQueueLength) => {
    if ((newStep+1 <= documentQueueLength) && (newStep >= 0)) {
      setActiveStep(newStep)
    }
  }

  let isLast = (documentQueueLength) => {
    if (self+1 === documentQueueLength) { return true}
    else { return false }
  }

  return { self, increment, decrement,  jumpTo, isLast }
}
export const ActiveStep = createContainer(useActiveStep)
