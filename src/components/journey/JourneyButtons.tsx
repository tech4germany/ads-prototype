import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { ActiveNode } from "states/activeNodeState"
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
  let answers = Answers.useContainer()
  let activeNode = ActiveNode.useContainer()
  let showResult = ShowResult.useContainer();

  let handleClick = () => {

    if (showResult.self) { showResult.hide()}
    else { activeNode.move_backward() }
    answers.prune()

  }

  if (activeNode.isRoot()) {
    return(
        <KeyboardArrowLeft className={classes.arrowInvisible} />
    )
  } else {
    return(
        <nav className={classes.arrowContainer}>
          <KeyboardArrowLeft
            tabIndex={0}
            aria-label="Zurück"
            onClick={handleClick}
            onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) {handleClick()}}}
            className={classes.arrow}
          />
        </nav>
    )
  }
}
