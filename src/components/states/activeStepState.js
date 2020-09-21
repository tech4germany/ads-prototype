import { createContainer } from 'unstated-next';
import { useState } from 'react';

function useActiveStep(initialState = 0) {
  let [self, setActiveStep] = useState(initialState)

  let increment = (documentQueueLength) => {
    if (self+1 < documentQueueLength) {
      setActiveStep(self + 1)
    }
  }

  let decrement = () => setActiveStep(self - 1)

  let jumpTo = (newStep) => setActiveStep(newStep)

  let isLast = (documentQueueLength) => {
    if (self+1 === documentQueueLength) { return true}
  }
  return { self, increment, decrement,  jumpTo, isLast }
}
export const ActiveStep = createContainer(useActiveStep)