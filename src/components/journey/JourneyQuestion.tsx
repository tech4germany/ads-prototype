import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { DocumentQueue } from "states/documentQueueState"
import { ActiveStep } from "states/activeStepState"

const useStyles = makeStyles((theme) => ({
  questionBox: {
    minHeight: "12vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "0.8vw",
    marginBottom: "2vh"
  },
  question: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "4vh"
  },
  explanation: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "2vh",
    whiteSpace: "pre-wrap"
  }
}));

export default function JourneyQuestion() {
  const classes = useStyles()
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();
  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)

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
