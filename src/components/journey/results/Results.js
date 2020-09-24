import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import JourneyNavigation from "./../JourneyNavigation.js";
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
      flexDirection: "column",
      alignItems: "center",
      minWidth: "100%",
  },
  resultSpace: {
      backgroundColor: "inherit",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      minWidth: "100%",
      minHeight: "52vh"
  },
  infoTemplateSpace: {
    height: "100%",
    paddingRight: "7vw"
  },
  contactMapSpace: {
    height: "100%"
  }
}));

export default function Result(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let resultSpecs = ResultSpecs.useContainer();
  let resDoc = resultSpecs.retrieveSpecs(answers);

  return (
    <div className={classes.mainSpace}>
      <Grid container className={classes.resultSpace}>
        <Grid item lg={9} md={10} sm={12} xs={12} className={classes.infoTemplateSpace}>
          <ResultsInfo />
          <ResultsTemplates />
        </Grid>

        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.contactMapSpace}>
          <ResultsContact />
          <ResultsMap />
        </Grid>
      </Grid>
      <JourneyNavigation />
  </div>
  );
}