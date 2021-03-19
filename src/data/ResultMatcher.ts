/*
This file handles the matching of given answers to result profiles.

There are two types of result profiles.

1) Default result profiles
Default result profiles are required for every answer set and are fixed in structure.
The default answer profile reflects a) whether the answer profile is coverd by AGG
and b) whether the answer profile is within the frist window.

2. Non-default result profiles
The non-default result profiles matches the provided answers to a number of more
complex result profiles that allow the application to provide more detailed
information for a given case.

 */
import {
  AnswerProfileLayout,
  DefaultSpecsLayout,
  NonDefaultSpecsLayout,
  AnswersLayout,
  ResultSpecsLayout,
  EdgeDetail
} from "data/customTypes"
import {
  getDefaultResultCount,
  getNonDefaultResultCount,
  mapLabelToFeature,
  getDefaultResultIdentifier,
  getDefaultResultProfile,
  getNonDefaultResultIdentifier,
  getNonDefaultResultFeatures
} from "data/Interface"


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

export let retrieveResultType = (answers: AnswersLayout): ResultSpecsLayout => {
  let result_match: ResultSpecsLayout={};
  result_match = retrieveDefaultResult(answers, result_match);
  result_match = checkForNonDefaultResult(answers, result_match)
  return result_match
}
