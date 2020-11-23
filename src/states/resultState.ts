import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { AnswerProfileLayout, DefaultSpecsLayout, NonDefaultSpecsLayout, AnswersLayout, ResultSpecsLayout, EdgeDetail, ResultType } from "data/customTypes"
import { mapLabelToFeature, getResultMap, getResultCount, getDefaultResultProfile, getNonDefaultResultFeatures, getNonDefaultResultId } from "data/Interface"

export function useResultSpecs(initialState: ResultSpecsLayout={}) {
  let [self, setResultSpecs] = useState(initialState)

  let _isProfileEquivalent = (a: DefaultSpecsLayout, b: AnswerProfileLayout): boolean => {
    if ((a.agg === b.agg) && (a.frist === b.frist)) {
      return true
    } else { return false}
  }

  let _isFeatureEquivalent = (result_features: NonDefaultSpecsLayout, answers: AnswersLayout): boolean => {
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

  let retrieveDefaultResult = (answers: AnswersLayout): ResultSpecsLayout => {
    let res_match: ResultSpecsLayout={};
    for (var i=0; i < getResultCount(ResultType.default); i++) {
      if (_isProfileEquivalent(getDefaultResultProfile(i), _parseAnswerToProfile(answers))) {
        res_match = getResultMap(i, ResultType.default)
      }
    }
    return res_match
  }

  let checkForNonDefaultResult = (answers: AnswersLayout, default_result: ResultSpecsLayout): ResultSpecsLayout => {
    let res_match = default_result;
    for (var i=0; i < getResultCount(ResultType.non_default); i++) {
      if (_isFeatureEquivalent(getNonDefaultResultFeatures(i), answers)) {
        res_match["identifier"] = getNonDefaultResultId(i)
        res_match["features"] = getNonDefaultResultFeatures(i)
      }
    }
    console.log("final result: ", res_match)
    return res_match
  }

  let retrieveResultType = (answers: AnswersLayout): void => {
    let result_match = retrieveDefaultResult(answers);
    result_match = checkForNonDefaultResult(answers, result_match)
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
