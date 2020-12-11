import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StepDetail } from "data/customTypes"

import { DocumentQueue } from "states/documentQueueState"
import { ActiveStep } from "states/activeStepState"

const useStyles = makeStyles((theme) => ({
  questionBox: {
    minHeight: "15vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  questionContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "1.5vh"
  },
  questionText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "28px",
    margin: "0px"
  },
  explanationContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "1.5vh"
  },
  explanationText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    lineHeight: "28px",
    whiteSpace: "pre-wrap",
    margin: "0px"
  }
}));

export default function JourneyQuestion() {
  const classes = useStyles()
  let documentQueue = DocumentQueue.useContainer()
  let activeStep = ActiveStep.useContainer()

  return (
    <div className={classes.questionBox}>
      <div className={classes.questionContainer}>
        <h1 className={classes.questionText}>
          {documentQueue.getStepDetail(activeStep.self, StepDetail.question)}
        </h1>
      </div>
      <div className={classes.explanationContainer}>
        <p className={classes.explanationText}>
          {documentQueue.getStepDetail(activeStep.self, StepDetail.explanation)}
        </p>
      </div>
    </div>
);
}
