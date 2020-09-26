import { createContainer } from 'unstated-next';
import { useState } from 'react';

export function useAnswers(initialState = {}) {
  let [self, setAnswers] = useState(initialState)

  const _checkStepInAnswers = (identifier) => {
    if ( self.hasOwnProperty(identifier) ) { return true }
    else { return false }
  }

  const _checkLabelInStepAnswers = (id, label) => {
    if (self[id].includes(label)) { return true }
    else { return false }
  }

  const _deleteLabelFromStepAnswer = (ans, id, label) => {
    let index = ans[id].indexOf(label)
    ans[id].splice(index, 1)
    return ans
  }

  const _addLabelToStepAnswer = (ans, id, label, mchoice) => {
    if (mchoice) {
      ans[id].push(label)
    } else { ans[id] = [label] }
    return ans
  }

  const _addStepWithLabelToAnswers = (ans, id, label) => {
    ans[id] = [label]
    return ans
  }

  let add = (id, mchoice, label) => {
    let _ans = {...self}
    if (_checkStepInAnswers(id)) {
      _ans = _addLabelToStepAnswer(_ans, id, label, mchoice)
    } else {
      _ans = _addStepWithLabelToAnswers(_ans, id, label)
    }
    setAnswers(_ans)
  }

  let remove = (id, label, delId) => {
    let _ans = {...self}
    _ans = _deleteLabelFromStepAnswer(_ans, id, label)
    delete _ans[delId]
    setAnswers(_ans)
  }

  let getAnswersById = (identifier) => {
    if (self[identifier] === undefined ) { return [] }
     else { return self[identifier]}
  }

  let keys = () => Object.keys(self)

  return { self, add, remove, keys, getAnswersById }
}
export const Answers = createContainer(useAnswers)
