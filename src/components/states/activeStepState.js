import { createContainer } from 'unstated-next';
import React, { useState } from 'react';

function useActiveStep(initialState = 0) {
  let [activeStep, setActiveStep] = useState(initialState)
  let increment = () => setActiveStep(activeStep + 1)
  let decrement = () => setActiveStep(activeStep - 1)
  let jumpTo = (newStep) => setActiveStep(newStep)
  return { activeStep, increment, decrement,  jumpTo }
}
export const ActiveStep = createContainer(useActiveStep)
