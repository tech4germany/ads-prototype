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
    padding: theme.spacing(4,0,0,0)
  },
}));

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();

  let steps = documentQueue.steps()

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep.self} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step
             key={label} >
              <StepLabel onClick={() => { activeStep.jumpTo(index) }}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}