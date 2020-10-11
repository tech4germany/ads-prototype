import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import JourneyNavigation from "components/journey/JourneyNavigation"
import ResultsInfo from "components/results/ResultsInfo"
import ResultsContact from "components/results/ResultsContact"
import ResultsMap from "components/results/ResultsMap"
import ResultsTemplates from "components/results/ResultsTemplates"

import { Answers } from "states/answerState"
import { ResultSpecs } from "states/resultState"

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: "inherit",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
  },
  resultSpace: {
      backgroundColor: "inherit",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      minWidth: "100%",
      minHeight: "59vh"
  },
  infoTemplateSpace: {
    maxHeight: "100%",
    paddingRight: "7vw"
  },
  contactMapSpace: {
    maxHeight: "100%"
  }
}));

export default function Result() {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let resultSpecs = ResultSpecs.useContainer();

  useEffect(() => {
    resultSpecs.retrieveSpecs(answers.self);
  }, [])

  return (
    <div className={classes.mainSpace}>
      <Grid container className={classes.resultSpace}>

        {
          resultSpecs.isSet() ?
            <Grid item lg={9} md={10} sm={12} xs={12} className={classes.infoTemplateSpace}>
              <ResultsInfo />
              <ResultsTemplates />
            </Grid>
          :
            <Grid item lg={9} md={10} sm={12} xs={12} className={classes.infoTemplateSpace}>
              Loading ...
            </Grid>
        }

        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.contactMapSpace}>
          <ResultsContact />
          <ResultsMap />
        </Grid>
      </Grid>
      <JourneyNavigation />
  </div>
  );
}
