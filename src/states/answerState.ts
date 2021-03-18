import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { EdgeDetail } from "data/customTypes"
import { mapLabelToFeature } from "data/Interface"
import { AnswersLayout, AnswerObject } from "data/customTypes"

let initial_answer_object = {"answers": {}, "last_insert": ""}
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
    _ans["last_insert"] = id
    setAnswers(_ans)
  }

  let prune = (): void => {
    let _ans: AnswerObject = {...self}
    delete _ans["answers"][_ans["last_insert"]]
    setAnswers(_ans)
  }

  // getter functions
  let remainsAgg = (): boolean => {

    // remove previous answer
    let _ans: AnswerObject = {...self}
    delete _ans["answers"][_ans["last_insert"]]

    // check if stays agg / non-agg when removing the previous answer
    let agg: boolean = true;
    Object.keys(_ans["answers"]).forEach(stepIdentifier => {
      let label = _ans["answers"][stepIdentifier]
      let status: string | null = mapLabelToFeature(stepIdentifier, label, EdgeDetail.status)
      if (status === null) { status=""}
      if (!["agg", "inTime", "not-InTime"].includes(status)) {
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

  return { self, add, getAnswerByKey, prune, remainsAgg }
}
export const Answers = createContainer(useAnswers)
