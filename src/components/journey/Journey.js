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

function initialiseDocumentQueue() {
  return decision_tree.filter(function (element) {
    return element.type === "default"
  })
}

function getIdentifiers() {
  return ["merkmal", "lebensbereich", "detail1", "detail2"];
}

function getSteps() {
  return ['Merkmal', 'Lebensbereich', 'Detail 1', "Detail 2"];
}

function getQuestions() {
  return [
    'Welches Merkmal betraf die Diskriminierung?',
    'Welcher Lebensraum war betroffen?',
    'Detail 1?',
    "Detail 2?"];
}

function getOptions() {
  return [
    ["Geschlecht","Alter","Ethnische Herkunft","Behinderung"],
    ["Arbeit","Schule","Behörde/Ämter","Sportverein"],
    ["Q3_Option_1","Q3_Option_2","Q3_Option_3","Q3_Option_4"],
    ["Q4_Option_1","Q4_Option_2","Q4_Option_3","Q4_Option_4"]
  ];
}

function getExplanations() {
  return ['Explanation 1', 'Explanation 2', 'Explanation 3', "Explanation 4"];
}

const placeholde_options = [1,2,3];

export default function Journey(props) {
  const classes = useStyles();
  const [finished, setFinished] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [documentQueue, setDocumentQueue] = useState([]);
  const [answers, setAnswers] = useState({});
  const steps = getSteps();
  const identifiers = getIdentifiers();
  const questions = getQuestions();
  const explanations = getExplanations();
  const options = getOptions();
  const identifier = identifiers[activeStep];

  useEffect(() => {
    setDocumentQueue(initialiseDocumentQueue)
  },
  []
  );

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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container className={classes.mainSpace}>

      {
        !finished ?
          <JourneyStep
          identifier={identifier}
          documentQueue={documentQueue}

          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleReset={handleReset}
          increaseStep={increaseStep}
          decreaseStep={decreaseStep}

          answers={answers}
          updateAnswers={updateAnswers}
          />
        :
        <Result
          answers={answers}
        />
      }


    </Grid>
  );
}
