import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { FeatureMapLayout, AnswersProfileLayout, AnswersLayout, SpecsLayout, ResultSpecsLayout} from "customTypes"
import result_map from "data/resultmap.json"
import feature_map from "data/featuremap.json"

let featureMap: FeatureMapLayout = feature_map;
let _initialState = {
  "identifier": -1,
  "profile": null
}

export function useResultSpecs(initialState: ResultSpecsLayout = _initialState) {
  let [self, setResultSpecs] = useState(initialState)

  const _isEquivalent = (a: SpecsLayout, b: SpecsLayout): boolean => {
    if ((a.agg === b.agg) && (a.frist === b.frist)) {
      return true

    } else { return false}
  }

  const _parseAnswerToProfile = (answers: AnswersLayout): AnswersProfileLayout => {
    let answersProfile: AnswersProfileLayout = {};
    for (var key in answers) {
      let translatedAnswer = answers[key].map(function(el) { return featureMap[key][el] })
      if (key !== "frist") {
        if (translatedAnswer.includes("agg")) { answersProfile[key] = "agg" }
        else { answersProfile[key] = "non-agg" }
      } else {
        if (translatedAnswer.includes("inTime")) { answersProfile[key] = "inTime" }
        else { answersProfile[key] = "notInTime" }
      }
    }
    return answersProfile
  }

  const _checkForAgg = (answerProfile: AnswersProfileLayout): boolean => {
    if (Object.values(answerProfile).includes("non-agg")) { return false }
    else { return true}
  }

  const _checkForFrist = (answerProfile: AnswersProfileLayout): boolean => {
    if (answerProfile["frist"] !== "inTime") { return false }
    else { return true}
  }

  const _parseAnswerToSparseProfile = (answers: AnswersLayout): SpecsLayout => {
    let answerProfile = _parseAnswerToProfile(answers)
    let sparseAnswerProfile: SpecsLayout={"agg":false, "frist": false};
    sparseAnswerProfile["agg"] = _checkForAgg(answerProfile)
    sparseAnswerProfile["frist"] = _checkForFrist(answerProfile)
    return sparseAnswerProfile
  }

  const matchFeatureProfileToResult = (sparseAnswerProfile: SpecsLayout): void => {
    let res_match: ResultSpecsLayout={"identifier":-1, "profile": null};
    for (var i=0; i < result_map.length; i++) {
      if (_isEquivalent(result_map[i]["profile"], sparseAnswerProfile)) {
        res_match = result_map[i]
        break
      }
    }
    setResultSpecs(res_match)
  }

  const retrieveSpecs = (answers: AnswersLayout): void => {
    let sparseAnswerProfile = _parseAnswerToSparseProfile(answers)
    matchFeatureProfileToResult(sparseAnswerProfile)
  }

  const isAGG = (): boolean => {
    if (self["profile"] !== null) {
      if (self["profile"].agg) { return true }
      else { return false }
    } else { return false }
  }

  const isFrist = (): boolean => {
    if (self["profile"] !== null) {
      if (self["profile"].frist) { return true }
      else { return false }
    } else { return false }
  }

  const isSet = (): boolean => {
    if (self.profile !== null) { return true }
    else { return false }
  }

  return { self, retrieveSpecs, isAGG, isFrist, isSet }
}
export const ResultSpecs = createContainer(useResultSpecs)
