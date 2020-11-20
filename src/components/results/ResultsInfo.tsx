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
    maxWidth: "750px",
  },
  header: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "40px",
    lineHeight: "32px",
    marginBottom: "50px",
  },
  subHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    marginBottom: "32px",
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    marginBottom: "50px"
  }
}));

export default function ResultInfo() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let answers = Answers.useContainer();

  return (
    <div className={classes.infoSpace}>

      <span className={classes.header}>Die Ersteinschätzung Ihres Sachverhalts</span>
      <span className={classes.subHeader}>Rechtliche Einordnung:</span>

      <span className={classes.infoText}>
        Sie sehen sich aufgrund des Merkmals <b>{answers.getAnswerByKey("merkmal", 0)}
        </b> im Lebensbereich <b>{answers.getAnswerByKey("lebensbereich", 0)}</b> diskriminiert.&nbsp;
        {getResultFeature(resultSpecs.self.identifier, ResultFeatureType.agg_text)}
        {getResultFeature(resultSpecs.self.identifier, ResultFeatureType.frist_text)}
      </span>
      <span className={classes.subHeader}>Nächste Schritte:</span>
      <span className={classes.infoText}>
        {getResultFeature(resultSpecs.self.identifier, ResultFeatureType.next_step)}
      </span>
    </div>
  );
}
