import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { OrUndefined, StepDocumentLayout, DocumentQueueLayout } from "customTypes"
import { initialiseDocQueue, retrieveNonDefaultDoc, mapLabelToId } from "data/Interface"

export function useDocumentQueue(initialState: DocumentQueueLayout = initialiseDocQueue()) {
  let [self, setDocumentQueue] = useState(initialState);

  const _setMChoicePurger = (activeStep: number, mchoice: boolean): number => {
    if ((!mchoice) && (self[activeStep+1]["type"] !== "default")) {return 1}
    else { return 0 }
  }

  const _insertNewDoc = (newDocumentIdentifier: string, activeStep: number, mchoice: boolean): void => {
    let existingIdentifiers = self.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(newDocumentIdentifier))) {
      let newDocument = retrieveNonDefaultDoc(newDocumentIdentifier);
      let  _docQueue = [...self]
      _docQueue.splice(activeStep+1, _setMChoicePurger(activeStep, mchoice), newDocument)
      setDocumentQueue(_docQueue);
      }
  }

  const _removeNewDoc = (newDocumentIdentifier: string): void => {
    let  _docQueue = [...self]
    let updatedDocQueue = _docQueue.filter(function (el) {
      return el.identifier !== newDocumentIdentifier
    })
    setDocumentQueue(updatedDocQueue)
  }

  const _removeOldDoc = (activeStep: number, mchoice: boolean): void => {
    if ((!mchoice) && (self[activeStep+1]["type"] !== "default")) {
      let  _docQueue = [...self]
      _docQueue.splice(activeStep+1, 1)
      setDocumentQueue(_docQueue);
    }
  }

  const add = (activeStep: number, label: string, mchoice: boolean): void => {
    let activeDocument = returnActiveDocument(activeStep)
    let newDocumentIdentifier = mapLabelToId(activeDocument.identifier, label)
    if (!(newDocumentIdentifier === null)) {
      _insertNewDoc(newDocumentIdentifier, activeStep, mchoice);
    } else { _removeOldDoc(activeStep, mchoice) }
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

  return { self, returnActiveDocument, extractStepTitles, add, remove, activeDefaultStep, retrieveIndexOfDoc }
}

export const DocumentQueue = createContainer(useDocumentQueue)
