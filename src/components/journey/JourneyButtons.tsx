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
  let showResult = ShowResult.useContainer();

  let handleClick = () => {

    if (showResult.self) {

      // return to selection journey
      showResult.hide()

    } else {

      // decrement step count back to last visible document in queue
      activeStep.decrement(documentQueue.getVisibilityQueue())

      // move backward in document queue and reset visibility status where necessary
      documentQueue.move_backward(activeStep.self, answers.remainsAgg())

    }

    // delete previous answer from answer dictionary
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
