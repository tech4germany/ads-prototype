import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={props.activeStep} alternativeLabel>
        {props.steps.map((label, index) => {
          return (
            <Step
             key={label} >
              <StepLabel onClick={() => { props.updateStep(index) }}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}