import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ActiveStepLayout } from "data/customTypes"

export function useActiveStep(initialState: ActiveStepLayout = 0) {
  let [self, setActiveStep] = useState(initialState)

  let increment = (visQueue: Array<boolean>) => {
    for (var i = self+1; i < visQueue.length; i++) {
      if (visQueue[i] === true) {
        setActiveStep(i)
        break
      }
    }
  }

  let decrement = (visQueue: Array<boolean>): void => {
    for (var i = 1; i <= self; i++) {
      if (visQueue[self - i] === true) {
        setActiveStep(self - i)
        break
      }
    }
  }

  let isLast = (documentQueueLength: number): boolean => {
    if (self+1 === documentQueueLength) { return true}
    else { return false }
  }

  return { self, increment, decrement, isLast }
}
export const ActiveStep = createContainer(useActiveStep)
