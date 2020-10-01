import React from 'react';

import Journey from "./Journey";

import { Answers } from "components/states/answerState"
import { ActiveStep } from "components/states/activeStepState"
import { DocumentQueue } from "components/states/documentQueueState"
import { ShowResult } from "components/states/showResultState"
import { ResultSpecs } from "components/states/resultState"

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
