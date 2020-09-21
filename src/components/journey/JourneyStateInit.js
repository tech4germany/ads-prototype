import React from 'react';

import Journey from "./Journey.js";

import { Answers } from "./../states/answerState.js";
import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";
import { ShowResult } from "./../states/showResultState.js";
import { ResultSpecs } from "./../states/resultState.js";

export default function JourneyStateInit(props) {

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