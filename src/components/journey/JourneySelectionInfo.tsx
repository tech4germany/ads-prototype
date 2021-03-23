import React, { useRef, useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"
import { ActiveNode } from "states/activeNodeState"
import { ShowInfo } from "states/showInfoState"
import { EdgeDetail } from "data/customTypes"
import exitIcon from 'assets/icons/cancel.svg'

const useStyles = makeStyles((theme) => ({
  selectionInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "734px",
    mindWidth: "260px",
    backgroundColor: "#fff",
    position: "relative"
  },
  infoContent: {
    padding: "30px 96px 30px 22px",
  },
  infoHeader: {
    marginBottom: "28px"
  },
  infoHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    margin: "0px",
    fontWeight: "normal",
    hyphens: "auto"
  },
  exitIcon: {
    width: "30px",
    height: "30px",
    cursor: "pointer"
  },
  exitButton:{
    backgroundColor: "inherit",
    border: "solid 0px",
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "10px",
    right: "16px",
    padding: "0px",
    '@media (hover: hover)': {
      "&:hover": {
        boxShadow: "inset 0 0 0 1px currentColor"
      },
      "&:focus": {
        boxShadow: "inset 0 0 0 1px currentColor"
      }
    }
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "25px",
    margin: "0px",
    hyphens: "auto"
  },
  infoStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    width: "6px",
    minWidth: "6px",
    minHeight: "100px",
    height: "100%",
    position: "absolute",
    top: "0px",
    right: "0px",
  }
}));

export default function JourneySelectionInfoText() {
  const classes = useStyles();
  const setFocus = useRef<HTMLDivElement>(null);
  let activeNode = ActiveNode.useContainer()
  let infoDisplay = ShowInfo.useContainer()

  useLayoutEffect(() => {
    if (setFocus.current) {
      setFocus.current.focus()
    }
  }, []);

  let handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      infoDisplay.hide()
      e.preventDefault()
    }
  }

  let handleClick = (e: React.SyntheticEvent) => {
    infoDisplay.hide()
  }

  const current_label = infoDisplay.retrieveActiveLabel()

  return (
    <section className={classes.selectionInfoBox}>
      <div
        className={classes.infoContainer}
        ref={setFocus}
        role="dialog"
        aria-label={"Informationen zu getroffener Auswahl:" + infoDisplay.retrieveActiveLabel()}
        >
        <div className={classes.infoContent}>
          <header className={classes.infoHeader}>
            <h2 className={classes.infoHeaderText}>{infoDisplay.retrieveActiveLabel()}</h2>
          </header>
          <p className={classes.infoText} id="answer-info" aria-live="polite">
            {
              current_label?
              activeNode.getEdgeFeatureByLabel(current_label, EdgeDetail.info_text):
              null
            }
          </p>
        </div>
        <button
          id="exit button"
          className={classes.exitButton}
          title="Rückkehr zum Auswahlbereich"
          aria-label="Rückkehr zum Auswahlbereich"
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <img className={classes.exitIcon} src={exitIcon} alt={""}/>
        </button>
        <canvas className={classes.infoStripe}></canvas>
      </div>
    </section>
  )
}
