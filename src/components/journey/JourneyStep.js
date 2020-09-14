import React from 'react';
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

  return (

    <div className={classes.stepContent}>

      <JourneyQuestion

       question={props.questions[props.activeStep]}
       explanation={props.explanations[props.activeStep]}

       />

      <JourneySelection

        options={props.options[props.activeStep]}

      />

      <JourneyNavigation

       activeStep={props.activeStep}
       handleReset={props.handleReset}
       handleNext={props.handleNext}
       handleBack={props.handleBack}

      />

      <HorizontalLinearStepper

        activeStep={props.activeStep}
        setActiveStep={props.setActiveStep}
        steps={props.steps}

      />

    </div>
  );
}