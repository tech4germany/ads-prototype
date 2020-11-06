export type OrNull<T> = T | null;
export type OrUndefined<T> = T | undefined;

export type ActiveStepLayout = number;

export type AnswersLayout = {
  [key: string]: Array<string>;
};

export type FeatureNode = {
  [key: string]: string;
};

export type FeatureMapLayout = {
  [key: string]: FeatureNode
};

export type AnswerProfileLayout = {
  [key: string]: boolean;
};

export type SpecsLayout = {
  "agg": boolean,
  "frist": boolean
};

export type ResultSpecsLayout = {
  "identifier"?: number,
  "profile"?: SpecsLayout
};

type DefaultList = Array<string>;
type NonDefaultList = Array<string>;
export type InventoryLayout = {
  "decisiontree": {
    "default": DefaultList,
    "NonDefaultListdefault": NonDefaultList
  }
};

export enum UpdateType {
  add = "add",
  remove = "remove"
}

export enum StepDetail {
  identifier = "identifier",
  type = "type",
  step_title = "step_title",
  multiple_choice = "multiple_choice",
  visible = "visible",
  index = "index",
  question = "question",
  explanation = "explanation"
}

export enum EdgeDetail {
  status="status",
  description="description",
  next_node="next_node"
}
export type EdgeDetailsLayout = {
    "status": string,
    "description": string | null,
    "next_node": string | null
}

export interface StepDocumentLayout {
  "identifier": string,
  "type": string,
  "step_title": string,
  "multiple_choice": boolean,
  "question": string,
  "explanation": string,
  "visible": boolean,
  "index": number,
  "edges": {
    [key: string]: EdgeDetailsLayout
  }
}

export type DocumentQueueLayout = Array<StepDocumentLayout>;
