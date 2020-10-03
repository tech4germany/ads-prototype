export type OrNull<T> = T | null;
export type OrUndefined<T> = T | undefined;

export type ActiveStepLayout = number;

export interface AnswersLayout {
  [key: string]: Array<string>;
}

export interface StepDocumentLayout {
  "identifier":string,
  "type":string,
  "multiple_choice": boolean,
  "step_title": string,
  "question": string,
  "explanation": string,
  "options": Array<string>
}
export type DocumentQueueLayout = Array<StepDocumentLayout>

export interface FeatureNode {
  [key: string]: string;
}

export interface FeatureMapLayout {
  [key: string]: FeatureNode
}

export interface AnswersProfileLayout {
  [key: string]: string;
}

export interface SpecsLayout {
  "agg": boolean,
  "frist": boolean
}

export interface ResultSpecsLayout {
  "identifier": number,
  "profile": OrNull<SpecsLayout>
}
