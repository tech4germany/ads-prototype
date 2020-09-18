import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Journey from "./Journey.js";

import { Answers } from "./../states/answerState.js";
import { ActiveStep } from "./../states/activeStepState.js";

export default function JourneyStateInit(props) {

  return (
    <Answers.Provider>
    <ActiveStep.Provider>

      <Journey/>

    </ActiveStep.Provider>
    </Answers.Provider>
  );
}
