import React from 'react';
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
import { retrieveResultType } from "data/ResultMatcher"

import { Answers } from "states/answerState"

const useStyles = makeStyles((theme) => ({
  resultBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  resultSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%"
  },
  infoTemplateSpace: {
    maxHeight: "100%",
    maxWidth: "750px",
    marginRight: "30px",
    width: "100%"
  },
  contactMapSpace: {
    maxHeight: "100%",
    marginTop: "22px",
  },
  contactMapSpacer: {
    height: "22px"
  }
}));

export default function Result() {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let result_match = retrieveResultType(answers.self.answers);

  return (
    <div className={classes.resultBox} id="result-page" aria-live="polite">
      <Grid container className={classes.resultSpace}>

            <div className={classes.infoTemplateSpace}>
              <ResultsInfo result={result_match} />
              {
                getResultReferrals(result_match.non_default_identifier).length>0?
                <ResultsReferrals result={result_match}/>: null
              }
              {
                getResultTemplates(result_match.non_default_identifier).length>0?
                <ResultsTemplates result={result_match}/>: null
              }
              {
                getResultMaterials(result_match.non_default_identifier).length>0?
                <ResultsMaterials result={result_match}/>: null
              }
            </div>

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
