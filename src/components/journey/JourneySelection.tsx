import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowResult } from "states/showResultState"
import { ShowInfo } from "states/showInfoState"
import { EdgeDetail } from "data/customTypes"
import { provideSelectionIcon } from "assets/icons/ProvideIcons"
import JourneySelectionInfo from "components/journey/JourneySelectionInfo"

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
  selectionButton: {
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
      },
      "&:focus": {
        textDecoration: "underline",
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
    "@media (max-width: 414px)": {
      minWidth: "20px",
      marginLeft: "0px",
      marginRight: "0px"
    }
  },
  iconContainerPlaceholder: {
    minWidth: "60px",
    "@media (max-width: 414px)": {
      minWidth: "20px",
    }
  },
  icon: {
    width: "60px",
    height: "60px",
    "@media (max-width: 414px)": {
      display: "none",
    }
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    maxWidth: "200px",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    hyphens: "auto",
    textAlign: "left",
    "@media (max-width: 414px)": {
      maxWidth: "160px",
    }
  },
  infoIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute"
  },
  infoButton: {
    backgroundColor: colorMain["115"],
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "68px",
    height: "24px",
    margin: "10px",
    borderRadius: "30px",
    cursor: "pointer",
    border: "solid 0px",
    '@media (hover: hover)': {
      "&:hover": {
        textDecoration: "underline",
        boxShadow: "inset 0 0 0 1px currentColor"
      },
      "&:focus": {
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
  let showResult = ShowResult.useContainer();
  let activeDocument = documentQueue.self[activeStep.self]

  useEffect(() => {
    console.log("answer_object: ", answers.self)
  }, [answers])


  useEffect(() => {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
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

  useEffect(() => {
    let previous_choice = infoDisplay.retrievePreviousLabel()
    if (previous_choice){
      const element = document.getElementById("info-selector-" + previous_choice)
      if (element) {element.focus()}
    }
  }, [infoDisplay])

  let updateToNextStep = (label: string) => {

    // add selected answers to answer dictionary
    answers.add(activeDocument.identifier, label)

    // check if we have reached an end node
    if (documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.end_node) === "true") {
      showResult.show()

    } else {

      // update document queue with selected answer
      documentQueue.move_forward(activeStep.self, label)

      // update active step
      activeStep.increment(documentQueue.getVisibilityQueue())
    }
  }

  let handleClickSelection = (e: React.SyntheticEvent, label: string) => {
    if (!(e instanceof KeyboardEvent)) {
      updateToNextStep(label)
    }
  }

  let handleKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.keyCode === 13) {
      updateToNextStep(label)
    }
  }

  let handleClickInfo = (e: React.SyntheticEvent, label: string) => {
    e.stopPropagation()
    updateInfoDisplay(label)
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
      <section aria-label="Auswahlbereich möglicher Antworten">
        <ol className={classes.selectionList} id="answer-list">
          {documentQueue.getEdges(activeStep.self).map((label, index) => {
            const infoTextisSet = documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.info_text)
            const selectionIcon = provideSelectionIcon(documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon))
            return (
              <li className={classes.itemContainer} key={index}>
                <div className={classes.itemContent}>
                  <div className={classes.buttonGroup}>
                    <button
                      id={label}
                      className={classes.selectionButton}
                      title={label + " auswählen"}
                      aria-label={label + " auswählen"}
                      aria-controls="question-header"
                      onKeyDown={(event) => handleKeyDown(event, label)}
                      onClick={(event) => handleClickSelection(event, label)}
                      onMouseOver={() => setDisplayHover(label)}
                      onMouseOut={() => setDisplayHover(null)}
                    >
                      {
                        selectionIcon?
                        <span className={classes.iconContainer} aria-hidden="true">
                          <img className={classes.icon} src={selectionIcon} alt={""}/>
                        </span>:
                        <span className={classes.iconContainerPlaceholder}></span>
                      }

                      <span className={classes.textContainer}>
                          {label}
                      </span>

                    </button>
                    <div className={classes.infoIconContainer}>
                      {
                        infoTextisSet?
                          <button
                            id={"info-selector-" + label}
                            className={classes.infoButton}
                            title={"Info zu " + label + " anzeigen"}
                            aria-label={"Info zu " + label + " anzeigen"}
                            aria-haspopup="dialog"
                            onClick={(event) => handleClickInfo(event, label)}
                            onKeyDown={(event) => handleKeyDownInfo(event, label)}
                          >
                            <span className={classes.infoText}>Info</span>
                          </button>: null
                      }
                    </div>
                  </div>
                </div>
                <canvas className={classes.buttonStripe}></canvas>
              </li>
            );
          })}
      </ol>
    </section>
    )
  }
}
