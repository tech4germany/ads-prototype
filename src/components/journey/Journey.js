import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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

const retrieveStepAnswers = (label, activeDocument) => {
  return activeDocument["options"][label]
}

const insertNewDoc = (newDocumentIdentifier, documentQueue, activeStep) => {
  let existingIdentifiers = documentQueue.map(obj => obj.identifier);
  if (!(existingIdentifiers.includes(newDocumentIdentifier.identifier))) {
    let newDocument = retrieveNonDefaultDocument(newDocumentIdentifier);
    documentQueue.splice(activeStep+1, 0, newDocument);
    }
  return documentQueue
}

const removeNewDoc = (newDocumentIdentifier, documentQueue) => {
  return documentQueue.filter(function (el) {
    return el.identifier !== newDocumentIdentifier
  })
}

export default function Journey(props) {
  const classes = useStyles();
  const [finished, setFinished] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [documentQueue, setDocumentQueue] = useState(initialiseDocumentQueue());
  const [stepTracker, setStepTracker] = useState(documentQueue.map(obj => obj.step_title));
  const [activeDocument, setActiveDocument] = useState(documentQueue[activeStep]);
  const [answers, setAnswers] = useState({});

  {/* auxiliary functions */}
  const retrieveActiveIdentifier = (activeStep) => {
    return documentQueue[activeStep]["identifier"]
  }

  const addDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveStepAnswers(label, activeDocument);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = insertNewDoc(newDocumentIdentifier, _documentQueue, activeStep);
      setDocumentQueue(_documentQueue);
      updateStepTracker(_documentQueue);
    }
  }

  {/* state update functions */}
  const removeDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveStepAnswers(label, activeDocument);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = removeNewDoc(newDocumentIdentifier, _documentQueue);
      setDocumentQueue(_documentQueue);
      updateStepTracker(_documentQueue);
    }
  }

  const updateStepTracker = (_documentQueue) => {
    setStepTracker(_documentQueue.map(obj => obj.step_title));
  }

  const updateActiveDocument = (activeStep) => {
    setActiveDocument(documentQueue[activeStep]);
  }

  const updateAnswers = (step, stepAnswers) => {
    let _answers = {...answers};
    _answers[step] = stepAnswers;
    setAnswers(_answers);
  }

  const updateStep = (change) => {
    switch(change) {
      case 1:
        if (activeStep+2 > documentQueue.length) {
          setFinished(1);
        }
        console.log("here we go")
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case -1:
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        break;
    }
  };

  const updateFinishLine = (length) => {
    if (activeStep > length) {
      setFinished(1);
    }
  }

  return (
    <Grid container className={classes.mainSpace}>

      {
        !finished ?
          <JourneyStep
          activeDocument={activeDocument}
          updateActiveDocument={updateActiveDocument}

          documentQueue={documentQueue}
          addDocumentQueue={addDocumentQueue}
          removeDocumentQueue={removeDocumentQueue}

          retrieveActiveIdentifier={retrieveActiveIdentifier}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          updateStep={updateStep}

          answers={answers}
          updateAnswers={updateAnswers}

          stepTracker={stepTracker}
          updateStepTracker={updateStepTracker}

          updateFinishLine={updateFinishLine}
          />
        :
        <Result
          answers={answers}
        />
      }


    </Grid>
  );
}
