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

const retrieveNonDefaultDocument = (identifier) => {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

const retrieveStepAnswers = (stepAnswers, activeDocument) => {
  let _stepAnswersLinks = stepAnswers.map(function(answer) {
    return activeDocument["options"][answer]
  })
  return _stepAnswersLinks.filter(function(el) { return el != null; })
}

const cleanNonDefaultDocs = (documentQueue, activeStep) => {
  let _cleanQueue = [...documentQueue];
  for (var i=0; i < documentQueue.length; i++) {

    if (
      i > activeStep &&
      documentQueue[i]["type"] === "default"
    ) { break }


    if (!(
      documentQueue[i]["type"] === "default" ||
      (
        documentQueue[i]["type"] === "non-default" &&
        i <= activeStep
      )
    )) {
    _cleanQueue.splice(i, 1);
    }
  }
  return _cleanQueue
}

const insertNewDocs = (newDocumentIdentifiers, documentQueue, activeStep) => {
  let newDocuments = newDocumentIdentifiers.map(function(id) {
    return retrieveNonDefaultDocument(id)
  });
  newDocuments.map(function(obj) {
    let existingIdentifiers = documentQueue.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(obj.identifier))) {
      documentQueue.splice(activeStep+1, 0, obj)
    }
  });
  return documentQueue
}

export default function Journey(props) {
  const classes = useStyles();
  const [finished, setFinished] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [documentQueue, setDocumentQueue] = useState(initialiseDocumentQueue());
  const [stepTracker, setStepTracker] = useState(documentQueue.map(obj => obj.step_title));
  const [activeDocument, setActiveDocument] = useState(documentQueue[activeStep]);
  const [answers, setAnswers] = useState({});

  const updateDocumentQueue = (stepAnswers) => {
    let _documentQueue = [...documentQueue];
    _documentQueue = cleanNonDefaultDocs(_documentQueue, activeStep);
    let newDocumentIdentifiers = retrieveStepAnswers(stepAnswers, activeDocument);
    if (newDocumentIdentifiers.length >= 0) {
      _documentQueue = insertNewDocs(newDocumentIdentifiers, _documentQueue, activeStep);
      setDocumentQueue(_documentQueue);
    }
  }

  const updateStepTracker = () => {
    setStepTracker(documentQueue.map(obj => obj.step_title));
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
    if (activeStep === 5) {
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
          updateDocumentQueue={updateDocumentQueue}
          retrieveActiveIdentifier={retrieveActiveIdentifier}

          activeStep={activeStep}
          setActiveStep={setActiveStep}
          increaseStep={increaseStep}
          decreaseStep={decreaseStep}

          answers={answers}
          updateAnswers={updateAnswers}

          stepTracker={stepTracker}
          updateStepTracker={updateStepTracker}
          />
        :
        <Result
          answers={answers}
        />
      }


    </Grid>
  );
}
