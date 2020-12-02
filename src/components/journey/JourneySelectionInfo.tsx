import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import  Grid from '@material-ui/core/Grid';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { EdgeDetail, UpdateType } from "data/customTypes"
import exitIcon from 'assets/icons/cancel.png';

const wrap = (s: string) => s.replace(
        /(?![^\n]{1,28}$)([^\n]{1,28})\//g, '$1\/\n'
    )

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "734px",
    backgroundColor: "white",
    marginBottom: "15px",
  },
  infoContent: {
    marginBottom: "22px",
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
    marginBottom: "41px"
  },
  infoHeader: {
    whiteSpace: "pre-wrap",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontFamily: textSelectionMain["fontFamily"],
    fontSize: textSelectionMain["fontSize"],
    marginTop: "22px"
  },
  exitIcon: {
    width: "30px",
    height: "30px",
    marginTop: "10px",
    marginRight: "10px",
    cursor: "pointer"
  },
  infoText: {
    ...textSelectionExplanation,
    marginRight: "90px"
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

type PropsLayout = {
  "infoDisplay": string | null;
  "updateInfoDisplay": (label: string | null) => void;
}

export default function JourneySelectionInfoText(props: PropsLayout) {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeDocument = documentQueue.self[activeStep.self]

  return (
    <Grid container className={classes.root} >
      <div className={classes.infoContainer}>

        <div className={classes.infoContent}>
          <div className={classes.infoCard}>
            <div className={classes.headerRow}>
              <div className={classes.infoHeader}>
                <span>{props.infoDisplay}</span>
              </div>
              <div>
                <img className={classes.exitIcon}
                  src={exitIcon}
                  alt={"empty"}
                  onClick={(event) => {
                    event.stopPropagation()
                    props.updateInfoDisplay(null)
                }}/>
              </div>
            </div>
            <span className={classes.infoText}>
              {
                props.infoDisplay?
                documentQueue.getEdgeFeatureByLabel(activeStep.self, props.infoDisplay, EdgeDetail.info_text):
                null
              }
            </span>
          </div>
        </div>
        <div className={classes.infoStripe}></div>
      </div>
    </Grid>
  )
}
