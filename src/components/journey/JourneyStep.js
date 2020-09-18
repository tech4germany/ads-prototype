import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import JourneyQuestion from "./JourneyQuestion.js";
import JourneySelection from "./JourneySelection.js";
import JourneyNavigation from "./JourneyNavigation.js";
import HorizontalLinearStepper from "./JourneyStepper.js";

import { Answers } from "./../states/answerState.js";

const useStyles = makeStyles((theme) => ({
  stepContent: {
    width: "100%"
  }
}));

export default function JourneyStep(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();

  {/* auxiliary functions */}
  const itemFromDocument = (item) => {
    return props.activeDocument[item]
  }

  const optionsFromDocument = () => {
    return Object.keys(props.activeDocument["options"])
  }

  {/* Action functions */}
  const updateStepButton = (direction) => {
    var change=0;
    if (direction === "next") {
      if (props.checkFinishLine()) {
        return true;
      } else { change = 1; }
    } else if (direction === "back") {
      change = -1;
    }
    props.updateActiveDocument(props.activeStep+change);
    initialiseStepAnswers(props.retrieveActiveIdentifier(props.activeStep+change))
    props.updateStep(change);
  }

  const updateStepStepper = (index) => {
    answers.update(itemFromDocument("identifier"), stepAnswers);
    props.setActiveStep(index);
    props.updateActiveDocument(index);
    initialiseStepAnswers(props.retrieveActiveIdentifier(index))
  }

  return (

    <div className={classes.stepContent}>

      <JourneyQuestion
        question={itemFromDocument("question")}
        explanation={itemFromDocument("explanation")}
      />

      <JourneySelection
        options={optionsFromDocument()}
        stepAnswers={stepAnswers}
        updateStepAnswers={updateStepAnswers}
        addDocumentQueue={props.addDocumentQueue}
        removeDocumentQueue={props.removeDocumentQueue}
      />

      <JourneyNavigation
        activeStep={props.activeStep}
        updateStep={updateStepButton}
      />

      <HorizontalLinearStepper
        activeStep={props.activeStep}
        updateStep={updateStepStepper}
        steps={props.stepTracker}
      />

    </div>
  );
}