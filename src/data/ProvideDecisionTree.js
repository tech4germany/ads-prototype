import decision_tree from "data/decisiontree.json";
import labeltoid from "data/labeltoid.json";

const resultObj = {
  "identifier": "result",
  "type":"default",
  "step_title": "Result"
}

export function initialiseDocQueue() {
  var initialDocQueue = decision_tree.filter(function (element) {
    return element.type === "default"
  })
  initialDocQueue.push(resultObj)
  return initialDocQueue
}

export function retrieveNonDefaultDoc(identifier) {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

export function mapLabelToId(stepIdentifier, label) {
  return labeltoid[stepIdentifier][label]
}