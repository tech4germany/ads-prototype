import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { OrUndefined, StepDocumentLayout, DocumentQueueLayout, StepDocumentLayoutNew, EdgeDetail, StepDetail } from "data/customTypes"
import feature_map from "data/featuremap.json"
import { initialiseDocQueue, retrieveNonDefaultDoc, mapLabelToFeature } from "data/InterfaceNew"

let initialQueue: DocumentQueueLayout = initialiseDocQueue()
let fristDoc: StepDocumentLayoutNew  = initialQueue.filter(function (el) {return el.identifier === "frist"})[0]

export function useDocumentQueue(initialState: DocumentQueueLayout = initialQueue) {
  let [self, setDocumentQueue] = useState(initialState);

  // auxilliary functions
  let _updateVisibility = (docQueue: DocumentQueueLayout, newDocumentIdentifier: string, newVisibility: boolean): DocumentQueueLayout => {
    let updateDoc = docQueue.filter(function(element) {
      return element.identifier === newDocumentIdentifier
    })[0]
    updateDoc[StepDetail.visible] = newVisibility
    docQueue.splice(updateDoc[StepDetail.index], 1, updateDoc)
    return docQueue
  }

  let _removeFristQuestion = (docQueue: DocumentQueueLayout, identifier: string, label: string): DocumentQueueLayout => {
    let status: string | null = mapLabelToFeature(identifier, label, EdgeDetail.status)
    if (status === "non-agg") {
      docQueue = _updateVisibility(docQueue, "frist", false)
    }
    return docQueue
  }

  // setter functions
  let validateFristQuestion = (isAgg: boolean) => {
    if (isAgg) {
      let docQueue = [...self]
      docQueue = _updateVisibility(docQueue, "frist", true)
      setDocumentQueue(docQueue)
    }
  }

  let update = (activeStep: number, label: string): void => {
    let activeDocument = returnActiveDocument(activeStep)
    let newDocumentIdentifier = mapLabelToFeature(activeDocument.identifier, label, EdgeDetail.next_node)
    let _docQueue = [...self]

    // check if answer requires detail question
    if (!(newDocumentIdentifier === null)) {
      _docQueue = _updateVisibility(_docQueue, newDocumentIdentifier, true);
    }

    // check if we need to remove date question
    _docQueue = _removeFristQuestion(_docQueue, activeDocument.identifier, label)
    setDocumentQueue(_docQueue)
  }

  let removeVisibility = (activeDoc: StepDocumentLayoutNew): void => {
    if (activeDoc.type !== "default") {
      let _docQueue = [...self]
      _updateVisibility(_docQueue, activeDoc.identifier, false)
      setDocumentQueue(_docQueue)
    }
  }

  // getter functions
  let retrieveEdges = (activeStep: number): Array<string> => {
    let activeDocument: StepDocumentLayoutNew = self[activeStep]
    return Object.keys(activeDocument["edges"])
  }

  let retrieveEdgeFeatureByLabel = (activeStep: number, label: string, feature: EdgeDetail): string | null => {
    let activeDocument: StepDocumentLayoutNew = self[activeStep]
    return activeDocument["edges"][label][feature]
  }

  let retrieveStepDetail = (activeStep: number, detail: StepDetail): string | number | boolean => {
    let activeDocument: StepDocumentLayoutNew = self[activeStep]
    return activeDocument[detail]
  }

  let returnActiveDocument = (activeStep: number): StepDocumentLayoutNew => {
    return self[activeStep]
  }

  let activeDefaultStep = (activeStep: number): number => {
    let slicedDocQueue = self.slice(0, activeStep+1);
    let remainingDefaultDoc = slicedDocQueue.filter(function(el) {
      return el.type ==="default"
    })
    return remainingDefaultDoc.length-1
  }

  let retrieveVisibilityQueue = (): Array<boolean> => {
    return self.map( obj => obj.visible )
  }

  let extractStepTitles = () => {
    let defaultSteps = self.filter(function(el) {
      return (el.type ==="default" && el.visible === true)
    });
    return defaultSteps.map(obj => obj.step_title )
  }

  return { self, retrieveVisibilityQueue,
    returnActiveDocument, extractStepTitles, update, activeDefaultStep, removeVisibility, validateFristQuestion, retrieveEdges, retrieveEdgeFeatureByLabel, retrieveStepDetail }
}

export const DocumentQueue = createContainer(useDocumentQueue)
