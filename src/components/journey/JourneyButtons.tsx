import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { Answers } from "states/answerState"
import { colorMain } from "components/styleguide"
import { UpdateType } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: "#818F98",
    fontSize: "48px",
    outline: 0,
    '@media (hover: hover)': {
      "&:hover": {
        color: "black",
        boxShadow: "inset 0 0 0 1px currentColor"
      },
      "&:focus": {
        color: "black",
        boxShadow: "inset 0 0 0 1px currentColor"
      }
    }
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
  let documentQueue = DocumentQueue.useContainer()
  let activeDocument = documentQueue.self[activeStep.self]

  let handleClick = () => {
    activeStep.decrement(documentQueue.getVisibilityQueue())
    documentQueue.remove(activeStep.self, answers.remainsAgg())
    answers.prune()
  }

  if ((activeStep.self === 0)) {
    return(
        <KeyboardArrowLeft className={classes.arrowInvisible} />
    )
  } else {
    return(
        <nav className={classes.arrowContainer}>
          <KeyboardArrowLeft
            tabIndex={0}
            aria-label="Zurück"
            aria-hidden="false"
            onClick={handleClick}
            onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) {handleClick()}}}
            className={classes.arrow}
          />
        </nav>
    )
  }
}
