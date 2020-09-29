import { createContainer } from 'unstated-next';
import { useState } from 'react';

export function useActiveStep(initialState = 0) {
  let [self, setActiveStep] = useState(initialState)

  const _validateNoOverflowStep = (docQueueLength) => {
    if ( self+1 < docQueueLength ) { return true }
    else { return false }
  }

  const _validateNonNegativeStep = () => {
    if (self > 0) { return true }
    else { return false }
  }

  const _validateJump = (newStep, docQueueLength) => {
    if ((newStep+1 <= docQueueLength) && (newStep >= 0)) {
      return true
    } else { return false }
  }

  let increment = (documentQueueLength) => {
    if (_validateNoOverflowStep) {
      setActiveStep(self + 1)
    }
  }

  let decrement = () => {
    if (_validateNonNegativeStep) {
      setActiveStep(self - 1)
    }
  }

  let jumpTo = (newStep, docQueueLength) => {
     if (_validateJump(newStep, docQueueLength)) {
      setActiveStep(newStep)
    }
  }

  let isLast = (documentQueueLength) => {
    if (self+1 === documentQueueLength) { return true}
    else { return false }
  }

  let isSecondLast = (documentQueueLength) => {
    if (self+2 === documentQueueLength) { return true}
    else { return false }
  }

  return { self, increment, decrement,  jumpTo, isLast, isSecondLast }
}
export const ActiveStep = createContainer(useActiveStep)
