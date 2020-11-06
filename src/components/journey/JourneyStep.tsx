import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JourneyQuestion from "components/journey/JourneyQuestion";
import JourneySelection from "components/journey/JourneySelection";
import JourneyNavigation from "components/journey/JourneyNavigation";
import { StepDetail } from "data/customTypes"

import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { Answers } from "states/answerState"
import { ShowResult } from "states/showResultState"

const useStyles = makeStyles((theme) => ({
  stepContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    width: "100%",
  },
}));

export default function JourneyStep() {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let answers = Answers.useContainer();
  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)
  let showResult = ShowResult.useContainer();

  useEffect(() => {
    answers.prune(activeDocument.identifier)
  })

  useEffect(() => {
    documentQueue.validateFristQuestion(answers.isAgg())
  }, [answers])

  return (
      <div className={classes.stepContent}>

        <JourneyQuestion />

        <JourneySelection />

        <JourneyNavigation />

      </div>
  );
}
