/*
This file handles all dealing with data from the webapp.
 */
import merkmal from "data/stepDocuments/merkmal.json"
import merkmal_ethnisch_detail from "data/stepDocuments/merkmal_ethnisch_detail.json"
import merkmal_gender_detail from "data/stepDocuments/merkmal_gender_detail.json"
import merkmal_religion_detail from "data/stepDocuments/merkmal_religion_detail.json"
import lebensbereich from "data/stepDocuments/lebensbereich.json"
import lebensbereich_arbeit_detail from "data/stepDocuments/lebensbereich_arbeit_detail.json"
import lebensbereich_bildung_detail from "data/stepDocuments/lebensbereich_bildung_detail.json"
import lebensbereich_gesundheit_detail from "data/stepDocuments/lebensbereich_gesundheit_detail.json"
import lebensbereich_administration_detail from "data/stepDocuments/lebensbereich_administration_detail.json"
import frist from "data/stepDocuments/frist.json"
import default_result_map from "data/resultDocuments/defaultResultMap.json"
import non_default_result_map from "data/resultDocuments/nonDefaultResultMap.json"
import non_default_result_content from "data/resultDocuments/nonDefaultResultContent.json"
import default_result_content from "data/resultDocuments/defaultResultContent.json"
import {
  NonDefaultResultContentLayout,
  MaterialLayout,
  TemplateLayout,
  ReferralLayout,
  DefaultSpecsLayout,
  NonDefaultSpecsLayout,
  EdgeDetail,
  DocumentQueueLayout,
  ResultFeatureType
} from "data/customTypes"

// collect all documents
let allDocuments: DocumentQueueLayout = [
  merkmal,
  merkmal_ethnisch_detail,
  merkmal_gender_detail,
  merkmal_religion_detail,
  lebensbereich,
  lebensbereich_arbeit_detail,
  lebensbereich_bildung_detail,
  lebensbereich_gesundheit_detail,
  lebensbereich_administration_detail,
  frist,
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
export function getDefaultResultCount(): number {
  return default_result_map.length
}

export function getNonDefaultResultCount(): number {
  return non_default_result_map.length
}

// retrieve result map
export function getDefaultResultIdentifier(id: number): number {
  return JSON.parse(JSON.stringify(default_result_map[id].identifier))
}

export function getDefaultResultProfile(id: number): DefaultSpecsLayout {
  return JSON.parse(JSON.stringify(default_result_map[id].profile))
}

export function getNonDefaultResultIdentifier(id: number): number {
  return JSON.parse(JSON.stringify(non_default_result_map[id].identifier))
}

export function getNonDefaultResultFeatures(id: number): NonDefaultSpecsLayout {
  let _features = non_default_result_map[id]["features"]
  return _features
}

// retrieve result content by id
export function getResultFeature(id: number | undefined, feature: ResultFeatureType): string | null {
  let _feature = default_result_content.filter(function(element) {
    return element.identifier === id
  })[0]["features"][feature]
  return _feature
}

// retrieve additional content information
export function getResultReferrals(ids: Array<number> | undefined): Array<ReferralLayout> {
  let referrals: Array<ReferralLayout> =[];
  if (typeof ids === "undefined") { return referrals}
  for (const val of ids) {
    let _result: NonDefaultResultContentLayout = non_default_result_content.filter(function(element) {
      return element.identifier === val
    })[0]
      if (typeof _result["additional_content"]["referrals"] !== "undefined") {
        referrals.push(..._result["additional_content"]["referrals"])
      }
  }
  return referrals
}

export function getResultTemplates(ids: Array<number> | undefined): Array<TemplateLayout> {
  let templates: Array<TemplateLayout> =[];
  if (typeof ids === "undefined") { return templates}
  for (const val of ids) {
    let _result: NonDefaultResultContentLayout = non_default_result_content.filter(function(element) {
      return element.identifier === val
    })[0]
      if (typeof _result["additional_content"]["templates"] !== "undefined") {
        templates.push(..._result["additional_content"]["templates"])
      }
  }
  return templates
}

export function getResultMaterials(ids: Array<number> | undefined): Array<MaterialLayout> {
  let materials: Array<MaterialLayout> =[];
  if (typeof ids === "undefined") { return materials}
  for (const val of ids) {
    let _result: NonDefaultResultContentLayout = non_default_result_content.filter(function(element) {
      return element.identifier === val
    })[0]
      if (typeof _result["additional_content"]["materials"] !== "undefined") {
        materials.push(..._result["additional_content"]["materials"])
      }
  }
  return materials
}

export function getResultAdditionalText(ids: Array<number> | undefined): string | null {
  let add_text: Array<string>=[];
  if (typeof ids === "undefined") { return null}
  for (const val of ids) {
    let _result: NonDefaultResultContentLayout = non_default_result_content.filter(function(element) {
      return element.identifier === val
    })[0]
      if (typeof _result["additional_content"]["add_text"] !== "undefined") {
        add_text.push(_result["additional_content"]["add_text"])
      }
  }

  if (add_text.length === 1) {return add_text[0]}
  if (add_text.length === 0) {return null}
  if (add_text.length > 1) {
    return add_text[0]
  }
  return null
}
