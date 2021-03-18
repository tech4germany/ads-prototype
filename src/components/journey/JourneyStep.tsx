/*
This component is the main container for each step in the wegweiser. Before
rendering is conducts two checks.

1. it first clears the answer dictionary to reflect that at the current a new answer
needs to be provided. This becomes relevant when we move backwards after previously
having given an answer at this stage.

2. it checks if - now that the previous answer has been deleted - the set of answers
qualifies for AGG support. In that case it re-inserts the frist question into the
visible document queue.

 */
import React, { useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JourneyQuestion from "components/journey/JourneyQuestion";
import JourneySelection from "components/journey/JourneySelection";
import JourneyNavigation from "components/journey/JourneyNavigation";
import { ShowInfo } from "states/showInfoState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { Answers } from "states/answerState"

const useStyles = makeStyles((theme) => ({
  stepBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%"
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
  }
}));

export default function JourneyStep() {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let answers = Answers.useContainer();
  let infoDisplay = ShowInfo.useContainer()
  let activeDocument = documentQueue.self[activeStep.self]

  return (
      <div className={classes.stepBox}>
        <div className={classes.stepContent}>
          <JourneyQuestion />
          <JourneySelection />
        </div>
        {
          infoDisplay.lastIsSet()?
          null:
          <JourneyNavigation />
        }


      </div>
  );
}
