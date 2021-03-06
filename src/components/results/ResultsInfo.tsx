import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Answers } from "states/answerState"
import { getResultFeature, getResultAdditionalText } from "data/Interface"
import { ResultFeatureType, ResultSpecsLayout } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  infoBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerContainer: {
    marginBottom: "50px",
  },
  headerText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "40px",
    lineHeight: "48px",
    margin: "0px",
    fontWeight: "normal",
    textAlign: "left",
    hyphens: "auto"
  },
  subHeaderContainer: {
    marginBottom: "32px",
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    margin: "0px",
    fontWeight: "normal",
    hyphens: "auto"
  },
  infoTextContainer: {
    marginBottom: "18px",
  },
  infoTextContainerMargin: {
    marginBottom: "50px",
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    whiteSpace: "pre-wrap",
    margin: "0px",
    hyphens: "auto"
  }
}));

interface Props {
  result: ResultSpecsLayout;
}

export default function ResultInfo(props: Props) {
  const classes = useStyles()
  let answers = Answers.useContainer();

  return (
    <section className={classes.infoBox} aria-label="Rechtliche Ersteinschätzung zu Ihrem Fall" id="infosRechtlicheErsteinschätzung">

      <header className={classes.headerContainer} aria-hidden="true">
        <h1 className={classes.headerText}>Die Ersteinschät&shy;zung Ihres Sachverhalts</h1>
      </header>

      <div className={classes.subHeaderContainer}>
        <h2 className={classes.subHeaderText}>Rechtliche Einordnung:</h2>
      </div>

      <div className={classes.infoTextContainer}>
        <p className={classes.infoText}>
          Sie sehen sich aufgrund des Merkmals <strong>{answers.getAnswerByKey("merkmal")}
          </strong> im Lebensbereich <strong>{answers.getAnswerByKey("lebensbereich")}</strong> diskriminiert.
        </p>
      </div>

      <div className={classes.infoTextContainer}>
        <p className={classes.infoText}>
          {getResultFeature(props.result.default_identifier, ResultFeatureType.agg_text)}
        </p>
      </div>

      {
        getResultFeature(props.result.default_identifier, ResultFeatureType.frist_text)?
        <div className={classes.infoTextContainer}>
          <p className={classes.infoText}>
            {getResultFeature(props.result.default_identifier, ResultFeatureType.frist_text)}
          </p>
        </div>: null
      }

      {
        getResultAdditionalText(props.result.non_default_identifier)?
        <div className={classes.infoTextContainer}>
          <p className={classes.infoText}>
            {getResultAdditionalText(props.result.non_default_identifier)}
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
          {getResultFeature(props.result.default_identifier, ResultFeatureType.next_step)}
        </p>
      </div>
    </section>
  );
}
