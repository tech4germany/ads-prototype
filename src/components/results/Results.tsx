import React, { useLayoutEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import JourneyNavigation from "components/journey/JourneyNavigation"
import ResultsInfo from "components/results/ResultsInfo"
import ResultsContact from "components/results/ResultsContact"
import ResultsMap from "components/results/ResultsMap"
import ResultsTemplates from "components/results/ResultsTemplates"
import ResultsReferrals from "components/results/ResultsReferral"
import ResultsMaterials from "components/results/ResultsMaterials"
import { getResultReferrals, getResultTemplates, getResultMaterials } from "data/Interface"

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
      minHeight: "59vh"
  },
  infoTemplateSpace: {
    maxHeight: "100%",
    maxWidth: "750px",
    marginRight: "30px"
  },
  contactMapSpace: {
    maxHeight: "100%"
  }
}));

export default function Result() {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let resultSpecs = ResultSpecs.useContainer();

  useLayoutEffect(() => {
    resultSpecs.retrieveResultType(answers.self);
  }, [answers])

  return (
    <div className={classes.mainSpace}>
      <Grid container className={classes.resultSpace}>

        {
          resultSpecs.self.profile ?
            <Grid item lg={9} md={10} sm={12} xs={12} className={classes.infoTemplateSpace}>
              <ResultsInfo />
              {
                getResultReferrals(resultSpecs.self.non_default_identifier).length>0?
                <ResultsReferrals />:
                <></>
              }
              {
                getResultTemplates(resultSpecs.self.non_default_identifier).length>0?
                <ResultsTemplates />:
                <></>
              }
              {
                getResultMaterials(resultSpecs.self.non_default_identifier).length>0?
                <ResultsMaterials />:
                <></>
              }

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
