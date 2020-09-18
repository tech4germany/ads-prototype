import { createContainer } from 'unstated-next';
import React, { useState } from 'react';

{/*

const retrieveSelectionLink = (label) => {
  return activeDocument["options"][label]
}

const insertNewDoc = (newDocumentIdentifier, documentQueue) => {
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

function useDocumentQueue(initialState = {}) {
  let [documentQueue, setDocumentQueue] = useState(initialState)

  const addDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveSelectionLink(label);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = insertNewDoc(newDocumentIdentifier, _documentQueue);
      setDocumentQueue(_documentQueue);
      updateStepTracker(_documentQueue);
    }
  }

  const removeDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveSelectionLink(label, activeDocument);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = removeNewDoc(newDocumentIdentifier, _documentQueue);
      setDocumentQueue(_documentQueue);
      updateStepTracker(_documentQueue);
    }
  }

  return { documentQueue }
}

export const DocumentQueue = createContainer(useDocumentQueue)
*/}