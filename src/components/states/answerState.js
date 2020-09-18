import { createContainer } from 'unstated-next';
import React, { useState } from 'react';

function useAnswers(initialState = {}) {
  let [answers, setAnswers] = useState(initialState)
  let update = (step, label) => {
  let _answers = {...answers};
  if _answers.hasOwnProperty(step) {
    _answers[step].push(label)
  } else {
    _answers[step] = [label]
  }
  setAnswers(_answers);
  }
  return { answers, update }
}
export const Answers = createContainer(useAnswers)
