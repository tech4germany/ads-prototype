import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { Answers } from "./../states/answerState.js";
import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "flex-start",
    flexWrap: "wrap",
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  buttonContainer: {
    margin: "0px"
  },
  buttonCardInactive: {
    backgroundColor: "white",
    padding: theme.spacing(3),
    cursor: "pointer",
    width: "25vh",
    height: "7vh",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0px"
  },
  buttonCardActive: {
    color: "white",
    backgroundColor: "grey",
    padding: theme.spacing(3),
    cursor: "pointer",
    width: "25vh",
    height: "7vh",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0px"
  }
}));

export default function JourneySelection(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();

  let activeDocument = documentQueue.active(activeStep.self)
  let stepAnswers = answers.initialiseStep(activeDocument.identifier)
  let options = Object.keys(activeDocument["options"]);

  return (
    <div className={classes.root}>

        {options.map((label, index) => {
          return(
            <div key={index} className={classes.buttonContainer}>
            {
              !stepAnswers.includes(label) ?
                <Paper className={classes.buttonCardInactive}
                elevation={0}
                  onClick={() => {
                    answers.update(activeDocument.identifier, label)
                    documentQueue.add(activeStep.self, label)
                    }}
                  >
                    {label}
                </Paper>
              :
              <Paper className={classes.buttonCardActive}
              elevation={0}
                onClick={() => {
                  answers.update(activeDocument.identifier, label)
                  documentQueue.remove(activeStep.self, label)
                }}
                >
                  {label}
              </Paper>
            }
            </div>
          );
        })}
    </div>

  );
}