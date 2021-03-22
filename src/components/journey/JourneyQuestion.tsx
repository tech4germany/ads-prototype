import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StepDetail } from "data/customTypes"
import { ActiveNode } from "states/activeNodeState"

const useStyles = makeStyles((theme) => ({
  questionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minHeight: "96px",
    marginBottom: "12px",
    marginLeft: "11px",
    marginRight: "11px",
  },
  questionContainer: {
    marginBottom: "6px",
  },
  questionText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "28px",
    margin: "0px",
    fontWeight: "normal",
    hyphens: "auto"
  },
  explanationText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    lineHeight: "28px",
    whiteSpace: "pre-wrap",
    margin: "0px",
    hyphens: "auto"
  }
}));

export default function JourneyQuestion() {
  const classes = useStyles()
  let activeNode = ActiveNode.useContainer()

  return (
    <header
      className={classes.questionBox}
      id="question-header"
      aria-label="Frage der Auswahlebene und Beschreibung"
    >
      <div className={classes.questionContainer}>
        <h1 className={classes.questionText}
          aria-live="polite"
          aria-atomic="true">
          {activeNode.getStepDetail(StepDetail.question)}
        </h1>
      </div>
      <p className={classes.explanationText}
        id="question-explanation"
        aria-live="polite"
        aria-atomic="true">
        {activeNode.getStepDetail(StepDetail.explanation)}
      </p>
    </header>
);
}
