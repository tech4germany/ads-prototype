import { createContainer } from 'unstated-next';
import { useState } from 'react';

import { initialiseDocQueue, retrieveNonDefaultDoc } from "data/ProvideDecisionTree.js";

export function useDocumentQueue(initialState = initialiseDocQueue()) {
  let [self, setDocumentQueue] = useState(initialState);

  const _insertNewDoc = (newDocumentIdentifier, activeStep, documentQueue) => {
    let existingIdentifiers = documentQueue.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(newDocumentIdentifier.identifier))) {
      let newDocument = retrieveNonDefaultDoc(newDocumentIdentifier);
      documentQueue.splice(activeStep+1, 0, newDocument);
      }
    return documentQueue
  }

  const _removeNewDoc = (newDocumentIdentifier, documentQueue) => {
    return documentQueue.filter(function (el) {
      return el.identifier !== newDocumentIdentifier
    })
  }


  const add = (activeStep, label) => {
    let _documentQueue = [...self];
    let activeDocument = _documentQueue[activeStep];
    let newDocumentIdentifier = activeDocument["options"][label];
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = _insertNewDoc(newDocumentIdentifier, activeStep, _documentQueue);
      setDocumentQueue(_documentQueue);
    }
  }

  const remove = (activeStep, label) => {
    let _documentQueue = [...self];
    let activeDocument = _documentQueue[activeStep];
    let newDocumentIdentifier = activeDocument["options"][label];
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = _removeNewDoc(newDocumentIdentifier, _documentQueue);
      setDocumentQueue(_documentQueue);
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

  return { self, returnActiveDocument, extractStepTitles, add, remove, activeDefaultStep, retrieveIndexOfDoc }
}
export const DocumentQueue = createContainer(useDocumentQueue)
