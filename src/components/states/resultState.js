import { createContainer } from 'unstated-next';
import { useState } from 'react';

import result_map from "data/resultmap.json";
import feature_map from "data/featuremap.json";

let _initialState = {
  "profile": null
}

export function useResultSpecs(initialState = _initialState) {
  let [self, setResultSpecs] = useState(initialState)

  const _isEquivalent = (a, b) => {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
          return false;
      }
      for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
          if (a[propName] !== b[propName]) {
              return false;
          }
      }
      return true;
  }

  const _parseAnswerToProfile = (answers) => {
    let answersProfile = {};
    for (var key in answers.self) {
      let translatedAnswer = answers.self[key].map(function(el) { return feature_map[key][el] })
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

  const _checkForAgg = (answerProfile) => {
    if (Object.values(answerProfile).includes("non-agg")) { return false }
    else { return true}
  }

  const _checkForFrist = (answerProfile) => {
    if (answerProfile["frist"] !== "inTime") { return false }
    else { return true}
  }

  const _parseAnswerToSparseProfile = (answers) => {
    let answerProfile = _parseAnswerToProfile(answers)
    let sparseAnswerProfile = {};
    sparseAnswerProfile["agg"] = _checkForAgg(answerProfile)
    sparseAnswerProfile["frist"] = _checkForFrist(answerProfile)
    return sparseAnswerProfile
  }

  const matchFeatureProfileToResult = (sparseAnswerProfile) => {
    let res_match;
    for (var i=0; i < result_map.length; i++) {
      if (_isEquivalent(result_map[i]["profile"], sparseAnswerProfile)) {
        res_match = result_map[i]
        break
      }
    }
    setResultSpecs(res_match)
  }

  const retrieveSpecs = (answers) => {
    let sparseAnswerProfile = _parseAnswerToSparseProfile(answers)
    matchFeatureProfileToResult(sparseAnswerProfile)
  }

  const isAGG = () => {
    if (self["profile"].agg) { return true }
    else { return false }
  }

  const isFrist = () => {
    if (self["profile"].frist) { return true }
    else { return false }
  }

  const isSet = () => {
    if (self.profile !== null) { return true }
    else { return false }
  }

  return { self, retrieveSpecs, isAGG, isFrist, isSet }
}
export const ResultSpecs = createContainer(useResultSpecs)
