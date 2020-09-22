import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { NextButton, BackButton } from "./JourneyButtons.js"
import Stepper from "./JourneyStepper.js"

import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";
import { Answers } from "./../states/answerState.js";
import { ShowResult } from "./../states/showResultState.js";

const useStyles = makeStyles((theme) => ({
  navigationGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width:"100%",
    paddingLeft: "0.8vw",
    paddingRight: "0.8vw",
  },
  nextBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  backBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  stepperBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }

}));

export default function JourneyNavigation(props) {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()

  return (
    <Grid className={classes.navigationGroup}>
      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.backBox}>
        <BackButton/>
      </Grid>
      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.stepperBox}>
        <Stepper/>
      </Grid>
      <Grid item md={4} sm={4} lg={4} xs={6} className={classes.nextBox}>
        <NextButton/>
      </Grid>
    </Grid>
  );
}