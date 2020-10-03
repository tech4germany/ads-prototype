import { createContainer } from 'unstated-next';
import { useState } from 'react';

import { mapLabelToId } from "data/ProvideDecisionTree"

type OrNull<T> = T | null;

interface AnswersLayout {
  [key: string]: Array<string>;
}

export function useAnswers(initialState: AnswersLayout = {}) {
  let [self, setAnswers] = useState(initialState)

  const _checkStepInAnswers = (identifier: string): boolean => {
    if ( self.hasOwnProperty(identifier) ) { return true }
    else { return false }
  }

  const _deleteLabelFromStepAnswer = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
    let index = ans[id].indexOf(label)
    ans[id].splice(index, 1)
    return ans
  }

  const _overwriteCurrentLabel = (ans: AnswersLayout, id: string, newLabel: string): AnswersLayout => {
    let delLabel = ans[id][0]
    let delIndex = mapLabelToId(id, delLabel);
    if (delIndex !== null) {
      delete ans[delIndex]
    }
    ans[id] = [newLabel]
    return ans
  }

  const _addLabelToStepAnswer = (ans: AnswersLayout, id: string, label: string, mchoice: boolean): AnswersLayout => {
    if (mchoice) {
      ans[id].push(label)
    } else {
      ans = _overwriteCurrentLabel(ans, id, label)
    }
    return ans
  }

  const _addStepWithLabelToAnswers = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
    ans[id] = [label]
    return ans
  }

  let add = (id: string, mchoice: boolean, label: string): void => {
    let _ans = {...self}
    if (_checkStepInAnswers(id)) {
      _ans = _addLabelToStepAnswer(_ans, id, label, mchoice)
    } else {
      _ans = _addStepWithLabelToAnswers(_ans, id, label)
    }
    setAnswers(_ans)
  }

  let remove = (id: string, label: string): void => {
    let _ans: AnswersLayout = {...self}
    _ans = _deleteLabelFromStepAnswer(_ans, id, label)
    let delId = mapLabelToId(id, label)
    if (delId !== null) {
      delete _ans[delId]
    }
    setAnswers(_ans)
  }

  let getAnswersById = (identifier: string): Array<string> => {
    if (self[identifier] === undefined ) { return [] }
     else { return self[identifier]}
  }

  let getAnswerByKey = (key: string, idx: number): string => {
    if (Object.keys(self).includes(key)) {
      return self[key][idx]
    } else { return "Identifier not existent"}
  }

  let keys = () => Object.keys(self)

  return { self, add, remove, keys, getAnswersById, getAnswerByKey }
}
export const Answers = createContainer(useAnswers)
