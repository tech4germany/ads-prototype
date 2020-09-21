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
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    '& > *': {
      margin: theme.spacing(1),
    },
    minHeight: "36vh"
  },
  buttonContainer: {
    margin: "0px"
  },
  buttonCardInactive: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    width: "18vw",
    cursor: "pointer",
    height: "10vh",
    borderRadius: "0px",
  },
  buttonCardActive: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    width: "18vw",
    cursor: "pointer",
    height: "10vh",
    borderRadius: "0px",
  },
  buttonTextBoxActive: {
    backgroundColor: "#f3b500",
    padding: theme.spacing(3,4,3,4),
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.7vh",
    height: "100%",
    width: "98%"
  },
  buttonTextBoxInactive: {
    backgroundColor: "white",
    padding: theme.spacing(3,4,3,4),
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.7vh",
    height: "100%",
    width: "98%"
  },
  buttonStripe: {
    display: "flex",
    backgroundColor: "#f3b500",
    height: "100%",
    width: "2%"
  },
  positionStart: {
    marginLeft: "0px",
    marginRight: "2vw",
    marginTop: "0px",
    marginBottom: "2vh"
  },
  positionCenter: {
    marginLeft: "0px",
    marginRight: "2vw",
    marginTop: "0px",
    marginBottom: "2vh"  },
  positionEnd: {
    marginLeft: "0vw",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "2vh"  },
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

          let CardWithPosition;
          if (index%4===0) {
            CardWithPosition = (props) => {
              return(
                <div className={classes.positionStart}>
                  {props.component}
                </div>
              );
            }
          } else if (index%4===3) {
            CardWithPosition = (props) => {
              return(
                <div className={classes.positionEnd}>
                  {props.component}
                </div>
              )
            }
          } else {
            CardWithPosition = (props) => {
              return(
                <div className={classes.positionCenter}>
                  {props.component}
                </div>
              )
            }
          }

          let CardWithActive;
          if (!stepAnswers.includes(label)) {
            CardWithActive =
              <div className={classes.buttonCardInactive}
                onClick={() => {
                  answers.update(activeDocument.identifier, label)
                  documentQueue.add(activeStep.self, label)
                }}
              >
                <div className={classes.buttonTextBoxInactive}>
                  {label}
                </div>
               <div className={classes.buttonStripe}></div>
              </div>
          } else {
            CardWithActive =
              <div className={classes.buttonCardActive}
                onClick={() => {
                  answers.update(activeDocument.identifier, label)
                  documentQueue.remove(activeStep.self, label)
                }}
              >
                <div className={classes.buttonTextBoxActive}>
                  {label}
                </div>
                <div className={classes.buttonStripe}></div>
              </div>
          }

          return(
            <CardWithPosition component={CardWithActive}/>
          )
        })}
    </div>
  )
}