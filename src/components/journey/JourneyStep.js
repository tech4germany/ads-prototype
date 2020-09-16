import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import JourneyQuestion from "./JourneyQuestion.js";
import JourneySelection from "./JourneySelection.js";
import JourneyNavigation from "./JourneyNavigation.js";
import HorizontalLinearStepper from "./JourneyStepper.js";

const useStyles = makeStyles((theme) => ({
  stepContent: {
    width: "100%"
  }
}));

export default function JourneyStep(props) {
  const classes = useStyles();
  const [stepAnswers, setStepAnswers] = useState([]);

  const initialiseStepAnswers = (identifier) => {
    if (props.answers.hasOwnProperty(identifier)) {
      let _stepAnswers = props.answers[identifier];
      setStepAnswers(_stepAnswers);
    } else {setStepAnswers([])}
  }

  const itemFromDocument = (item) => {
    return props.activeDocument[item]
  }

  const optionsFromDocument = () => {
    return Object.keys(props.activeDocument["options"])
  }
  optionsFromDocument();

  const updateStepAnswers = (label) => {
    let _stepAnswers = [...stepAnswers];
    if (!(_stepAnswers.includes(label))) {
      _stepAnswers.push(label);
    } else {
      _stepAnswers = _stepAnswers.filter(function(e) {return e !== label})
    }
    setStepAnswers(_stepAnswers)
  }

  const updateStepButton = (direction) => {
    if (direction === "next") {
      props.increaseStep();
    } else if (direction === "back") {
      props.decreaseStep();
    }
    props.updateDocumentQueue(stepAnswers);
    props.updateAnswers(props.retrieveActiveIdentifier(props.activeStep), stepAnswers);
  }

  const updateStepStepper = (index) => {
    props.setActiveStep(index);
    props.updateDocumentQueue(stepAnswers);
    props.updateAnswers(props.retrieveActiveIdentifier(props.activeStep), stepAnswers);
  }

  useEffect (() => {
    props.updateActiveDocument(props.activeStep);
    props.updateStepTracker();
    initialiseStepAnswers(props.retrieveActiveIdentifier(props.activeStep))
    },
    [props.activeStep]
  );

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