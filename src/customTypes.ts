export type OrNull<T> = T | null;
export type OrUndefined<T> = T | undefined;

export type ActiveStepLayout = number;

export type AnswersLayout = {
  [key: string]: Array<string>;
};

export type StepDocumentLayout = {
  "identifier":string,
  "type":string,
  "multiple_choice": boolean,
  "step_title": string,
  "question": string,
  "explanation": string,
  "options": Array<string>
}
export type DocumentQueueLayout = Array<StepDocumentLayout>;

export type FeatureNode = {
  [key: string]: string;
};

export type FeatureMapLayout = {
  [key: string]: FeatureNode
};

export type AnswersProfileLayout = {
  [key: string]: string;
};

export type SpecsLayout = {
  "agg": boolean,
  "frist": boolean
};

export type ResultSpecsLayout = {
  "identifier": number,
  "profile": OrNull<SpecsLayout>
};
