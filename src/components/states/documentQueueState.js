import { createContainer } from 'unstated-next';
import { useState } from 'react';

import decision_tree from "./../journey/documents/decisiontree_v2.json";

const resultObj = {
  "identifier": "result",
  "type":"default",
  "step_title": "Result"
}

const initialiseDocumentQueue = () => {
  var initialDocQueue = decision_tree.filter(function (element) {
    return element.type === "default"
  })
  initialDocQueue.push(resultObj)
  return initialDocQueue
}

const retrieveNonDefaultDocument = (identifier) => {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

const insertNewDoc = (newDocumentIdentifier, activeStep, documentQueue) => {
  let existingIdentifiers = documentQueue.map(obj => obj.identifier);
  if (!(existingIdentifiers.includes(newDocumentIdentifier.identifier))) {
    let newDocument = retrieveNonDefaultDocument(newDocumentIdentifier);
    documentQueue.splice(activeStep+1, 0, newDocument);
    }
  return documentQueue
}

const removeNewDoc = (newDocumentIdentifier, documentQueue) => {
  return documentQueue.filter(function (el) {
    return el.identifier !== newDocumentIdentifier
  })
}

export function useDocumentQueue(initialState = initialiseDocumentQueue()) {
  let [self, setDocumentQueue] = useState(initialState);

  let active = (activeStep) => {
    return self[activeStep]
  }

  let activeDefaultStep = (activeStep) => {
    let slicedDocQueue = self.slice(0, activeStep+1);
    let remainingDefaultDoc = slicedDocQueue.filter(function(el) {
      return el.type ==="default"
    })
    return remainingDefaultDoc.length-1
  }

  let steps = () => {
    let defaultSteps = self.filter(function(el) {
      return el.type ==="default"
    });
    return defaultSteps.map(obj => obj.step_title )
  }

  const add = (activeStep, label) => {
    let _documentQueue = [...self];
    let activeDocument = _documentQueue[activeStep];
    let newDocumentIdentifier = activeDocument["options"][label];
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = insertNewDoc(newDocumentIdentifier, activeStep, _documentQueue);
      setDocumentQueue(_documentQueue);
    }
  }

  const remove = (activeStep, label) => {
    let _documentQueue = [...self];
    let activeDocument = _documentQueue[activeStep];
    let newDocumentIdentifier = activeDocument["options"][label];
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = removeNewDoc(newDocumentIdentifier, _documentQueue);
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

  return { self, active, steps, add, remove, activeDefaultStep, retrieveIndexOfDoc }
}
export const DocumentQueue = createContainer(useDocumentQueue)
