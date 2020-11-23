/*
This file handles all dealing with data from the webapp.
 */
import merkmal from "data/stepDocuments/merkmal.json"
import merkmal_ethnisch_detail from "data/stepDocuments/merkmal_ethnisch_detail.json"
import merkmal_gender_detail from "data/stepDocuments/merkmal_gender_detail.json"
import lebensbereich from "data/stepDocuments/lebensbereich.json"
import lebensbereich_arbeit_detail from "data/stepDocuments/lebensbereich_arbeit_detail.json"
import lebensbereich_bildung_detail from "data/stepDocuments/lebensbereich_bildung_detail.json"
import lebensbereich_gesundheit_detail from "data/stepDocuments/lebensbereich_gesundheit_detail.json"
import frist from "data/stepDocuments/frist.json"
import result_placeholder from "data/stepDocuments/result_placeholder.json"
import result_map from "data/resultDocuments/resultmap.json"
import result_content from "data/resultDocuments/resultContent.json"
import {ResultContentLayout, ReferralLayout, AdditionalContentType, ResultType, DefaultSpecsLayout, NonDefaultSpecsLayout, StepDocumentLayout, EdgeDetail, DocumentQueueLayout, ResultSpecsLayout, ResultFeatureType } from "data/customTypes"

// collect all documents
let allDocuments: DocumentQueueLayout = [
  merkmal,
  merkmal_ethnisch_detail,
  merkmal_gender_detail,
  lebensbereich,
  lebensbereich_arbeit_detail,
  lebensbereich_bildung_detail,
  lebensbereich_gesundheit_detail,
  frist,
  result_placeholder
];

// collect documents required for initial decision tree
export function initialiseDocQueue(): DocumentQueueLayout {
  allDocuments.forEach((element, index) => {
    if (element.type === "default") {
      element.visible = true
    }
    element.index = index
  })
  return allDocuments
}

// retrieve edge node for a given document/label pair
export function mapLabelToFeature(stepIdentifier: string, label: string, feature: EdgeDetail ): string | null {
  let _doc = allDocuments.filter(function(element) {
    return element.identifier === stepIdentifier
  })
  return _doc[0]["edges"][label][feature]
}

// retrieve count of result types
export function getResultCount(result_type: ResultType): number {
  return result_map[result_type].length
}

// retrieve result mapping by id
export function getResultMap(id: number, result_type: ResultType): ResultSpecsLayout {
  return JSON.parse(JSON.stringify(result_map[result_type][id]))
}

export function getDefaultResultProfile(id: number): DefaultSpecsLayout {
  let _profile = result_map[ResultType.default][id]["profile"]
  return _profile
}

export function getNonDefaultResultFeatures(id: number): NonDefaultSpecsLayout {
  let _features = result_map[ResultType.non_default][id]["features"]
  return _features
}

export function getNonDefaultResultId(id: number): number {
  let _identifier = result_map[ResultType.non_default][id]["identifier"]
  return _identifier
}

// retrieve result content by id
export function getResultFeature(id: number | undefined, feature: ResultFeatureType): string {
  let _feature = result_content.filter(function(element) {
    return element.identifier === id
  })[0]["features"][feature]
  return _feature
}

// retrieve additional content information
export function getResultReferrals(id: number | undefined): Array<ReferralLayout> | null {
  let _result: ResultContentLayout = result_content.filter(function(element) {
    return element.identifier === id
  })[0]
  console.log("res content: ", _result)
  if (typeof _result["additional_content"] !== "undefined") {
    if (typeof _result["additional_content"]["referrals"] !== "undefined") {
      return _result["additional_content"]["referrals"]
    }
  }
  return null
}

export function getResultTemplates(id: number | undefined): Array<string> | null {
  let _result: ResultContentLayout = result_content.filter(function(element) {
    return element.identifier === id
  })[0]
  if (typeof _result["additional_content"] !== "undefined") {
    if (typeof _result["additional_content"]["templates"] !== "undefined") {
      return _result["additional_content"]["templates"]
    }
  }
  return null
}

export function getResultMaterials(id: number | undefined): Array<string> | null {
  let _result: ResultContentLayout = result_content.filter(function(element) {
    return element.identifier === id
  })[0]
  if (typeof _result["additional_content"] !== "undefined") {
    if (typeof _result["additional_content"]["material"] !== "undefined") {
      return _result["additional_content"]["material"]
    }
  }
  return null
}
