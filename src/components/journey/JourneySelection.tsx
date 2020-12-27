import React, { useState, useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowInfo } from "states/showInfoState"
import { EdgeDetail, UpdateType } from "data/customTypes"
import { provideSelectionIcon } from "assets/icons/ProvideIcons"
import JourneySelectionInfo from "components/journey/JourneySelectionInfo"
import clsx from 'clsx'

const wrap = (s: string) => s.replace(
        /(?![^\n]{1,20}$)([^\n]{1,20})\//g, '$1\/\n',
    )

const useStyles = makeStyles((theme) => ({
  selectionList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingLeft: "0px",
    marginTop: "0px"
  },
  itemContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "360px",
    minWidth: "255px",
    height: "130px",
    marginBottom: "15px",
    marginTop: "0px",
    marginLeft: "11px",
    marginRight: "11px"
  },
  itemContent: {
    minWidth: "255px",
    height: "100%"
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "100%",
    width: "354px",
    padding: "0px",
    border: "solid 0px",
    cursor: "pointer",
    backgroundColor: "inherit",
    '@media (hover: hover)': {
      "&:hover": {
        backgroundColor: colorMain["100"],
        textDecoration: "underline",
        boxShadow: "inset 0 0 0 1px currentColor"
      },
      "&:focus": {
        textDecoration: "underline",
        boxShadow: "inset 0 0 0 1px currentColor"
      }
    }
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: "60px",
    height: "100%",
    marginLeft: "20px",
    marginRight: "20px",
  },
  iconContainerPlaceholder: {
    minWidth: "60px",
  },
  icon: {
    width: "60px",
    height: "60px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    maxWidth: "200px"
  },
  text: {
    whiteSpace: "pre-wrap",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    textAlign: "left"
  },
  infoIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute"
  },
  infoIcon: {
    backgroundColor: colorMain["100"],
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "68px",
    height: "30px",
    borderRadius: "30px",
    margin: "10px",
    cursor: "pointer"
  },
  infoIconHover: {
    backgroundColor: colorMain["115"],
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "68px",
    height: "30px",
    borderRadius: "30px",
    margin: "10px",
    cursor: "pointer",
    '@media (hover: hover)': {
      "&:hover": {
        backgroundColor: colorMain["115"],
        textDecoration: "underline",
        boxShadow: "inset 0 0 0 1px currentColor"
      },
      "&:focus": {
        backgroundColor: colorMain["115"],
        textDecoration: "underline",
        boxShadow: "inset 0 0 0 1px currentColor"
      }
    }
  },
  infoText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "15px",
  },
  buttonStripe: {
    backgroundColor: colorMain["115"],
    display: "flex",
    height: "100%",
    width: "6px",
    minWidth: "6px"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: "100%"
  },
  srOnly: {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  }
}));

export default function JourneySelection() {
  const classes = useStyles();
  let [displayHover, setDisplayHover] = useState<string | null>(null)
  let infoDisplay = ShowInfo.useContainer()
  let answers = Answers.useContainer()
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let activeDocument = documentQueue.self[activeStep.self]

  useLayoutEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      if (displayHover !== null ) {
        const element = document.getElementById(displayHover)
        if (element) {element.focus()}
      } else {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    }
  }, [displayHover])

  useLayoutEffect(() => {
    let previous_choice = infoDisplay.retrievePreviousLabel()
    if (previous_choice){
      const element = document.getElementById(previous_choice)
      if (element) {element.focus()}
    }
  }, [infoDisplay])

  let handleKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.keyCode === 13) {
      answers.add(activeDocument.identifier, label)
      documentQueue.update(UpdateType.add, activeStep.self, label)
      activeStep.increment(documentQueue.getVisibilityQueue())
    }
  }

  let handleKeyDownInfo = (e: React.KeyboardEvent, label: string) => {
    if (e.keyCode === 13) {
      e.stopPropagation()
      updateInfoDisplay(label)
    }
  }

  const updateInfoDisplay = (label: string | null) => {
    infoDisplay.show(label)
  }

  if (infoDisplay.lastIsSet()) {
    return (
      <JourneySelectionInfo />
    )
  }

  else {
    return (
      <div>
        <ul
          className={classes.selectionList}
          role="list"
        >
          {documentQueue.getEdges(activeStep.self).map((label, index) => {

            const infoTextisSet = documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.info_text)
            const selectionIcon = provideSelectionIcon(documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon))

            return (
              <li className={classes.itemContainer} key={index}>
                <div className={classes.itemContent}
                  onMouseOver={() => setDisplayHover(label)}
                  onMouseOut={() => setDisplayHover(null)}
                >
                  <div className={classes.buttonGroup}>
                    <div className={classes.button}
                      role="listitem button"
                      id={label}
                      tabIndex={0}
                      title="Auswahl bestätigen"
                      onKeyDown={(event) => handleKeyDown(event, label)}
                      onClick={() => {
                        answers.add(activeDocument.identifier, label)
                        documentQueue.update(UpdateType.add, activeStep.self, label)
                        activeStep.increment(documentQueue.getVisibilityQueue())
                      }}
                    >
                        {
                          selectionIcon?
                          <span className={classes.iconContainer}>
                            <img className={classes.icon} src={selectionIcon}/>
                          </span>:
                          <span className={classes.iconContainerPlaceholder}></span>
                        }

                      <span className={classes.textContainer}>
                        <p className={classes.text}>
                          {wrap(label)}
                        </p>
                      </span>

                    </div>

                    <div className={classes.infoIconContainer}>
                      {
                        infoTextisSet?
                          <div
                            title="Informationstext anzeigen"
                            role="button"
                            tabIndex={0}
                            className={classes.infoIconHover}
                            onClick={(event) => {
                              event.stopPropagation()
                              updateInfoDisplay(label)
                            }}
                            onKeyDown={(event) => handleKeyDownInfo(event, label)}
                          >
                            <span aria-label={"Info zu " + label} className={classes.infoText}>Info</span>
                          </div>: null
                      }
                    </div>
                  </div>
                </div>
                <div className={classes.buttonStripe}></div>
              </li>
            );
          })}
      </ul>
    </div>
    )
  }
}
