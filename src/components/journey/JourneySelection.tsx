import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import  Grid from '@material-ui/core/Grid';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { EdgeDetail, UpdateType } from "data/customTypes"
import infoIcon from 'assets/icons/information.png'
import { provideSelectionIcon } from "assets/icons/ProvideIcons"
import JourneySelectionInfo from "components/journey/JourneySelectionInfo"

const wrap = (s: string) => s.replace(
        /(?![^\n]{1,20}$)([^\n]{1,20})\//g, '$1\/\n'
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
    marginRight: "22px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "360px",
    minWidth: "300px",
    cursor: "pointer",
    height: "130px",
    backgroundColor: "white"
  },
  buttonContent: {
    width: "354px",
    minWidth: "294px",
    maxWidth: "354px",
    height: "100%",
    color: textSelectionMain["color"]["inactive"],
    "&:hover": {
      backgroundColor: colorMain["115"],
      color: textSelectionMain["color"]["active"],
    }
  },
  buttonCard: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    minWidth: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "20px",
    marginRight: "20px",
  },
  icon: {
    display: "block",
    width: "60px",
    height: "60px",
  },
  icon_hover: {
    width: "60px",
    height: "60px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  text: {
    whiteSpace: "pre-wrap",
    maxWidth:"189px",
    fontFamily: textSelectionMain["fontFamily"],
    fontSize: textSelectionMain["fontSize"],
  },
  infoIconContainer: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  infoIcon: {
    width: "30px",
    height: "30px",
    marginTop: "10px",
    marginRight: "10px",
  },

  buttonStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    height: "100%",
    width: "6px",
    minWidth: "6px"
  }
}));

export default function JourneySelection() {
  const classes = useStyles();
  let [infoDisplay, setInfoDisplay] = useState<string | null>(null)
  let [displayHover, setDisplayHover] = useState<string | null>(null)
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeDocument = documentQueue.self[activeStep.self]

  useEffect(() => {}, [displayHover])

  const updateInfoDisplay = (label: string | null) => {
    setInfoDisplay(label)
  }

  if (infoDisplay) {
    return (
      <JourneySelectionInfo infoDisplay={infoDisplay} updateInfoDisplay={updateInfoDisplay} />
    )
  } else {
    return (
      <Grid container className={classes.root}>
        {documentQueue.getEdges(activeStep.self).map((label, index) => {
          const infoTextisSet = documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.info_text)
          const selectionIcon = provideSelectionIcon(documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon))
          const selectionIcon_hover = provideSelectionIcon(documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon_hover))
          return (
              <div className={classes.buttonContainer}>
                <div className={classes.buttonContent}
                  onMouseOver={() => setDisplayHover(label)}
                  onMouseOut={() => setDisplayHover(null)}
                >
                  <div className={classes.buttonCard}
                    onClick={() => {
                      answers.add(activeDocument.identifier, label)
                      documentQueue.update(UpdateType.add, activeStep.self, label)
                      activeStep.increment(documentQueue.getVisibilityQueue())
                    }}>

                    <div className={classes.iconContainer}>
                      {
                        selectionIcon && selectionIcon_hover?
                        <>
                          {
                            displayHover === label?
                            <img className={classes.icon_hover} src={selectionIcon_hover} alt={"empty"}/>:
                            <img className={classes.icon} src={selectionIcon} alt={"empty"}/>
                          }
                        </>:
                        null
                      }
                    </div>

                    <div className={classes.textContainer}>
                      <span className={classes.text}>
                        {wrap(label)}
                      </span>
                    </div>

                    <div className={classes.infoIconContainer}>
                      <div className={classes.infoIconContainer}>
                        {
                          infoTextisSet?
                          <img className={classes.infoIcon}
                          src={infoIcon}
                          alt={"empty"}
                          onClick={(event) => {
                            event.stopPropagation()
                            updateInfoDisplay(label)
                          }}/>:
                          null
                        }
                      </div>
                    </div>


                  </div>
              </div>
              <div className={classes.buttonStripe}></div>
            </div>
        );
      })}
    </Grid>
    )
  }
}
