import { createContainer } from 'unstated-next';
import { useState } from 'react';

export function useAnswers(initialState = {}) {
  let [self, setAnswers] = useState(initialState)

  let keys = () => Object.keys(self)

  let _deleteAtDeselect = (answers, identifier) => {
    delete answers[identifier]
  }

  let update = (activeDocument, label) => {
    let identifier = activeDocument.identifier
    let mchoice = activeDocument.multiple_choice
    let labelIdentifier = activeDocument.options[label]

    let _answers = {...self}
    if (self.hasOwnProperty(identifier)) {
      if (_answers[identifier].includes(label)) {
        const index = _answers[identifier].indexOf(label)
        _answers[identifier].splice(index, 1)
        _deleteAtDeselect(_answers, labelIdentifier)
      } else {
        if (!mchoice) {
          let _oldLabel = activeDocument.options[_answers[identifier][0]]
          _deleteAtDeselect(_answers, _oldLabel)
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
