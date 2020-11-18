import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import  Grid from '@material-ui/core/Grid';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { EdgeDetail, UpdateType } from "data/customTypes"
import infoIcon from 'assets/icons/information.png';

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
    marginBottom: "15px",
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "270px",
    cursor: "pointer",
    height: "210px",
    backgroundColor: "white"
  },
  buttonContainerInfo: {
    width: "555px",
  },
  buttonContent: {
    width: "264px",
    height: "100%",
    color: textSelectionMain["color"]["inactive"],
    fontFamily: textSelectionMain["fontFamily"],
    fontSize: textSelectionMain["fontSize"],
    "&:hover": {
      backgroundColor: colorMain["115"],
      color: textSelectionMain["color"]["active"],
    }
  },
  buttonContentInfo: {
    width: "549px",
  },
  buttonCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: "90px",
    height: "90px",
    marginTop: "28px"
  },
  infoIconContainer: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconContainerPlaceholder: {
    width: "30%",
  },
  infoIcon: {
    width: "30px",
    height: "30px",
    marginTop: "10px",
    marginRight: "10px",
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
  let [infoDisplay, setInfoDisplay] = useState<String>()
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeDocument = documentQueue.self[activeStep.self]

  return (
    <Grid container className={classes.root} >
      {documentQueue.getEdges(activeStep.self).map((label, index) => {

        return (

            <div className={clsx(classes.buttonContainer, {
              [classes.buttonContainerInfo]: infoDisplay === label
            })}>

              <div
              className={clsx(classes.buttonContent, {
                [classes.buttonContentInfo]: infoDisplay === label
              })}>

                {
                  infoDisplay === label?
                  <div
                    onClick={() => {setInfoDisplay("")}}
                  >
                    hier finden sie einen informationstext
                  </div>
                  :
                  <div className={classes.buttonCard}
                    onClick={() => {
                      answers.add(activeDocument.identifier, label)
                      documentQueue.update(UpdateType.add, activeStep.self, label)
                      activeStep.increment(documentQueue.getVisibilityQueue())
                    }}
                  >

                    <div className={classes.iconContainer}>
                        <div className={classes.iconContainerPlaceholder}></div>

                        <img className={classes.icon}
                        src={require('/assets/icons/group.png')}
                        alt={"empty"}/>
                        <div className={classes.infoIconContainer}>
                          <img className={classes.infoIcon}
                          src={infoIcon}
                          alt={"empty"}
                          onClick={(event) => {
                            event.stopPropagation();
                            setInfoDisplay(label);
                          }}/>
                        </div>

                    </div>

                    <div className={classes.buttonText}>
                      {wrap(label)}
                      <div className={classes.buttonTextExplanation}></div>
                    </div>

                </div>
              }

            </div>
            <div className={classes.buttonStripe}></div>
          </div>
      );
    })}
  </Grid>
  )
}
