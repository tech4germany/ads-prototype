import React from 'react';

import Journey from "./Journey";

import { Answers } from "components/states/answerState";
import { ActiveStep } from "components/states/activeStepState.js";
import { DocumentQueue } from "components/states/documentQueueState.js";
import { ShowResult } from "components/states/showResultState.js";
import { ResultSpecs } from "components/states/resultState.js";

export default function JourneyStateInit() {

  return (
    <Answers.Provider>
    <ActiveStep.Provider>
    <DocumentQueue.Provider>
    <ShowResult.Provider>
    <ResultSpecs.Provider>

      <Journey/>

    </ResultSpecs.Provider>
    </ShowResult.Provider>
    </DocumentQueue.Provider>
    </ActiveStep.Provider>
    </Answers.Provider>
  );
}
