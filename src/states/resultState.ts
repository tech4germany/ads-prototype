import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { AnswerProfileLayout, DefaultSpecsLayout, NonDefaultSpecsLayout, AnswersLayout, ResultSpecsLayout, EdgeDetail } from "data/customTypes"
import { getDefaultResultCount,
  getNonDefaultResultCount,
  mapLabelToFeature,
  getDefaultResultIdentifier,
  getDefaultResultProfile,
  getNonDefaultResultIdentifier,
  getNonDefaultResultFeatures } from "data/Interface"

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
        if (!(key in answers)){ /// this only works because merkmal und lebensbereich are ALWAYS included
          continue
        } else if (!value.includes(answers[key])) {
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
        if (mapLabelToFeature(key, value, EdgeDetail.status) !== "agg"){
          answerProfile["agg"] = false
          break
        }
      } else {
        if (mapLabelToFeature(key, value, EdgeDetail.status) === "inTime"){
          answerProfile["frist"] = true
        }
      }
    }
    return answerProfile
  }

  let retrieveDefaultResult = (answers: AnswersLayout, result_match: ResultSpecsLayout): ResultSpecsLayout => {
    for (var i=0; i < getDefaultResultCount(); i++) {
      if (_isProfileEquivalent(getDefaultResultProfile(i), _parseAnswerToProfile(answers))) {
        result_match["default_identifier"] = getDefaultResultIdentifier(i)
        result_match["profile"] = getDefaultResultProfile(i)
      }
    }
    return result_match
  }

  let checkForNonDefaultResult = (answers: AnswersLayout, result_match: ResultSpecsLayout): ResultSpecsLayout => {
    for (var i=0; i < getNonDefaultResultCount(); i++) {
      if (_isFeatureEquivalent(getNonDefaultResultFeatures(i), answers)) {
        if (typeof result_match["non_default_identifier"] === "undefined") {
          result_match["non_default_identifier"] = [getNonDefaultResultIdentifier(i)]
        } else {
          result_match["non_default_identifier"].push(getNonDefaultResultIdentifier(i))
        }
      }
    }
    return result_match
  }

  let retrieveResultType = (answers: AnswersLayout): ResultSpecsLayout => {
    let result_match: ResultSpecsLayout={};
    result_match = retrieveDefaultResult(answers, result_match);
    result_match = checkForNonDefaultResult(answers, result_match)
    return result_match
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
