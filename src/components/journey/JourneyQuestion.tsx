import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { questionHeader, questionExplanation } from "components/styleguide"
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
    fontSize: "28px"
  },
  explanationContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "1.5vh"
  },
  explanationText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    lineHeight: 1.15,
    whiteSpace: "pre-wrap",
  }
}));

export default function JourneyQuestion() {
  const classes = useStyles()
  let documentQueue = DocumentQueue.useContainer()
  let activeStep = ActiveStep.useContainer()

  return (
    <div className={classes.questionBox}>
      <div className={classes.questionContainer}>
        <span className={classes.questionText}>
          {documentQueue.getStepDetail(activeStep.self, StepDetail.question)}
        </span>
      </div>
      <div className={classes.explanationContainer}>
        <span className={classes.explanationText}>
          {documentQueue.getStepDetail(activeStep.self, StepDetail.explanation)}
        </span>
      </div>
    </div>
);
}
