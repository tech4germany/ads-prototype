import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EdgeDetail } from "data/customTypes"
import { mapLabelToFeature } from "data/Interface"
import { AnswersLayout, AnswerObject } from "data/customTypes"

let initial_answer_object = {"answers": {}, "last_insert": []}
export function useAnswers(initialState: AnswerObject = initial_answer_object) {
  let [self, setAnswers] = useState(initialState)

  let _addStepWithLabelToAnswers = (ans: AnswersLayout, id: string, label: string): AnswersLayout => {
    ans[id] = label
    return ans
  }

  // setter functions
  let add = (id: string, label: string): void => {
    let _ans = {...self}
    _ans["answers"] = _addStepWithLabelToAnswers(_ans["answers"], id, label)
    _ans["last_insert"].push(id)
    setAnswers(_ans)
  }

  let prune = (): void => {
    let _ans: AnswerObject = {...self}
    delete _ans["answers"][_ans["last_insert"].slice(-1)[0]]
    _ans["last_insert"].splice(-1,1)
    setAnswers(_ans)
  }

  // getter functions
  let isAgg = (): boolean => {
    let agg: boolean = true;
    Object.keys(self["answers"]).forEach(stepIdentifier => {
      let label = self["answers"][stepIdentifier]
      let status: string | null = mapLabelToFeature(stepIdentifier, label, EdgeDetail.status)
      if (status === null) {}
      else if (!["agg", "inTime", "not-InTime"].includes(status)) {
        agg = false
      }
    })
    return agg
  }

  let getAnswerByKey = (key: string): string => {
    if (Object.keys(self["answers"]).includes(key)) {
      return self["answers"][key]
    } else { return "Identifier not existent"}
  }

  return { self, add, getAnswerByKey, prune, isAgg }
}
export const Answers = createContainer(useAnswers)
