import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

import { DocumentQueue } from "./../states/documentQueueState.js";
import { ActiveStep } from "./../states/activeStepState.js";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 32px)',
    right: 'calc(50% + 32px)',
  },
  active: {
    '& $line': {
      borderColor: '#ffecb3',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#ffecb3',
    },
  },
  line: {
    borderColor: '#ffe57f',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#ffecb3',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: "#f3b500",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#ffd740',
    zIndex: 1,
    fontSize: 46,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fef3df",
    width: '100%',
  },
}));

export default function CustomizedStepper() {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let steps = documentQueue.steps()
  let activeDefaultStep = documentQueue.countDefaultSteps(activeStep.self);

  return (
      <Stepper alternativeLabel activeStep={activeDefaultStep} connector={<QontoConnector />} className={classes.root}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}