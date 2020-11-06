import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { AnswerProfileLayout, AnswersLayout, SpecsLayout, ResultSpecsLayout, EdgeDetail } from "data/customTypes"
import result_map from "data/resultmap.json"
import { mapLabelToFeature } from "data/Interface"

export function useResultSpecs(initialState: ResultSpecsLayout = {}) {
  let [self, setResultSpecs] = useState(initialState)

  let _isEquivalent = (a: SpecsLayout, b: AnswerProfileLayout): boolean => {
    if ((a.agg === b.agg) && (a.frist === b.frist)) {
      return true
    } else { return false}
  }

  let _parseAnswerToProfile = (answers: AnswersLayout): AnswerProfileLayout => {
    let answerProfile: AnswerProfileLayout = {"agg": true, "frist": false};
    for (const [key, value] of Object.entries(answers)) {
      if (key !== "frist") {
        if (mapLabelToFeature(key, value[0], EdgeDetail.status) !== "agg"){
          answerProfile["agg"] = false
          break
        }
      } else {
        if (mapLabelToFeature(key, value[0], EdgeDetail.status) === "inTime"){
          answerProfile["frist"] = true
        }
      }
    }
    console.log(answerProfile)
    return answerProfile
  }

  let matchFeatureProfileToResult = (sparseAnswerProfile: AnswerProfileLayout): ResultSpecsLayout => {
    let res_match: ResultSpecsLayout={};
    for (var i=0; i < result_map.length; i++) {
      console.log("match", result_map[i]["profile"])
      console.log("answerp", sparseAnswerProfile)
      if (_isEquivalent(result_map[i]["profile"], sparseAnswerProfile)) {
        console.log("we have a match")
        res_match = result_map[i]
        break
      }
    }
    return res_match
  }

  let matchAnswersToResult = (answers: AnswersLayout): void => {
    let sparseAnswerProfile = _parseAnswerToProfile(answers)
    let result_match = matchFeatureProfileToResult(sparseAnswerProfile)
    console.log(result_match)
    setResultSpecs(result_match)
  }

  let isAGG = (): boolean => {
    if (self["profile"] !== undefined) {
      return self["profile"].agg
    }
    else { return false }
  }

  let isFrist = (): boolean => {
    if (self["profile"] !== undefined) {
      return self["profile"].frist
    }
    else { return false }
  }

  let isSet = (): boolean => {
    if (self.profile !== null) { return true }
    else { return false }
  }

  return { self, matchAnswersToResult, isAGG, isFrist, isSet }
}

export const ResultSpecs = createContainer(useResultSpecs)
