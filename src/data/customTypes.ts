export type ActiveStepLayout = number;

export type AnswersLayout = {
  [key: string]: Array<string>;
};

export type AnswerProfileLayout = {
  [key: string]: boolean;
};

export type DefaultSpecsLayout = {
  "agg": boolean,
  "frist": boolean
};

export type NonDefaultSpecsLayout = {
  [key: string]: string[] | undefined;
}

export type ResultSpecsLayout = {
  "default_identifier"?: number,
  "non_default_identifier"?: Array<number>,
  "profile"?: DefaultSpecsLayout,
  "features"?: NonDefaultSpecsLayout
}

type AdditionalContentLayout = {
  "referrals"?: Array<ReferralLayout>,
  "templates"?: Array<TemplateLayout>,
  "materials"?: Array<MaterialLayout>
}

export type DefaultResultContentLayout = {
  "identifier": number,
  "features": {
    "agg_text": string,
    "frist_text": string,
    "next_step": string
  },
  "additional_content"?: AdditionalContentLayout
}

export type NonDefaultResultContentLayout = {
  "identifier": number,
  "additional_content": AdditionalContentLayout
}

export enum ResultType {
  default = "default",
  non_default = "non-default"
}

export enum ResultFeatureType {
  agg_text = "agg_text",
  frist_text = "frist_text",
  next_step = "next_step"
}

export enum UpdateType {
  add = "add",
  remove = "remove"
}

export enum AdditionalContentType {
  referrals = "referrals",
  templates = "templates",
  materials = "materials"
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
  next_node="next_node",
  icon="icon"
}
export type EdgeDetailsLayout = {
    "status": string,
    "description": string | null,
    "next_node": string | null,
    "icon": string | null
}

export type ReferralLayout = {
  "name": string,
  "phone": string,
  "email": string,
  "website": string
}

export type TemplateLayout = {
  "template": string,
  "help": string
}

export type MaterialLayout = {
  "name": string,
  "link": string
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
