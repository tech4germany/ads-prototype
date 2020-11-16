import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { AnswerProfileLayout, AnswersLayout, SpecsLayout, ResultSpecsLayout, EdgeDetail } from "data/customTypes"
import { mapLabelToFeature, getResultMap, getResultCount, getResultProfile } from "data/Interface"

export function useResultSpecs(initialState: ResultSpecsLayout = {}) {
  let [self, setResultSpecs] = useState(initialState)

  let _isEquivalent = (a: SpecsLayout, b: AnswerProfileLayout): boolean => {
    console.log(a)
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
    return answerProfile
  }

  let matchFeatureProfileToResult = (sparseAnswerProfile: AnswerProfileLayout): ResultSpecsLayout => {
    let res_match: ResultSpecsLayout={};
    for (var i=0; i < getResultCount(); i++) {
      if (_isEquivalent(getResultProfile(i), sparseAnswerProfile)) {
        res_match = getResultMap(i)
        break
      }
    }
    console.log("match", res_match)
    return res_match
  }

  let matchAnswersToResult = (answers: AnswersLayout): void => {
    let sparseAnswerProfile = _parseAnswerToProfile(answers)
    let result_match = matchFeatureProfileToResult(sparseAnswerProfile)
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
