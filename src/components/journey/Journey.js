import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import JourneyStep from "./JourneyStep.js";

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


function getSteps() {
  return ['Select campaign', 'Create an ad group', 'Create an ad', "Result page"];
}

function getQuestions() {
  return ['Question 1?', 'Question 2?', 'Question 3?', "Question 4?"];
}

function getOptions() {
  return [
    ["Q1_Option_1","Q1_Option_2","Q1_Option_3","Q1_Option_4"],
    ["Q2_Option_1","Q2_Option_2","Q2_Option_3","Q2_Option_4"],
    ["Q3_Option_1","Q3_Option_2","Q3_Option_3","Q3_Option_4"],
    ["Q4_Option_1","Q4_Option_2","Q4_Option_3","Q4_Option_4"]
  ];
}

function getExplanations() {
  return ['Explanation 1', 'Explanation 2', 'Explanation 3', "Explanation 4"];
}

const placeholde_options = [1,2,3];

export default function Journey() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const questions = getQuestions();
  const explanations = getExplanations();
  const options = getOptions();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container className={classes.mainSpace}>

      <JourneyStep

      steps={steps}
      questions={questions}
      explanations={explanations}
      options={options}

      activeStep={activeStep}
      setActiveStep={setActiveStep}
      handleReset={handleReset}
      handleNext={handleNext}
      handleBack={handleBack}
      />

    </Grid>
  );
}
