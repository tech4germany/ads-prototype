import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Grid from '@material-ui/core/Grid';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { EdgeDetail, UpdateType } from "data/customTypes"
import map from 'assets/images/map_icon.png';

const wrap = (s: string) => s.replace(
        /(?![^\n]{1,28}$)([^\n]{1,28})\//g, '$1\/\n'
    )

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    '& > *': {
      margin: theme.spacing(1),
    },
    minHeight: "42vh"
  },
  buttonContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
    marginBottom: "15px",
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "0px"
  },
  buttonCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "260px",
    cursor: "pointer",
    height: "200px",
    backgroundColor: "white"
  },
  buttonContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "254px",
    height: "100%",
    color: textSelectionMain["color"]["inactive"],
    fontFamily: textSelectionMain["fontFamily"],
    fontSize: textSelectionMain["fontSize"],
    "&:hover": {
      backgroundColor: colorMain["115"],
      color: textSelectionMain["color"]["active"],
    }
  },
  iconContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    width: "90px",
    height: "90px",
    marginTop: "28px"
  },
  buttonText: {
    whiteSpace: "pre-wrap",
    paddingLeft: "22px",
    paddingBottom: "21px",
  },
  buttonTextExplanation: {
    ...textSelectionExplanation
  },
  buttonStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    height: "100%",
    width: "6px"
  }
}));

export default function JourneySelection() {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeDocument = documentQueue.self[activeStep.self]

  return (
    <Grid container className={classes.root} >
      {documentQueue.getEdges(activeStep.self).map((label, index) => {

        const icon = require("../../assets/icons/" + documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon))
        return (
          <div className={classes.buttonContainer}>

            <div className={classes.buttonCard}
              onClick={() => {
                answers.add(activeDocument.identifier, label)
                documentQueue.update(UpdateType.add, activeStep.self, label)
                activeStep.increment(documentQueue.getVisibilityQueue())
              }}
            >

            <div className={classes.buttonContent}>

              <div className={classes.iconContainer}>
                  <img className={classes.icon}
                  src={icon}
                  alt={"empty"}/>
              </div>

              <div className={classes.buttonText}>
                {wrap(label)}
                <div className={classes.buttonTextExplanation}>
                  {documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.description)}
                </div>
              </div>

            </div>

           <div className={classes.buttonStripe}></div>
          </div>
        </div>
      );
    })}
  </Grid>
  )
}
