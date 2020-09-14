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

  useEffect (() => {
    if (props.answers.hasOwnProperty(props.identifier)) {
      let _stepAnswers = props.answers[props.identifier];
      setStepAnswers(_stepAnswers);
    }},
    [props.activeStep]
  );

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
    props.updateAnswers(props.identifier, stepAnswers);
    setStepAnswers([]);
  }

  const updateStepStepper = (index) => {
    props.setActiveStep(index);
    props.updateAnswers(props.identifier, stepAnswers);
    setStepAnswers([]);
  }

  return (

    <div className={classes.stepContent}>

      <JourneyQuestion
       question={props.documentQueue[props.activeStep]}
       explanation={props.documentQueue[props.activeStep]}
       />

      <JourneySelection
        options={props.documentQueue[props.activeStep]}
        stepAnswers={stepAnswers}
        updateStepAnswers={updateStepAnswers}
      />

      <JourneyNavigation
       activeStep={props.activeStep}
       handleReset={props.handleReset}
       updateStep={updateStepButton}
      />

      <HorizontalLinearStepper
        activeStep={props.activeStep}
        updateStep={updateStepStepper}
        steps={props.documentQueue}
      />

    </div>
  );
}