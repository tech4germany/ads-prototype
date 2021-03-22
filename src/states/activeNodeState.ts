import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ActiveNodeLayout, DocumentQueueLayout, EdgeDetail, StepDetail } from "data/customTypes"
import { initialiseDocQueue, mapLabelToFeature } from "data/Interface"

let initialQueue: DocumentQueueLayout = initialiseDocQueue()
let initialNode = {
  "activeDoc": initialQueue[0],
  "previousNode": []
}
export function useActiveNode(initialState: ActiveNodeLayout = initialNode) {

  let [self, setActiveNode] = useState(initialState);

  // setter functions
  let move_forward = (label: string): void => {
    let activeNode = {...self}
    let newDocumentIdentifier = mapLabelToFeature(getStepIdentifier(), label, EdgeDetail.next_node)

    // new active document
    activeNode.previousNode.push(getStepIdentifier())
    activeNode.activeDoc = initialQueue.filter(function(element) {
      return element.identifier === newDocumentIdentifier
    })[0]

    setActiveNode(activeNode)
  }

  let move_backward = (): void => {
    let activeNode = {...self}
    let newDocumentIdentifier = activeNode.previousNode.pop()

    // new active document
    activeNode.activeDoc = initialQueue.filter(function(element) {
      return element.identifier === newDocumentIdentifier
    })[0]

    setActiveNode(activeNode)
  }

  // getter functions
  let getEdges = (): Array<string> => {
    return Object.keys(self.activeDoc["edges"])
  }

  let getEdgeFeatureByLabel = (label: string, feature: EdgeDetail): string | null => {
    return self.activeDoc["edges"][label][feature]
  }

  let getStepDetail = (detail: StepDetail): string | number | boolean => {
    return self.activeDoc[detail]
  }

  let getStepIdentifier = () => {
    return self.activeDoc["identifier"]
  }

  let isRoot = (): boolean => {
    if (self.previousNode.length === 0) { return true }
    else { return false }
  }

  let isLeaf = (label: string, isAgg: boolean): boolean => {
    if (getEdgeFeatureByLabel(label, EdgeDetail.next_node) === "result") {
      return true
    } else if (getEdgeFeatureByLabel(label, EdgeDetail.next_node) === "frist") {
      if (isAgg !== true) {
        return true
       }
    }
    return false
  }

  return { self,
    move_forward,
    move_backward,
    getEdges,
    getEdgeFeatureByLabel,
    getStepDetail,
    getStepIdentifier,
    isRoot,
    isLeaf
  }
}

export const DocumentQueue = createContainer(useActiveNode)
