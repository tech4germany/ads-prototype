import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { DocumentQueue } from "components/states/documentQueueState.js";
import { ActiveStep } from "components/states/activeStepState.js";

const useStyles = makeStyles((theme) => ({
  questionBox: {
    minHeight: "10vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "0.8vw"
  },
  question: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "28px"
  },
  explanation: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px"
  }
}));

export default function JourneyQuestion(props) {
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