import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ResultsInfo from "./ResultsInfo.js";
import ResultsContact from "./ResultsContact.js";
import ResultsMap from "./ResultsMap.js";
import ResultsTemplates from "./ResultsTemplates.js";

import ControlledAccordions from "./ResultsInfobox.js";
import { Answers } from "./../../states/answerState.js";
import { ResultSpecs } from "./../../states/resultState.js";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: "inherit",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      minWidth: "100%",
      height: "100%"
  },
}));

export default function Result(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let resultSpecs = ResultSpecs.useContainer();
  let resDoc = resultSpecs.retrieveSpecs(answers);

  return (

    <Grid container className={classes.mainSpace}>

      <Grid item lg={8} md={8} sm={12} xs={12}>
        <ResultsInfo />
        <ResultsTemplates />
      </Grid>

      <Grid item lg={4} md={4} sm={12} xs={12}>
        <ResultsContact />
        <ResultsMap />
      </Grid>
    </Grid>
  );
}