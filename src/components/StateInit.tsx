/*
This file initialises states that need to be accessible throughout the app. This
could of course also be done through passing state hooks back and forth within
individual components. This is however much more tedious to stay on top of, which is
why I resort to using unstated-next.
 */

import React from 'react';
import Main from "./Main";

import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowResult } from "states/showResultState"
import { ResultSpecs } from "states/resultState"

export default function JourneyStateInit() {

  return (
    <Answers.Provider>
    <ActiveStep.Provider>
    <DocumentQueue.Provider>
    <ShowResult.Provider>
    <ResultSpecs.Provider>

      <Main />

    </ResultSpecs.Provider>
    </ShowResult.Provider>
    </DocumentQueue.Provider>
    </ActiveStep.Provider>
    </Answers.Provider>
  );
}
