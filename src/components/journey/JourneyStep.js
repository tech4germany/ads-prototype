import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

      <JourneyQuestion />

      <JourneySelection />

      <JourneyNavigation />

      <HorizontalLinearStepper />

    </div>
  );
}