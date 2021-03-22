import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveNode } from "states/activeNodeState"
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
    justifyContent: "flex-start",
    width: "354px",
    height: "132px",
    marginBottom: "15px",
    marginTop: "0px",
    marginLeft: "11px",
    marginRight: "11px",
    "@media (max-width: 375px)": {
      width: "254px",
    }
  },
  itemContent: {
    width: "100%"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "100%",
    position: "relative"
  },
  selectionButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "0px",
    paddingRight: "78px",
    border: "solid 0px",
    cursor: "pointer",
    backgroundColor: "inherit",
    '@media (hover: hover)': {
      "&:hover": {
        backgroundColor: colorMain["100"],
        textDecoration: "underline",
      },
      "&:focus": {
        backgroundColor: colorMain["100"],
        textDecoration: "underline",
      }
    }
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    marginLeft: "20px",
    marginRight: "20px",
    "@media (max-width: 375px)": {
      minWidth: "20px",
      marginLeft: "0px",
      marginRight: "0px"
    }
  },
  icon: {
    width: "60px",
    height: "60px",
    "@media (max-width: 375px)": {
      display: "none",
    }
  },
  iconContainerPlaceholder: {
    width: "20px",
    "@media (max-width: 375px)": {
      width: "20px",
      marginLeft: "0px",
      marginRight: "0px"
    }
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    hyphens: "auto",
    textAlign: "left",
  },
  infoIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  infoButton: {
    backgroundColor: colorMain["115"],
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "68px",
    height: "24px",
    marginRight: "10px",
    marginTop: "10px",
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
  }
}));

export default function JourneySelection() {
  const classes = useStyles();
  let infoDisplay = ShowInfo.useContainer()
  let answers = Answers.useContainer()
  let showResult = ShowResult.useContainer();
  let activeNode = ActiveNode.useContainer()

  useEffect(() => {
    console.log("answer_object: ", answers.self)
  }, [answers])

  // reset focus on return from infosection
  useEffect(() => {
    let previous_choice = infoDisplay.retrievePreviousLabel()
    if (previous_choice){
      const element = document.getElementById("info-selector-" + previous_choice)
      if (element) {element.focus()}
    }
  }, [infoDisplay])


  let handleClickSelection = (e: React.SyntheticEvent, label: string) => {
    if (!(e instanceof KeyboardEvent)) {

      // add selected answers to answer dictionary
      answers.add(activeNode.getStepIdentifier(), label)

      // move forward in tree
      if (activeNode.isLeaf(label, answers.isAgg())) { showResult.show() }
      else { activeNode.move_forward(label) }

    }
  }

  let handleClickInfo = (e: React.SyntheticEvent, label: string) => {
    e.stopPropagation()
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
          {activeNode.getEdges().map((label, index) => {
            const infoTextisSet = activeNode.getEdgeFeatureByLabel(label, EdgeDetail.info_text)
            const selectionIcon = provideSelectionIcon(activeNode.getEdgeFeatureByLabel(label, EdgeDetail.icon))
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
                      onClick={(event) => handleClickSelection(event, label)}
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
