import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { Answers } from "states/answerState"
import { colorMain } from "components/styleguide"
import { UpdateType } from "data/customTypes"
import { ShowInfo } from "states/showInfoState"

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: "#b8c0c5",
    fontSize: "48px"
  },
  arrowContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "inherit",
    border: "solid 0px",
    padding: "0px"
  },
  arrowInvisible: {
    color: colorMain["15"],
    fontSize: "48px"
  }
}));

export function BackButton() {
  const classes = useStyles()
  let activeStep = ActiveStep.useContainer()
  let answers = Answers.useContainer()
  let infoDisplay = ShowInfo.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let activeDocument = documentQueue.self[activeStep.self]

  // how to handle backward moves
  let backwardAction = (): void => {
    activeStep.decrement(documentQueue.getVisibilityQueue())
    documentQueue.update(UpdateType.remove, activeStep.self)
    answers.prune(activeDocument.identifier)
  }

  if ((activeStep.self === 0) || (infoDisplay.self)) {
    return(
        <KeyboardArrowLeft className={classes.arrowInvisible} />
    )
  } else {
    return(
        <button tabIndex={0} className={classes.arrowContainer}
          onClick={() => backwardAction()}
        >
          <KeyboardArrowLeft className={classes.arrow}/>
        </button>
    )
  }
}
