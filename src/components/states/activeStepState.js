import { createContainer } from 'unstated-next';
import React, { useState } from 'react';

function useActiveStep(initialState = 0) {
  let [self, setActiveStep] = useState(initialState)
  let increment = () => setActiveStep(self + 1)
  let decrement = () => setActiveStep(self - 1)
  let jumpTo = (newStep) => setActiveStep(newStep)
  return { self, increment, decrement,  jumpTo }
}
export const ActiveStep = createContainer(useActiveStep)
