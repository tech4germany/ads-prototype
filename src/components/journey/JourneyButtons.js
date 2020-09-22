import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";
import { Answers } from "./../states/answerState.js";
import { ShowResult } from "./../states/showResultState.js";

const useStyles = makeStyles((theme) => ({
  buttonInactive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.75vh",
    fontFamily: "BundesSansWeb-Regular",
    height: "3.5vh",
    width: "15vw",
    backgroundColor: "#e0e0e0",
    color: "white",
    padding: theme.spacing(1,3,1,3),
  },
  buttonActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "3.5vh",
    width: "15vw",
    color: "white",
    backgroundColor: "#a7a7a7",
    padding: theme.spacing(1,3,1,3),
    cursor: "pointer",
      fontSize: "1.75vh",
      fontFamily: "BundesSansWeb-Regular",
  },
  arrow: {
    cursor: "pointer",
    color: "#a7a7a7",
    fontSize: "6vh"
  },
  arrowInvisible: {
    color: "#fef3df",
    fontSize: "6vh"
  }
}));

export function NextButton(props) {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let answers = Answers.useContainer()
  let showResult = ShowResult.useContainer();
  let activeDocument = documentQueue.active(activeStep.self)
  let stepAnswers = answers.getAnswersById(activeDocument.identifier)

  let nextText;
  let nextAction;
  if (activeStep.isLast(documentQueue.self.length)) {
    nextText = "Ergebnis";
    nextAction = arg => {
      showResult.show()
    }
  } else {
    nextText = "Weiter";
    nextAction = arg => {
      activeStep.increment(arg)
    }
  }

  let NextButton;
  if (stepAnswers.length > 0) {
    NextButton =
        <div className={classes.buttonActive}
          variant="outlined"
          onClick={() => nextAction(documentQueue.self.length)}
        >{nextText}</div>
  } else {
    NextButton =
        <div className={classes.buttonInactive}
          variant="outlined"
        >{nextText}</div>
  }
  return NextButton
}

export function BackButton(props) {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()

  if (activeStep.self === 0) {
    return(
        <KeyboardArrowLeft className={classes.arrowInvisible} />
    )
  } else {
    return(
        <KeyboardArrowLeft className={classes.arrow}
          onClick={() => activeStep.decrement()}
        />
    )
  }
}
