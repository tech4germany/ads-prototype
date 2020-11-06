import React, { useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { Answers } from "states/answerState"
import { getResultFeature } from "data/Interface"
import { ResultFeatureType } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  infoSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    paddingBottom: "2.3vh",
  },
  header: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "28px",
    paddingBottom: "2.3vh",
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    paddingBottom: "2.3vh"
  },
  nextStepsHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    paddingBottom: "1vh"
  },
  nextStepsText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    whiteSpace: "pre-wrap"
    }
}));

export default function ResultInfo() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let answers = Answers.useContainer();
  console.log(resultSpecs.self)

  return (
    <div className={classes.infoSpace}>
      <div className={classes.header}>
        Die Ersteinschätzung Ihres Sachverhalts
      </div>
      <div className={classes.infoText}>
        Sie sehen sich aufgrund des Merkmals <b>{answers.getAnswerByKey("merkmal", 0)}</b> im Lebensbereich <b>{answers.getAnswerByKey("lebensbereich", 0)}</b> diskriminiert.
        <br></br>
        {getResultFeature(resultSpecs.self.identifier, ResultFeatureType.agg_text)}
        {getResultFeature(resultSpecs.self.identifier, ResultFeatureType.frist_text)}
      </div>
      <div className={classes.nextStepsHeader}>
        Nächste Schritte:
      </div>
      <div className={classes.nextStepsText}>
        {getResultFeature(resultSpecs.self.identifier, ResultFeatureType.next_step)}
      </div>
    </div>
  );
}
