import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { AnswerProfileLayout, AnswerSpecsLayout, AnswersLayout, SpecsLayout, ResultSpecsLayout, EdgeDetail } from "data/customTypes"
import { mapLabelToFeature, getResultMap, getResultCount, getResultProfile, getResultFeatures } from "data/Interface"

export function useResultSpecs(initialState: ResultSpecsLayout = {}) {
  let [self, setResultSpecs] = useState(initialState)

  let _isProfileEquivalent = (a: SpecsLayout, b: AnswerProfileLayout): boolean => {
    console.log(a)
    if ((a.agg === b.agg) && (a.frist === b.frist)) {
      return true
    } else { return false}
  }

  let _isFeatureEquivalent = (result_features: AnswerSpecsLayout, answers: AnswersLayout): boolean => {
    for (const [key, value] of Object.entries(result_features)) {
      if(typeof value !== "undefined") {
        if (!(key in answers)){
          return false
        } else if (!value.includes(answers[key][0])) {
          return false
        }
      }
    }
    return true
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

  let matchAnswersToResult = (answers: AnswersLayout): ResultSpecsLayout => {
    let res_match: ResultSpecsLayout={};
    for (var i=0; i < getResultCount(); i++) {
      if (_isProfileEquivalent(getResultProfile(i), _parseAnswerToProfile(answers))) {
        if (_isFeatureEquivalent(getResultFeatures(i), answers)){
          res_match = getResultMap(i)
        }
      }
    }
    return res_match
  }

  let retrieveResultType = (answers: AnswersLayout): void => {
    let result_match = matchAnswersToResult(answers)
    console.log(result_match)
    setResultSpecs(result_match)
  }

  // getter functions
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

  return { self, retrieveResultType, isAGG, isFrist, isSet }
}

export const ResultSpecs = createContainer(useResultSpecs)
