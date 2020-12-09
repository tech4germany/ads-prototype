import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EdgeDetail } from "data/customTypes"
import { mapLabelToFeature } from "data/Interface"
import { AnswersLayout } from "data/customTypes"

export function useAnswers(initialState: AnswersLayout = {}) {
  let [self, setAnswers] = useState(initialState)

  // auxialliary functions
  let _checkStepInAnswers = (identifier: string): boolean => {
    if ( self.hasOwnProperty(identifier) ) { return true }
    else { return false }
  }

  let _overwriteCurrentLabel = (ans: AnswersLayout, id: string, newLabel: string): AnswersLayout => {
    let delLabel = ans[id][0]
    let delIndex = mapLabelToFeature(id, delLabel, EdgeDetail.next_node)
    if (delIndex !== null) {
      delete ans[delIndex]
    }
    ans[id] = [newLabel]
    return ans
  }

  let _addLabelToStepAnswer = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
    ans = _overwriteCurrentLabel(ans, id, label)
    return ans
  }

  let _addStepWithLabelToAnswers = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
    ans[id] = [label]
    return ans
  }

  // setter functions
  let add = (id: string, label: string): void => {
    let _ans = {...self}
    if (_checkStepInAnswers(id)) {
      _ans = _addLabelToStepAnswer(_ans, id, label)
    } else {
      _ans = _addStepWithLabelToAnswers(_ans, id, label)
    }
    setAnswers(_ans)
  }

  let prune = (id: string): void => {
    if (Object.keys(self).includes(id)) {
      let _ans: AnswersLayout = {...self}
      delete _ans[id]
      setAnswers(_ans)
    }
  }

  // getter functions
  let isAgg = (): boolean => {
    let agg: boolean = true;
    Object.keys(self).forEach(stepIdentifier => {
      self[stepIdentifier].forEach(label => {
        let status: string | null = mapLabelToFeature(stepIdentifier, label, EdgeDetail.status)
        if (status === null) { status=""}
        if (!["agg", "inTime", "not-InTime"].includes(status)) {
          agg = false
        }
      })
    })
    return agg
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

  return { self, add, getAnswersById, getAnswerByKey, prune, isAgg }
}
export const Answers = createContainer(useAnswers)
