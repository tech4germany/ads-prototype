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
    maxWidth: "750px",
  },
  headerContainer: {
    marginBottom: "50px",
    width: "100%"
  },
  headerText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "40px",
    lineHeight: "48px",
    margin: "0px",
    fontWeight: "normal",
    width: "100%",
  },
  subHeaderContainer: {
    marginBottom: "32px",
    width: "100%"
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    margin: "0px",
    fontWeight: "normal",
    width: "100%",
  },
  infoTextContainer: {
    marginBottom: "18px",
    width: "100%"
  },
  infoTextContainerMargin: {
    marginBottom: "50px",
    width: "100%"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    whiteSpace: "pre-wrap",
    margin: "0px",
    width: "100%",
  }
}));

export default function ResultInfo() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let answers = Answers.useContainer();

  return (
    <section className={classes.infoBox} aria-label="Rechtliche Ersteinschätzung zu Ihrem Fall" id="infosRechtlicheErsteinschätzung">

      <header className={classes.headerContainer} aria-hidden="true">
        <h1 className={classes.headerText}>Die Ersteinschätzung Ihres Sachverhalts</h1>
      </header>

      <div className={classes.subHeaderContainer}>
        <h2 className={classes.subHeaderText}>Rechtliche Einordnung:</h2>
      </div>

      <div className={classes.infoTextContainer}>
        <p className={classes.infoText}>
          Sie sehen sich aufgrund des Merkmals <strong>{answers.getAnswerByKey("merkmal", 0)}
          </strong> im Lebensbereich <strong>{answers.getAnswerByKey("lebensbereich", 0)}</strong> diskriminiert.
        </p>
      </div>

      <div className={classes.infoTextContainer}>
        <p className={classes.infoText}>
          {getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.agg_text)}
        </p>
      </div>

      {
        getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.frist_text)?
        <div className={classes.infoTextContainer}>
          <p className={classes.infoText}>
            {getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.frist_text)}
          </p>
        </div>: null
      }

      {
        getResultAdditionalText(resultSpecs.self.non_default_identifier)?
        <div className={classes.infoTextContainer}>
          <p className={classes.infoText}>
            {getResultAdditionalText(resultSpecs.self.non_default_identifier)}
          </p>
        </div>: null
      }

      <div className={classes.infoTextContainerMargin}>
        <p className={classes.infoText}>
          Falls Sie weitere Fragen haben, können Sie uns gerne kontaktieren oder eine Beratungsstelle in Ihrer Nähe aufsuchen.
        </p>
      </div>

      <div className={classes.subHeaderContainer}>
        <h2 className={classes.subHeaderText}>Nächste Schritte:</h2>
      </div>

      <div className={classes.infoTextContainerMargin}>
        <p className={classes.infoText}>
          {getResultFeature(resultSpecs.self.default_identifier, ResultFeatureType.next_step)}
        </p>
      </div>
    </section>
  );
}
