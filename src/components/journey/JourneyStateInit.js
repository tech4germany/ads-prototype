import React from 'react';

import Journey from "./Journey.js";

import { Answers } from "./../states/answerState.js";
import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";

export default function JourneyStateInit(props) {

  return (
    <Answers.Provider>
    <ActiveStep.Provider>
    <DocumentQueue.Provider>

      <Journey/>

    </DocumentQueue.Provider>
    </ActiveStep.Provider>
    </Answers.Provider>
  );
}
