import React, { useLayoutEffect } from 'react';
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
  resultBox: {
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
    <div className={classes.resultBox}>
      <div className={classes.resultSpace}>

        {
          resultSpecs.self.profile ?
            <Grid item lg={9} md={10} sm={12} xs={12} className={classes.infoTemplateSpace}>
              <ResultsInfo />
              {
                getResultReferrals(resultSpecs.self.non_default_identifier).length>0?
                <ResultsReferrals />: null
              }
              {
                getResultTemplates(resultSpecs.self.non_default_identifier).length>0?
                <ResultsTemplates />: null
              }
              {
                getResultMaterials(resultSpecs.self.non_default_identifier).length>0?
                <ResultsMaterials />: null
              }
            </Grid>: null
        }

        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.contactMapSpace}>
          <ResultsContact />
          <ResultsMap />
        </Grid>

      </div>
      <JourneyNavigation />
  </div>
  );
}
