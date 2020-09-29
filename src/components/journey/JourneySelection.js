import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Grid from '@material-ui/core/Grid';

import { Answers } from "components/states/answerState.js";
import { ActiveStep } from "components/states/activeStepState.js";
import { DocumentQueue } from "components/states/documentQueueState.js";

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
    margin: "0px"
  },
  buttonCardInactive: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    width: "100%",
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
    width: "100%",
    cursor: "pointer",
    height: "10vh",
    borderRadius: "0px",
  },
  buttonTextBoxActive: {
    backgroundColor: "#f3b500",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.9vh",
    height: "100%",
    width: "98%",
    overflow: "hidden",
    paddingLeft: "0.8vw",
    paddingRight: "0.8vw",
    paddingTop: "0.8vw",
    paddingBottom: "0.8vw",
  },
  buttonTextBoxInactive: {
    backgroundColor: "white",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.9vh",
    height: "100%",
    width: "98%",
    overflow: "hidden",
    paddingLeft: "0.8vw",
    paddingRight: "0.8vw",
    paddingTop: "0.8vw",
    paddingBottom: "0.8vw",
  },
  buttonStripe: {
    display: "flex",
    backgroundColor: "#f3b500",
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

export default function JourneySelection(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();

  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)
  let options = Object.keys(activeDocument["options"]);

  let CardWithPosition = (props) => {
    return(
      <Grid item md={3} sm={6} xs={12} className={classes.buttonTextContainer}>
        {props.component}
      </Grid>
    )
  }

  return (
    <Grid container className={classes.root} >

        {options.map((label, index) => {

          let CardWithSelection;
          if (!answers.getAnswersById(activeDocument.identifier).includes(label)) {
            CardWithSelection =
              <div className={classes.buttonCardInactive}
                onClick={() => {
                  console.log("ative step", activeStep.self)
                  answers.add(activeDocument.identifier, activeDocument.multiple_choice, label)
                                    console.log("ative step", activeStep.self)

                  documentQueue.add(activeStep.self, label, activeDocument.multiple_choice)
                }}
              >
                <div className={classes.buttonTextBoxInactive}>
                  {label}
                </div>
               <div className={classes.buttonStripe}></div>
              </div>
          } else {
            CardWithSelection =
              <div className={classes.buttonCardActive}
                onClick={() => {
                  documentQueue.remove(activeStep.self, label)
                  answers.remove(activeDocument.identifier, label)
                }}
              >
                <div className={classes.buttonTextBoxActive}>
                  {label}
                </div>
                <div className={classes.buttonStripe}></div>
              </div>
          }

          return(
            <CardWithPosition component={CardWithSelection}/>
          )
        })}
    </Grid>
  )
}