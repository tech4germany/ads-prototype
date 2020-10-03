import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Grid from '@material-ui/core/Grid';

import { mapLabelToDescription } from "data/Interface"

import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"

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
    height: "11vh",
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
    height: "11vh",
    borderRadius: "0px",
  },
  buttonTextBoxActive: {
    backgroundColor: "#f3b500",
    color: "white",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.8vh",
    height: "100%",
    width: "98%",
    overflow: "hidden",
    paddingLeft: "1vw",
    paddingRight: "1vw",
    paddingTop: "0.6vw",
    paddingBottom: "0.6vw",
  },
  buttonTextBoxInactive: {
    backgroundColor: "white",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.8vh",
    height: "100%",
    width: "98%",
    overflow: "hidden",
    paddingLeft: "1vw",
    paddingRight: "1vw",
    paddingTop: "0.6vw",
    paddingBottom: "0.6vw",
  },
  buttonTextExplanationInactive: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "1.4vh",
  },
  buttonTextExplanationActive: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "1.4vh",
    color: "white"
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

export default function JourneySelection() {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();

  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)

  type CardWithPositionProps = { component: JSX.Element };

  let CardWithPosition = (props: CardWithPositionProps) => {
    return(
      <Grid item md={3} sm={6} xs={12} className={classes.buttonTextContainer}>
        {props.component}
      </Grid>
    )
  }

  return (
    <Grid container className={classes.root} >

        {activeDocument["options"].map((label, index) => {

          let CardWithSelection: JSX.Element;
          if (!answers.getAnswersById(activeDocument.identifier).includes(label)) {
            CardWithSelection =
              <div className={classes.buttonCardInactive}
                onClick={() => {
                  answers.add(activeDocument.identifier, activeDocument.multiple_choice, label)
                  documentQueue.add(activeStep.self, label, activeDocument.multiple_choice)
                }}
              >
                <div className={classes.buttonTextBoxInactive}>
                  {label}
                  <div className={classes.buttonTextExplanationInactive}>
                    {mapLabelToDescription(activeDocument.identifier, label)}
                  </div>
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
                  <div className={classes.buttonTextExplanationActive}>
                    {mapLabelToDescription(activeDocument.identifier, label)}
                  </div>
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
