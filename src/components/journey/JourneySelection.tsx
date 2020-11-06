import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Grid from '@material-ui/core/Grid';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { EdgeDetail, UpdateType } from "data/customTypes"

const wrap = (s: string) => s.replace(
        /(?![^\n]{1,28}$)([^\n]{1,28})\//g, '$1\/\n'
    )

const buttonTextBox = {
    "fontFamily": textSelectionMain["fontFamily"],
    "fontSize": textSelectionMain["fontSize"],
    "lineHeight": 1.15,
    "height": "100%",
    "width": "98%",
    "overflow": "hidden",
    "paddingLeft": "1vw",
    "paddingRight": "1vw",
    'paddingTop': "0.6vw",
    "paddingBottom": "0.6vw",
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: "flex-start",
    alignItems: "flex-start",
    '& > *': {
      margin: theme.spacing(1),
    },
    minHeight: "42vh"
  },
  buttonContainer: {
    margin: "0px"
  },
  buttonCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    width: "100%",
    cursor: "pointer",
    height: "11vh",
    borderRadius: "0px",
    whiteSpace: "pre-wrap"
  },
  buttonTextBoxActive: {
    backgroundColor: colorMain["115"],
    color: textSelectionMain["color"]["active"],
    ...buttonTextBox,
  },
  buttonTextBoxInactive: {
    backgroundColor: "white",
    color: textSelectionMain["color"]["inactive"],
    ...buttonTextBox,
    "&:hover": {
      backgroundColor: colorMain["115"],
      color: textSelectionMain["color"]["active"],
    }
  },
  buttonTextExplanationInactive: {
    ...textSelectionExplanation
  },
  buttonTextExplanationActive: {
    ...textSelectionExplanation,
    color: "white"
  },
  buttonStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    height: "100%",
    width: "2%"
  },
  buttonTextContainer: {
    paddingLeft: "0.8vw",
    paddingRight: "0.8vw",
    marginBottom: "3vh",
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "0px"
  },
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

        return (
          <Grid item md={3} sm={6} xs={12} className={classes.buttonTextContainer}>
            <div className={classes.buttonCard}
              onClick={() => {
                answers.add(activeDocument.identifier, label)
                documentQueue.update(UpdateType.add, activeStep.self, label)
                activeStep.increment(documentQueue.getVisibilityQueue())
              }}
            >
            <div className={classes.buttonTextBoxInactive}>
              {wrap(label)}
              <div className={classes.buttonTextExplanationInactive}>
                {documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.description)}
              </div>
            </div>
           <div className={classes.buttonStripe}></div>
          </div>
        </Grid>
      );
    })}
  </Grid>
  )
}
