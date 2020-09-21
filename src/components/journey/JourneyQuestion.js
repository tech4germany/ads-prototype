import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { DocumentQueue } from "./../states/documentQueueState.js";
import { ActiveStep } from "./../states/activeStepState.js";

const useStyles = makeStyles((theme) => ({
  questionBox: {
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  question: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "28px"
  },
  explanation: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px"
  }
}));

export default function JourneyQuestion(props) {
  const classes = useStyles()
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();
  let activeDocument = documentQueue.active(activeStep.self)

  return (
    <div className={classes.questionBox}>
      <div className={classes.question}>
        {activeDocument.question}
      </div>
      <div className={classes.explanation}>
        {activeDocument.explanation}
      </div>
    </div>
);
}