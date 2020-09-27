import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import JourneyNavigation from "components/journey/JourneyNavigation.js";
import ResultsInfo from "components/results/ResultsInfo.js";
import ResultsContact from "components/results/ResultsContact.js";
import ResultsMap from "components/results/ResultsMap.js";
import ResultsTemplates from "components/results/ResultsTemplates.js";

import ControlledAccordions from "components/results/ResultsInfobox.js";
import { Answers } from "components/states/answerState.js";
import { ResultSpecs } from "components/states/resultState.js";

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
  resultSpecs.retrieveSpecs(answers);
  console.log(answers.self)

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