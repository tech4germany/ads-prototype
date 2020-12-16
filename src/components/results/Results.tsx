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
  },
  resultSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoTemplateSpace: {
    maxHeight: "100%",
    maxWidth: "750px",
    marginRight: "30px"
  },
  contactMapSpace: {
    maxHeight: "100%",
    marginTop: "22px"
  },
  contactMapSpacer: {
    height: "22px"
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
      <Grid container className={classes.resultSpace}>

        {
          resultSpecs.self.profile ?
            <div className={classes.infoTemplateSpace}>
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
            </div>: null
        }

        <div className={classes.contactMapSpace}>
          <ResultsContact />
          <div className={classes.contactMapSpacer}></div>
          <ResultsMap />
        </div>

      </Grid>
      <JourneyNavigation />
  </div>
  );
}
