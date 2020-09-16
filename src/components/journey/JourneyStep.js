import React, { useState, useEffect } from 'react';
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
  const [stepAnswers, setStepAnswers] = useState([]);

  const initialiseStepAnswers = (identifier) => {
    if (props.answers.hasOwnProperty(identifier)) {
      let _stepAnswers = props.answers[identifier];
      setStepAnswers(_stepAnswers);
    } else {setStepAnswers([])}
  }

  const updateStepAnswers = (label) => {
    let _stepAnswers = [...stepAnswers];
    if (!(_stepAnswers.includes(label))) {
      _stepAnswers.push(label);
    } else {
      _stepAnswers = _stepAnswers.filter(function(e) {return e !== label})
    }
    setStepAnswers(_stepAnswers)
  }

  const itemFromDocument = (item) => {
    return props.activeDocument[item]
  }

  const optionsFromDocument = () => {
    return Object.keys(props.activeDocument["options"])
  }

  const updateStepButton = (direction) => {
    if (direction === "next") {
      props.increaseStep();
    } else if (direction === "back") {
      props.decreaseStep();
    }
    props.updateAnswers(props.retrieveActiveIdentifier(props.activeStep), stepAnswers);
  }

  const updateStepStepper = (index) => {
    props.setActiveStep(index);
    props.updateAnswers(props.retrieveActiveIdentifier(props.activeStep), stepAnswers);
  }

  useEffect (() => {
    props.updateFinishLine(props.documentQueue.length);
    props.updateActiveDocument(props.activeStep);
    props.updateStepTracker();
    initialiseStepAnswers(props.retrieveActiveIdentifier(props.activeStep))
    },
    [props.activeStep]
  );

  useEffect (() => {
    props.updateStepTracker();
  }, [props.documentQueue])

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