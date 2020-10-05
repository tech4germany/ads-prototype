import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Grid from '@material-ui/core/Grid';
import { colorMain, textSelectionMain } from "components/styleguide"

import { mapLabelToDescription } from "data/Interface"

import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowResult } from "states/showResultState"

const buttonTextBox = {
    "fontFamily": textSelectionMain["fontFamily"],
    "fontSize": textSelectionMain["fontSize"],
    "height": "100%",
    "width": "98%",
    "overflow": "hidden",
    "paddingLeft": "1vw",
    "paddingRight": "1vw",
    'paddingTop': "0.6vw",
    "paddingBottom": "0.6vw",
}

const buttonTextExplanation = {
  "fontFamily": "BundesSansWeb-Regular",
  "fontSize": "1.4vh",
}

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
  buttonCard: {
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
    backgroundColor: colorMain["115"],
    color: textSelectionMain["color"]["active"],
    ...buttonTextBox,
  },
  buttonTextBoxInactive: {
    backgroundColor: "white",
    color: textSelectionMain["color"]["inactive"],
    ...buttonTextBox
  },
  buttonTextExplanationInactive: {
    ...buttonTextExplanation
  },
  buttonTextExplanationActive: {
    ...buttonTextExplanation,
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
  let showResult = ShowResult.useContainer();

  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)

  let CardWithPosition = (props: { component: JSX.Element }) => {
    return(
      <Grid item md={3} sm={6} xs={12} className={classes.buttonTextContainer}>
        {props.component}
      </Grid>
    )
  }

  let nextAction: (arg: number) => void;
  if (activeStep.isSecondLast(documentQueue.self.length)) {
    nextAction = arg => {
      showResult.show()
      activeStep.increment(arg)
    }
  } else if (activeStep.isLast(documentQueue.self.length)) {
    nextAction = arg => {}
  } else {
    nextAction = arg => {
      activeStep.increment(arg)
    }
  }


  return (
    <Grid container className={classes.root} >
        {activeDocument["options"].map((label, index) => {

          let CardWithSelection: JSX.Element;
          if (!answers.getAnswersById(activeDocument.identifier).includes(label)) {
            CardWithSelection =
              <div className={classes.buttonCard}
                onClick={() => {
                  answers.add(activeDocument.identifier, activeDocument.multiple_choice, label)
                  documentQueue.add(activeStep.self, label, activeDocument.multiple_choice)
                  nextAction(documentQueue.self.length)
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
              <div className={classes.buttonCard}
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
