import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { FeatureMapLayout } from "customTypes"
import { mapLabelToId } from "data/Interface"
import { AnswersLayout } from "customTypes"

import feature_map from "data/featuremap.json"

let featureMap: FeatureMapLayout = feature_map;

export function useAnswers(initialState: AnswersLayout = {}) {
  let [self, setAnswers] = useState(initialState)

  let _checkStepInAnswers = (identifier: string): boolean => {
    if ( self.hasOwnProperty(identifier) ) { return true }
    else { return false }
  }

  let _deleteLabelFromStepAnswer = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
    let index = ans[id].indexOf(label)
    ans[id].splice(index, 1)
    return ans
  }

  let _overwriteCurrentLabel = (ans: AnswersLayout, id: string, newLabel: string): AnswersLayout => {
    let delLabel = ans[id][0]
    let delIndex = mapLabelToId(id, delLabel);
    if (delIndex !== null) {
      delete ans[delIndex]
    }
    ans[id] = [newLabel]
    return ans
  }

  let _addLabelToStepAnswer = (ans: AnswersLayout, id: string, label: string, mchoice: boolean): AnswersLayout => {
    if (mchoice) {
      ans[id].push(label)
    } else {
      ans = _overwriteCurrentLabel(ans, id, label)
    }
    return ans
  }

  let _addStepWithLabelToAnswers = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
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

  let prune = (id: string): void => {
    if (Object.keys(self).includes(id)) {
      let _ans: AnswersLayout = {...self}
      delete _ans[id]
      setAnswers(_ans)
    }
  }

  let isAgg = (): boolean => {
    let agg: boolean = true;
    Object.keys(self).map(function(el) {
      self[el].map(function(_el){
        if (featureMap[el][_el] !== "agg") {
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

  return { self, add, remove, getAnswersById, getAnswerByKey, prune, isAgg }
}
export const Answers = createContainer(useAnswers)
