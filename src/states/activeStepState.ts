import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ActiveStepLayout } from "data/customTypes"

export function useActiveStep(initialState: ActiveStepLayout = 0) {
  let [self, setActiveStep] = useState(initialState)

  let _validateNonNegativeStep = () => {
    if (self > 0) { return true }
    else { return false }
  }

  let increment = (visQueue: Array<boolean>): boolean => {
    let newStep: number = 0;
    for (var i = self+1; i < visQueue.length; i++) {
      if (visQueue[i] === true) {
        newStep = i
        setActiveStep(i)
        break
      }
    }
    if (newStep-1 === visQueue.length) { return true }
    else { return false }
  }

  let decrement = (visQueue: Array<boolean>): void => {
    console.log("me too", self, visQueue)
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

  let isSecondLast = (documentQueueLength: number): boolean => {
    if (self+2 === documentQueueLength) { return true}
    else { return false }
  }

  return { self, increment, decrement, isLast, isSecondLast }
}
export const ActiveStep = createContainer(useActiveStep)
