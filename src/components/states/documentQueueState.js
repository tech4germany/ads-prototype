import { createContainer } from 'unstated-next';
import { useState } from 'react';

import { initialiseDocQueue, retrieveNonDefaultDoc, mapLabelToId } from "data/ProvideDecisionTree.js";

export function useDocumentQueue(initialState = initialiseDocQueue()) {
  let [self, setDocumentQueue] = useState(initialState);

  const _setMChoicePurger = (activeStep, mchoice) => {
    if ((!mchoice) && (self[activeStep+1]["type"] !== "default")) {return 1}
    else { return 0 }
  }

  const _insertNewDoc = (newDocumentIdentifier, activeStep, mchoice) => {
    let existingIdentifiers = self.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(newDocumentIdentifier))) {
      let newDocument = retrieveNonDefaultDoc(newDocumentIdentifier);
      let  _docQueue = [...self]
      _docQueue.splice(activeStep+1, _setMChoicePurger(activeStep, mchoice), newDocument)
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

  const _removeOldDoc = (activeStep, mchoice) => {
    if ((!mchoice) && (self[activeStep+1]["type"] !== "default")) {
      let  _docQueue = [...self]
      _docQueue.splice(activeStep+1, 1)
      setDocumentQueue(_docQueue);
    }
  }

  const add = (activeStep, label, mchoice) => {
    let activeDocument = returnActiveDocument(activeStep)
    let newDocumentIdentifier = mapLabelToId(activeDocument.identifier, label)
    if (!(newDocumentIdentifier === null)) {
      _insertNewDoc(newDocumentIdentifier, activeStep, mchoice);
    } else { _removeOldDoc(activeStep, mchoice) }
  }

  const remove = (activeStep, label) => {
    let activeDocument = returnActiveDocument(activeStep);
    let newDocumentIdentifier = mapLabelToId(activeDocument.identifier, label)
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
