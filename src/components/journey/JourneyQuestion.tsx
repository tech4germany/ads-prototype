import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { DocumentQueue } from "components/states/documentQueueState"
import { ActiveStep } from "components/states/activeStepState"

const useStyles = makeStyles((theme) => ({
  questionBox: {
    minHeight: "10vh",
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
    fontSize: "3.5vh"
  },
  explanation: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "2.7vh"
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
