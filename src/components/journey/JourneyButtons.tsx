import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { Answers } from "states/answerState"
import { ShowResult } from "states/showResultState"
import { colorMain } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  arrow: {
    cursor: "pointer",
    color: "#b8c0c5",
    fontSize: "6vh"
  },
  arrowInvisible: {
    color: colorMain["15"],
    fontSize: "6vh"
  }
}));

export function BackButton() {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()
  let answers = Answers.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let showResult = ShowResult.useContainer();
  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)

  // how to handle backward moves
  let backwardAction = (): void => {
    activeStep.decrement(documentQueue.retrieveVisibilityQueue())
    documentQueue.removeVisibility(activeDocument)
    answers.prune(activeDocument.identifier)
  }

  if (activeStep.self === 0) {

    return(
        <KeyboardArrowLeft className={classes.arrowInvisible} />
    )

  } else {

    return(
        <KeyboardArrowLeft className={classes.arrow}
          onClick={() => backwardAction()}
        />
    )

  }
}
