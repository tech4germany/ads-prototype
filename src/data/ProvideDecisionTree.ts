import decision_tree from "data/decisiontree.json";
import labeltoid from "data/labeltoid.json";

const resultObj = {
  "identifier": "result",
  "type": "default",
  "multiple_choice": false,
  "step_title": "result",
  "question": "",
  "explanation": "",
  "options": []
}
interface StepDocumentLayout {
  "identifier":string,
  "type":string,
  "multiple_choice": boolean,
  "step_title": string,
  "question": string,
  "explanation": string,
  "options": Array<string>
}
type DocumentQueueLayout = Array<StepDocumentLayout>

export function initialiseDocQueue() {
  var initialDocQueue: DocumentQueueLayout = decision_tree.filter(function (element) {
    return element.type === "default"
  })
  initialDocQueue.push(resultObj)
  return initialDocQueue
}

export function retrieveNonDefaultDoc(identifier: string): StepDocumentLayout {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

type OrNull<T> = T | null;
interface StepLabelToIdLayout {
  [key: string]: OrNull<string>;
}
interface LabelToIdLayout {
  [key: string]: StepLabelToIdLayout;
}
let LabelToId: LabelToIdLayout = labeltoid;
export function mapLabelToId(stepIdentifier: string, label: string): string {
  let nextId: OrNull<string> = LabelToId[stepIdentifier][label];
  if (nextId !== null) {
    return nextId
  } else { return "" }
}
