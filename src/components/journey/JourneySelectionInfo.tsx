import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain } from "components/styleguide"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowInfo } from "states/showInfoState"
import { EdgeDetail } from "data/customTypes"
import exitIcon from 'assets/icons/cancel.png';

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
    backgroundColor: "white",
    marginBottom: "15px",
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
    margin: "0px"
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
    padding: "0px"
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
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let infoDisplay = ShowInfo.useContainer()

  return (
    <div className={classes.selectionInfoBox} >
      <div className={classes.infoContainer}>

        <div className={classes.infoContent}>
          <div className={classes.infoCard}>
            <div className={classes.headerRow}>
              <div className={classes.infoHeader}>
                <h3 className={classes.infoHeaderText}>{infoDisplay.self}</h3>
              </div>
              <button className={classes.exitButton} tabIndex={0}
                title="Informationstext schließen"
                onClick={(event) => {
                  event.stopPropagation()
                  infoDisplay.hide()
                }}
              >
                <img className={classes.exitIcon} src={exitIcon} alt={"empty"}/>
              </button>
            </div>
            <p className={classes.infoText}>
              {
                infoDisplay.self?
                documentQueue.getEdgeFeatureByLabel(activeStep.self, infoDisplay.self, EdgeDetail.info_text):
                null
              }
            </p>
          </div>

        </div>

        <div className={classes.infoStripe}></div>
      </div>
    </div>
  )
}
