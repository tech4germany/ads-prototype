import { createContainer } from 'unstated-next';
import React, { useState } from 'react';

function useStepAnswers(initialState = {}) {
  let [val, setStepAnswers] = useState(initialState)
  let initialise = (identifier, answers) => {
    if (answers.hasOwnProperty(identifier)) {
      let _stepAnswers = answers[identifier];
      setStepAnswers(_stepAnswers);
    } else {setStepAnswers([])}
  }
  let update = () => {
    let _stepAnswers = [...stepAnswers];
    if (!(_stepAnswers.includes(label))) {
      _stepAnswers.push(label);
    } else {
      _stepAnswers = _stepAnswers.filter(function(e) {return e !== label})
    }
    setStepAnswers(_stepAnswers)
  }
  return { val, initialise, update }
}
export const StepAnswers = createContainer(useStepAnswers)
