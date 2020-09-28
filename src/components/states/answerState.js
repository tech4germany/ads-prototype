import { createContainer } from 'unstated-next';
import { useState } from 'react';

import { mapLabelToId } from "data/ProvideDecisionTree.js";

export function useAnswers(initialState = {}) {
  let [self, setAnswers] = useState(initialState)

  const _checkStepInAnswers = (identifier) => {
    if ( self.hasOwnProperty(identifier) ) { return true }
    else { return false }
  }

  const _deleteLabelFromStepAnswer = (ans, id, label) => {
    let index = ans[id].indexOf(label)
    ans[id].splice(index, 1)
    return ans
  }

  const _overwriteCurrentLabel = (ans, id, newLabel) => {
    let delLabel = ans[id][0]
    delete ans[mapLabelToId(id, delLabel)]
    ans[id] = [newLabel]
    return ans
  }

  const _addLabelToStepAnswer = (ans, id, label, mchoice) => {
    if (mchoice) {
      ans[id].push(label)
    } else {
      ans = _overwriteCurrentLabel(ans, id, label)
    }
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

  let remove = (id, label) => {
    let _ans = {...self}
    let delId = mapLabelToId(id, label)
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
