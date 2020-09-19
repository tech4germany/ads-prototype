import { createContainer } from 'unstated-next';
import React, { useState } from 'react';

function useAnswers(initialState = {}) {
  let [self, setAnswers] = useState(initialState)
  let update = (identifier, label) => {
    let _answers = {...self};
    if (_answers.hasOwnProperty(identifier)) {
      if (_answers[identifier].includes(label)) {
        const index = _answers[identifier].indexOf(label)
        _answers[identifier].splice(index, 1)
      } else { _answers[identifier].push(label) }
    } else {
      _answers[identifier] = [label]
    }
    setAnswers(_answers);
  }
  let initialiseStep = (identifier) => {
    if (Object.keys(self).includes(identifier)) {
      return self[identifier]
    } else { return [] }
  }
  return { self, update, initialiseStep }
}
export const Answers = createContainer(useAnswers)
