import React from 'react';
import Typography from '@material-ui/core/Typography';

import { DocumentQueue } from "./../states/documentQueueState.js";
import { ActiveStep } from "./../states/activeStepState.js";

export default function JourneyQuestion(props) {
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();
  let activeDocument = documentQueue.active(activeStep.self)

  return (
    <div>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {activeDocument.question}
      </Typography>

      <Typography
        component="h1"
        variant="h6"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {activeDocument.explanation}
      </Typography>
    </div>
);
}