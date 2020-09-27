import { createContainer } from 'unstated-next';
import { useState } from 'react';

import { initialiseDocQueue, retrieveNonDefaultDoc } from "data/ProvideDecisionTree.js";

export function useDocumentQueue(initialState = initialiseDocQueue()) {
  let [self, setDocumentQueue] = useState(initialState);

  const _insertNewDoc = (newDocumentIdentifier, activeStep) => {
    let existingIdentifiers = self.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(newDocumentIdentifier))) {
      let newDocument = retrieveNonDefaultDoc(newDocumentIdentifier);
      let  _docQueue = [...self]
      _docQueue.splice(activeStep+1, 0, newDocument)
      setDocumentQueue(_docQueue);
      }
  }

  const _removeNewDoc = (newDocumentIdentifier) => {
    let  _docQueue = [...self]
    let updatedDocQueue = _docQueue.filter(function (el) {
      return el.identifier !== newDocumentIdentifier
    })
    setDocumentQueue(updatedDocQueue)
  }

  const add = (activeStep, label) => {
    let activeDocument = returnActiveDocument(activeStep)
    let newDocumentIdentifier = activeDocument["options"][label]
    if (!(newDocumentIdentifier === null)) {
      _insertNewDoc(newDocumentIdentifier, activeStep);
    }
  }

  const remove = (activeStep, label) => {
    let activeDocument = returnActiveDocument(activeStep);
    let newDocumentIdentifier = activeDocument["options"][label];
    if (!(newDocumentIdentifier === null)) {
      _removeNewDoc(newDocumentIdentifier);
    }
  }

  const retrieveIndexOfDoc = (identifier) => {
    let indexDoc;
    self.map((doc, index) => {
      if (doc.identifier === identifier) {
        indexDoc = index
      }
    })
    return indexDoc
  }

  const retrieveDocId = (activeStep, label) => {
    let activeDocument = returnActiveDocument(activeStep);
    return activeDocument["options"][label]
  }

  let returnActiveDocument = (activeStep) => {
    return self[activeStep]
  }

  let activeDefaultStep = (activeStep) => {
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

  return { self, returnActiveDocument, extractStepTitles, add, remove, activeDefaultStep, retrieveIndexOfDoc,
  retrieveDocId
   }
}

export const DocumentQueue = createContainer(useDocumentQueue)
