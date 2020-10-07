import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { OrUndefined, StepDocumentLayout, DocumentQueueLayout, FeatureMapLayout } from "customTypes"
import { initialiseDocQueue, retrieveNonDefaultDoc, mapLabelToId } from "data/Interface"
import feature_map from "data/featuremap.json"
let featureMap: FeatureMapLayout = feature_map;

let initialQueue: DocumentQueueLayout = initialiseDocQueue()
let fristDoc: StepDocumentLayout  = initialQueue.filter(function (el) {return el.identifier === "frist"})[0]

export function useDocumentQueue(initialState: DocumentQueueLayout = initialQueue) {
  let [self, setDocumentQueue] = useState(initialState);

  const _retrieveDocIds = (): Array<string> => {
    return self.map(obj => obj.identifier)
  }

  const _setMChoicePurger = (activeStep: number, mchoice: boolean): number => {
    if ((!mchoice) && (self[activeStep+1]["type"] !== "default")) {return 1}
    else { return 0 }
  }

  const _insertNewDoc = (docQueue: DocumentQueueLayout, newDocumentIdentifier: string, activeStep: number, mchoice: boolean): DocumentQueueLayout => {
    let existingIdentifiers = self.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(newDocumentIdentifier))) {
      let newDocument = retrieveNonDefaultDoc(newDocumentIdentifier)
      docQueue.splice(activeStep+1, _setMChoicePurger(activeStep, mchoice), newDocument)
    }
    return docQueue
  }

  const _removeNewDoc = (newDocumentIdentifier: string): void => {
    let  _docQueue = [...self]
    let updatedDocQueue = _docQueue.filter(function (el) {
      return el.identifier !== newDocumentIdentifier
    })
    setDocumentQueue(updatedDocQueue)
  }

  const _removeOldDoc = (docQueue: DocumentQueueLayout, activeStep: number, mchoice: boolean): DocumentQueueLayout => {
    if ((!mchoice) && (self[activeStep+1]["type"] !== "default")) {
      docQueue.splice(activeStep+1, 1)
    }
    return docQueue
  }

  const _removeFristQuestion = (docQueue: DocumentQueueLayout, identifier: string, label: string): DocumentQueueLayout => {
    if (!["agg", "inTime", "notInTime"].includes(featureMap[identifier][label])) {
      if (self.map(obj => obj.identifier).includes("frist")) {
        docQueue = docQueue.filter(function (el) {
          return el.identifier !== "frist"
        })
      }
    }
    return docQueue
  }

  const validateFristQuestion = (isAgg: boolean) => {
    if (isAgg) {
      if (!(self.map(obj => obj.identifier).includes("frist"))) {
        let docQueue = [...self]
        docQueue.splice(docQueue.length-1, 0, fristDoc)
        setDocumentQueue(docQueue)
      }
    }
  }

  const add = (activeStep: number, label: string, mchoice: boolean): number => {
    let activeDocument = returnActiveDocument(activeStep)
    let newDocumentIdentifier = mapLabelToId(activeDocument.identifier, label)
    let _docQueue = [...self]

    // check if answer requires detail question
    if (!(newDocumentIdentifier === null)) {
      _docQueue = _insertNewDoc(_docQueue, newDocumentIdentifier, activeStep, mchoice);
    } else { _docQueue = _removeOldDoc(_docQueue, activeStep, mchoice) }

    // check if we need to remove date question
    _docQueue = _removeFristQuestion(_docQueue, activeDocument.identifier, label)
    setDocumentQueue(_docQueue)

    let remainingSteps = _docQueue.length - (activeStep + 1)
    return remainingSteps
  }

  const prune = (activeDoc: StepDocumentLayout): void => {
    if (activeDoc.type !== "default") {
      _removeNewDoc(activeDoc.identifier)
    }
  }

  const remove = (activeStep: number, label: string): void => {
    let activeDocument = returnActiveDocument(activeStep);
    let newDocumentIdentifier = mapLabelToId(activeDocument.identifier, label)
    if (!(newDocumentIdentifier === null)) {
      _removeNewDoc(newDocumentIdentifier);
    }
  }

  const retrieveIndexOfDoc = (identifier: string): OrUndefined<number> => {
    let indexDoc: OrUndefined<number>;
    let _drop = self.map((doc, index) => {
      if (doc.identifier === identifier) {
        indexDoc = index
      }
    })
    return indexDoc
  }

  let returnActiveDocument = (activeStep: number): StepDocumentLayout => {
    return self[activeStep]
  }

  let activeDefaultStep = (activeStep: number): number => {
    let slicedDocQueue = self.slice(0, activeStep+1);
    let remainingDefaultDoc = slicedDocQueue.filter(function(el) {
      return el.type ==="default"
    })
    return remainingDefaultDoc.length-1
  }

  let extractStepTitles = () => {
    let defaultSteps = self.filter(function(el) {
      return el.type ==="default"
    });
    return defaultSteps.map(obj => obj.step_title )
  }

  return { self, returnActiveDocument, extractStepTitles, add, remove, activeDefaultStep, retrieveIndexOfDoc, prune, validateFristQuestion }
}

export const DocumentQueue = createContainer(useDocumentQueue)
