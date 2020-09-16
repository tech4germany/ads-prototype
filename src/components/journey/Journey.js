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

  const addDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    _documentQueue = cleanNonDefaultDocs(_documentQueue, activeStep);
    let newDocumentIdentifier = retrieveStepAnswers(label, activeDocument);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = insertNewDoc(newDocumentIdentifier, _documentQueue, activeStep);
      setDocumentQueue(_documentQueue);
    }
  }

  const removeDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveStepAnswers(label, activeDocument);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = removeNewDoc(newDocumentIdentifier, _documentQueue);
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
    if (activeStep+2 > documentQueue.length) {
      setFinished(1);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const decreaseStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          addDocumentQueue={addDocumentQueue}
          removeDocumentQueue={removeDocumentQueue}
          retrieveActiveIdentifier={retrieveActiveIdentifier}
          documentQueue={documentQueue}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          increaseStep={increaseStep}
          decreaseStep={decreaseStep}

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
