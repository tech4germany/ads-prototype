import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import { ActiveStep } from "components/states/activeStepState"
import { DocumentQueue } from "components/states/documentQueueState"
import { Answers } from "components/states/answerState"
import { ShowResult } from "components/states/showResultState.js";

const useStyles = makeStyles((theme) => ({
  buttonInactive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2vh",
    fontFamily: "BundesSansWeb-Regular",
    height: "5vh",
    width: "15vw",
    backgroundColor: "#e0e0e0",
    color: "white",
    padding: theme.spacing(1,3,1,3)
  },
  buttonActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "5vh",
    width: "15vw",
    color: "white",
    backgroundColor: "#a7a7a7",
    padding: theme.spacing(1,3,1,3),
    cursor: "pointer",
    fontSize: "2vh",
    fontFamily: "BundesSansWeb-Regular"
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

export function NextButton() {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let answers = Answers.useContainer()
  let showResult = ShowResult.useContainer();
  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)
  let stepAnswers = answers.getAnswersById(activeDocument.identifier)

  let nextText:string;
  let nextAction: (arg: number) => void;
  if (activeStep.isSecondLast(documentQueue.self.length)) {
    nextText = "Ergebnis";
    nextAction = arg => {
      showResult.show()
      activeStep.increment(arg)
    }
  } else if (activeStep.isLast(documentQueue.self.length)) {
    nextText = "Schließen";
    nextAction = arg => {}
  } else {
    nextText = "Weiter";
    nextAction = arg => {
      activeStep.increment(arg)
    }
  }

  let NextButton;
  if ((stepAnswers.length > 0) || (activeStep.isLast(documentQueue.self.length))) {
    NextButton =
        <div className={classes.buttonActive}
          onClick={() => nextAction(documentQueue.self.length)}
        >{nextText}</div>
  } else {
    NextButton =
        <div className={classes.buttonInactive}
        >{nextText}</div>
  }
  return NextButton
}

export function BackButton() {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let showResult = ShowResult.useContainer();

  let nextAction: () => void;
  if (activeStep.isLast(documentQueue.self.length)) {
    nextAction = () => {
      activeStep.decrement();
      showResult.hide();
    }
  } else {
    nextAction = () => {
      activeStep.decrement();
    }
  }

  if (activeStep.self === 0) {
    return(
        <KeyboardArrowLeft className={classes.arrowInvisible} />
    )
  } else {
    return(
        <KeyboardArrowLeft className={classes.arrow}
          onClick={() => nextAction()}
        />
    )
  }
}
