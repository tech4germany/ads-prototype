import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import decision_tree from "./documents/decisiontree_v2.json";

import Journey from "./Journey.js";

import { Answers } from "./../states/answerState.js";
import { ActiveStep } from "./../states/activeStepState.js";
import { ActiveDocument } from "./../states/activeDocumentState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";

export default function JourneyStateInit(props) {

  return (
    <Answers.Provider>
    <ActiveStep.Provider>
    <ActiveDocument.Provider>
    <DocumentQueue.Provider>

      <Journey/>

    </DocumentQueue.Provider>
    </ActiveDocument.Provider>
    </ActiveStep.Provider>
    </Answers.Provider>
  );
}
