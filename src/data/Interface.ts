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
import {StepDocumentLayout, EdgeDetail, DocumentQueueLayout, ResultSpecsLayout, SpecsLayout, ResultFeatureType } from "data/customTypes"

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

// retrieve additional documents for insertion into decision tree
export function retrieveNonDefaultDoc(identifier: string): StepDocumentLayout {
  let _newDoc = allDocuments.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

// retrieve edge node for a given document/label pair
export function mapLabelToFeature(stepIdentifier: string, label: string, feature: EdgeDetail ): string | null {
  let _doc = allDocuments.filter(function(element) {
    return element.identifier === stepIdentifier
  })
  return _doc[0]["edges"][label][feature]
}

// retrieve count of result types
export function getResultCount(): number {
  return result_map.length
}

// retrieve result mapping by id
export function getResultMap(id: number): ResultSpecsLayout {
  return result_map[id]
}

export function getResultProfile(id: number): SpecsLayout {
  let _profile = result_map.filter(function(element) {
    return element.identifier === id
  })[0]["profile"]
  return _profile
}

// retrieve result content by id
export function getResultFeature(id: number | undefined, feature: ResultFeatureType): string {
  let _feature = result_content.filter(function(element) {
    return element.identifier === id
  })[0]["features"][feature]
  return _feature
}
