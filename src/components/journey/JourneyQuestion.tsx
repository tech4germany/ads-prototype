import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StepDetail } from "data/customTypes"

import { DocumentQueue } from "states/documentQueueState"
import { ActiveStep } from "states/activeStepState"

const useStyles = makeStyles((theme) => ({
  questionBox: {
    minHeight: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "12px",
    paddingRight: "22px"
  },
  questionContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "6px"
  },
  questionText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "28px",
    margin: "0px",
    fontWeight: "normal"
  },
  explanationContainer: {
    display: "flex",
    flexWrap: "wrap",
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
