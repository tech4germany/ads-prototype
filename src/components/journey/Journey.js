import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import JourneyStep from "./JourneyStep.js";
import Result from "./results/Results.js";

import decision_tree from "./documents/decisiontree.json";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
  },
}));

const initialiseDocumentQueue = () => {
  return decision_tree.filter(function (element) {
    return element.type === "default"
  })
}

const retrieveDefaultStepTitles = (docQueue) => {
  return docQueue
  .filter(function(e) {return e.type === "default"})
  .map(obj => obj.step_title)
}

export default function Journey(props) {
  const classes = useStyles();
  const [finished, setFinished] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [documentQueue, setDocumentQueue] = useState(initialiseDocumentQueue());
  const [stepTracker, setStepTracker] = useState(retrieveDefaultStepTitles(documentQueue));
  const [activeDocument, setActiveDocument] = useState(documentQueue[activeStep]);
  const [answers, setAnswers] = useState({});

  const updateDocumentQueue = () => {
    let _documentQueue = [...documentQueue];


  }

  const updateActiveDocument = (activeStep) => {
    setActiveDocument(documentQueue[activeStep]);
  }

  const retrieveActiveIdentifier = (activeStep) => {
    return documentQueue[activeStep]["identifier"]
  }

  const updateAnswers = (step, stepAnswers) => {
    let _answers = {...answers};
    _answers[step] = stepAnswers;
    setAnswers(_answers);
  }

  const increaseStep = () => {
    if (activeStep === 3) {
      setFinished(1);
    }
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const decreaseStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid container className={classes.mainSpace}>

      {
        !finished ?
          <JourneyStep
          activeDocument={activeDocument}
          updateActiveDocument={updateActiveDocument}
          retrieveActiveIdentifier={retrieveActiveIdentifier}

          activeStep={activeStep}
          setActiveStep={setActiveStep}
          increaseStep={increaseStep}
          decreaseStep={decreaseStep}

          answers={answers}
          updateAnswers={updateAnswers}

          stepTracker={stepTracker}
          />
        :
        <Result
          answers={answers}
        />
      }


    </Grid>
  );
}
