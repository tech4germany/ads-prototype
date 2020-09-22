import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";
import { Answers } from "./../states/answerState.js";
import { ShowResult } from "./../states/showResultState.js";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width:"100%"
  },
  singleButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-end',
  },
  bothButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  buttonCardInactive: {
    backgroundColor: "white",
    padding: theme.spacing(1,3,1,3),
    cursor: "pointer"
  },
  buttonCardActive: {
    color: "white",
    backgroundColor: "grey",
    padding: theme.spacing(1,3,1,3),
    cursor: "pointer"
  }
}));

export default function JourneyNavigation(props) {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let showResult = ShowResult.useContainer()
  let answers = Answers.useContainer()
  let activeDocument = documentQueue.active(activeStep.self)
  let stepAnswers = answers.getAnswersById(activeDocument.identifier)


  let nextText;
  if (showResult.self) {
    nextText = "Result"
  } else { nextText = "Next" }

  let NextButton;
  if (stepAnswers.length > 0) {
    NextButton =
      <div className={classes.singleButton}>
        <Card className={classes.buttonCardActive}
          variant="outlined"
          onClick={() => activeStep.increment(documentQueue.self.length)}
        >{nextText}</Card>
      </div>
  } else {
    NextButton =
      <div className={classes.singleButton}>
        <Card className={classes.buttonCardInactive}
          variant="outlined"
        >{nextText}</Card>
      </div>
  }

  let BackButton =
    <Card className={classes.buttonCardInactive}
      variant="outlined"
      onClick={() => activeStep.decrement()}
    >Back</Card>

  const BothButtons = (props) => {
    if (activeStep.self === 0) {
      return(
        <div className={classes.singleButton}>
          {props.NextButton}
        </div>
      )
    } else {
      return(
        <div className={classes.bothButtons}>
         {props.BackButton}
         {props.NextButton}
        </div>
      )
    }
  }

  return (
    <div className={classes.buttonGroup}>
      <BothButtons NextButton={NextButton} BackButton={BackButton}/>
    </div>
  );
}