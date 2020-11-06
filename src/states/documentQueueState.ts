import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { DocumentQueueLayout, StepDocumentLayoutNew, EdgeDetail, StepDetail, UpdateType } from "data/customTypes"
import { initialiseDocQueue, mapLabelToFeature } from "data/InterfaceNew"

let initialQueue: DocumentQueueLayout = initialiseDocQueue()
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

  let update = (type: UpdateType, activeStep: number, label: string = ""): void => {
    let activeDocument = self[activeStep]
    let _docQueue = [...self]

    if (type === UpdateType.add) {
      let newDocumentIdentifier = mapLabelToFeature(activeDocument.identifier, label, EdgeDetail.next_node)

      // check if answer requires detail question
      if (!(newDocumentIdentifier === null)) {
        _docQueue = _updateVisibility(_docQueue, newDocumentIdentifier, true);
      }

      // check if we need to remove date question
      _docQueue = _removeFristQuestion(_docQueue, activeDocument.identifier, label)

    } else {
      // if document is no default document we reset its status back to invisible
      if (activeDocument.type !== "default") {
        _updateVisibility(_docQueue, activeDocument.identifier, false)
      }
    }
    setDocumentQueue(_docQueue)
  }

  // getter functions
  let getEdges = (activeStep: number): Array<string> => {
    let activeDocument: StepDocumentLayoutNew = self[activeStep]
    return Object.keys(activeDocument["edges"])
  }

  let getEdgeFeatureByLabel = (activeStep: number, label: string, feature: EdgeDetail): string | null => {
    let activeDocument: StepDocumentLayoutNew = self[activeStep]
    return activeDocument["edges"][label][feature]
  }

  let getStepDetail = (activeStep: number, detail: StepDetail): string | number | boolean => {
    let activeDocument: StepDocumentLayoutNew = self[activeStep]
    return activeDocument[detail]
  }

  let getVisibilityQueue = (): Array<boolean> => {
    return self.map( obj => obj.visible )
  }

  let getStepTitles = () => {
    let defaultSteps = self.filter(function(el) {
      return (el.type ==="default" && el.visible === true)
    });
    return defaultSteps.map(obj => obj.step_title )
  }

  let getActiveDefaultStep = (activeStep: number) => {
    let slicedQueue = self.filter(function(el) {
      return el.index <= activeStep && el.type === "default"
    });
    return slicedQueue.length - 1
  }

  return { self,
    update,
    validateFristQuestion,
    getVisibilityQueue,
    getEdges,
    getEdgeFeatureByLabel,
    getStepDetail,
    getStepTitles,
    getActiveDefaultStep
  }
}

export const DocumentQueue = createContainer(useDocumentQueue)
