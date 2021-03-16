import React, { useRef, useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowInfo } from "states/showInfoState"
import { EdgeDetail } from "data/customTypes"
import exitIcon from 'assets/icons/cancel.svg'

const useStyles = makeStyles((theme) => ({
  selectionInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    width: "100%"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "734px",
    backgroundColor: "#fff",
    marginBottom: "15px"
  },
  infoContent: {
    marginBottom: "28px",
    paddingLeft: "22px",
    maxWidth: "728px"
  },
  infoCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerRow: {
    maxWidth: "722px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "28px"
  },
  infoHeader: {
    whiteSpace: "pre-wrap",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    marginTop: "22px"
  },
  infoHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    margin: "0px",
    fontWeight: "normal"
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
    marginTop: "10px",
    marginRight: "10px",
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
    marginRight: "90px",
    margin: "0px"
  },
  infoStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    width: "6px",
    minWidth: "6px",
    minHeight: "100px",
    height: "100%"
  }
}));

export default function JourneySelectionInfoText() {
  const classes = useStyles();
  const setFocus = useRef<HTMLDivElement>(null);
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
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
    <section className={classes.selectionInfoBox} aria-label={"Informationsbereich zu getroffener Auswahl: infoDisplay.retrieveActiveLabel()"}>
      <div
        className={classes.infoContainer}
        ref={setFocus}
        tabIndex={0}
        role="dialog"
        id="answer-info" aria-live="polite"
        >
        <div className={classes.infoContent}>
          <div className={classes.infoCard}>
            <div className={classes.headerRow}>
              <header className={classes.infoHeader}>
                <h2 className={classes.infoHeaderText}>{infoDisplay.retrieveActiveLabel()}</h2>
              </header>
              <button
                id="exit button"
                className={classes.exitButton}
                title="Informationstext schließen"
                type="button"
                role="button"
                aria-label="Rückkehr zum Auswahlbereich"
                aria-controls="answer-selector"
                onKeyDown={handleKeyDown}
                onClick={handleClick}
              >
                <img className={classes.exitIcon} src={exitIcon} alt={""}/>
              </button>
            </div>
            <p className={classes.infoText}>
              {
                current_label?
                documentQueue.getEdgeFeatureByLabel(activeStep.self, current_label, EdgeDetail.info_text):
                null
              }
            </p>
          </div>
        </div>
        <canvas className={classes.infoStripe}></canvas>
      </div>
    </section>
  )
}
