import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { Answers } from "states/answerState"
import { getResultFeature, getResultAdditionalText } from "data/Interface"
import { ResultFeatureType } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  infoBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "750px",
  },
  headerContainer: {
    marginBottom: "50px",
  },
  headerText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "40px",
    lineHeight: "48px",
    margin: "0px"
  },
  subHeaderContainer: {
    marginBottom: "32px",
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    margin: "0px"
  },
  infoTextContainer: {
    marginBottom: "18px"
  },
  infoTextContainerMargin: {
    marginBottom: "50px"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    whiteSpace: "pre-wrap"
  }
}));

export default function ResultInfo() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let answers = Answers.useContainer();

  return (
    <div className={classes.infoBox}>

      <div className={classes.headerContainer}>
        <h1 className={classes.headerText}>Die Ersteinschätzung Ihres Sachverhalts</h1>
      </div>

      <div className={classes.subHeaderContainer}>
        <h2 className={classes.subHeaderText}>Rechtliche Einordnung:</h2>
      </div>

      <div className={classes.infoTextContainer}>
        <span className={classes.infoText}>
          Sie sehen sich aufgrund des Merkmals <b>{answers.getAnswerByKey("merkmal", 0)}
          </b> im Lebensbereich <b>{answers.getAnswerByKey("lebensbereich", 0)}</b> diskriminiert.
        </span>
      </div>

      <div className={classes.infoTextContainer}>
        <span className={classes.infoText}>
          {getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.agg_text)}
        </span>
      </div>

      {
        getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.frist_text)?
        <div className={classes.infoTextContainer}>
          <span className={classes.infoText}>
            {getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.frist_text)}
          </span>
        </div>: null
      }

      {
        getResultAdditionalText(resultSpecs.self.non_default_identifier)?
        <div className={classes.infoTextContainer}>
          <span className={classes.infoText}>
            {getResultAdditionalText(resultSpecs.self.non_default_identifier)}
          </span>
        </div>: null
      }

      <div className={classes.infoTextContainerMargin}>
        <span className={classes.infoText}>
          Falls Sie weitere Fragen haben, können Sie uns gerne kontaktieren oder eine Beratungsstelle in Ihrer Nähe aufsuchen.
        </span>
      </div>

      <div className={classes.subHeaderContainer}>
        <h2 className={classes.subHeaderText}>Nächste Schritte:</h2>
      </div>

      <div className={classes.infoTextContainerMargin}>
        <span className={classes.infoText}>
          {getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.next_step)}
        </span>
      </div>
    </div>
  );
}
