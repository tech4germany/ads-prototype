import { createContainer } from 'unstated-next';
import { useState } from 'react';

export function useAnswers(initialState = {}) {
  let [self, setAnswers] = useState(initialState)

  let keys = () => Object.keys(self)

  let update = (identifier, mchoice, label) => {
    let _answers = {...self}
    if (self.hasOwnProperty(identifier)) {
      if (_answers[identifier].includes(label)) {
        const index = _answers[identifier].indexOf(label)
        _answers[identifier].splice(index, 1)
      } else {
        if (!mchoice) {
          _answers[identifier] = [label]
        } else { _answers[identifier].push(label) }
      }
    } else {
      _answers[identifier] = [label]
    }
    setAnswers(_answers);
  }

  let getAnswersById = (identifier) => {
    if (self[identifier] === undefined ) {
      return []
    } else { return self[identifier]}
  }

  return { self, update, keys, getAnswersById }
}
export const Answers = createContainer(useAnswers)
