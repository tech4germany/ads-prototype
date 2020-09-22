import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { DocumentQueue } from "./../states/documentQueueState.js";
import { ActiveStep } from "./../states/activeStepState.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    backgroundColor: "inherit",
    color: "rgba(240, 172, 50, 0.4)",
    padding: theme.spacing(0,0,0,0)
  }
}));

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let steps = documentQueue.steps()
  let activeDefaultStep = documentQueue.countDefaultSteps(activeStep.self);

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={activeDefaultStep}
        alternativeLabel
      >
        {steps.map((label, index) => {
          return (
            <Step
             key={label} >
              <StepLabel onClick={() => { activeStep.jumpTo(index) }}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}