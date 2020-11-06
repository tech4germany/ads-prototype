/*
This file handles all dealing with data from the webapp.
 */

import decision_tree from "data/decisiontree.json";
import labeltoid from "data/labeltoid.json";
import labeltoevent from "data/labeltoevent.json";
import labeltodescription from "data/labeltodescription.json";
import featuremap from "data/featuremap.json";

type OrNull<T> = T | null;

const resultObj = {
  "identifier": "result",
  "type": "default",
  "multiple_choice": false,
  "step_title": "result",
  "question": "",
  "explanation": "",
  "options": []
}
interface StepDocumentLayout {
  "identifier":string,
  "type":string,
  "multiple_choice": boolean,
  "step_title": string,
  "question": string,
  "explanation": string,
  "options": Array<string>
}
type DocumentQueueLayout = Array<StepDocumentLayout>

export function initialiseDocQueue() {
  var initialDocQueue: DocumentQueueLayout = decision_tree.filter(function (element) {
    return element.type === "default"
  })
  initialDocQueue.push(resultObj)
  return initialDocQueue
}

export function retrieveNonDefaultDoc(identifier: string): StepDocumentLayout {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

interface StepLabelToIdLayout {
  [key: string]: OrNull<string>;
}
interface LabelToIdLayout {
  [key: string]: StepLabelToIdLayout;
}
let LabelToId: LabelToIdLayout = labeltoid;
export function mapLabelToId(stepIdentifier: string, label: string): OrNull<string> {
  return LabelToId[stepIdentifier][label];
}

interface StepLabelToDescriptionLayout {
  [key: string]: OrNull<string>;
}
interface LabelToDescriptionLayout {
  [key: string]: StepLabelToIdLayout;
}
let LabelToDescription: LabelToDescriptionLayout = labeltodescription;
export function mapLabelToDescription(stepIdentifier: string, label: string): string {
  let nextId: OrNull<string> = LabelToDescription[stepIdentifier][label];
  if (nextId !== null) {
    return nextId
  } else { return "" }
}

interface FeatureToAgg {
  [key: string]: string;
}

interface FeatureMapLayout {
  [key: string]: FeatureToAgg;
}
let FeatureMap: FeatureMapLayout = featuremap;
export function mapFeatureToAgg(stepIdentifier: string, label: string): string {
  return FeatureMap[stepIdentifier][label];
}

interface StepLabelToIdEvent {
  [key: string]: string;
}
interface LabelToIdEventLayout {
  [key: string]: StepLabelToIdEvent;
}
let LabelToEvent: LabelToIdEventLayout = labeltoevent;
export function mapLabelToEvent(stepIdentifier: string, label: string): string {
  return LabelToEvent[stepIdentifier][label];
}
