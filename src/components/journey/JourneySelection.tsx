import React, { useState, useLayoutEffect, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain } from "components/styleguide"
import { Answers } from "states/answerState"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowInfo } from "states/showInfoState"
import { EdgeDetail, UpdateType } from "data/customTypes"
import infoIcon from 'assets/icons/info.svg'
import infoIcon_hover from 'assets/icons/info_hover.svg'
import { provideSelectionIcon } from "assets/icons/ProvideIcons"
import JourneySelectionInfo from "components/journey/JourneySelectionInfo"

const wrap = (s: string) => s.replace(
        /(?![^\n]{1,20}$)([^\n]{1,20})\//g, '$1\/\n'
    )

const useStyles = makeStyles((theme) => ({
  selectionBox: {
    minHeight: "42vh"
  },
  selectionList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingLeft: "0px",
    marginTop: "0px"
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
    height: "130px",
    backgroundColor: "white"
  },
  buttonContent: {
    width: "354px",
    minWidth: "294px",
    maxWidth: "354px",
    height: "100%",
  },
  button: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "solid 0px",
    width: "100%",
    padding: "0px",
    cursor: "pointer",
    backgroundColor: "inherit",
    justifyContent: "space-between",
    '@media (hover: hover)': {
      "&:hover": {
        backgroundColor: colorMain["100"],
      }
    }
  },
  iconContainer: {
    minWidth: "30px",
    height: "100%",
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
    justifyContent: "center",
    height: "100%",
    width: "80%"
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
    width: "20%",
    height: "100%"
  },
  infoButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    border: "solid 0px",
    width: "100%",
    backgroundColor: "inherit",
    padding: "0px",
    cursor: "pointer",
  },
  infoIcon: {
    width: "68px",
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
  let [displayHover, setDisplayHover] = useState<string | null>(null)
  let infoDisplay = ShowInfo.useContainer()
  let answers = Answers.useContainer()
  let activeStep = ActiveStep.useContainer()
  let documentQueue = DocumentQueue.useContainer()
  let activeDocument = documentQueue.self[activeStep.self]

  useLayoutEffect(() => {}, [displayHover])

  let handleClick = (e: React.SyntheticEvent) => {if (e) {e.preventDefault()};}

  const updateInfoDisplay = (label: string | null) => {
    infoDisplay.show(label)
  }

  if (infoDisplay.self) {
    return (
      <JourneySelectionInfo />
    )
  } else {
    return (
      <div className={classes.selectionBox}>
        <ul className={classes.selectionList}>
          {documentQueue.getEdges(activeStep.self).map((label, index) => {

            const infoTextisSet = documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.info_text)
            const selectionIcon = provideSelectionIcon(documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon))

            return (
                <li className={classes.buttonContainer} key={index}>

                  <div className={classes.buttonContent}
                    onMouseOver={() => setDisplayHover(label)}
                    onMouseOut={() => setDisplayHover(null)}
                  >
                    <button tabIndex={0} className={classes.button} type="submit"
                      onClick={() => {
                        answers.add(activeDocument.identifier, label)
                        documentQueue.update(UpdateType.add, activeStep.self, label)
                        activeStep.increment(documentQueue.getVisibilityQueue())
                      }}
                      onMouseDown={handleClick}
                      onKeyUp={(e) => {if (e.keyCode === 13 || e.keyCode === 32) {handleClick(e)}}}
                    >

                      <div className={classes.iconContainer}>
                        {
                          selectionIcon?
                          <img className={classes.icon} src={selectionIcon} alt={"Icon repräsentiert das Auswahlelement"}/>:
                          null
                        }
                      </div>

                      <div className={classes.textContainer}>
                        <span className={classes.text}>{wrap(label)}</span>
                      </div>

                      <div className={classes.infoIconContainer}>
                          {
                            infoTextisSet?
                            <div>
                              <button
                                tabIndex={0}
                                className={classes.infoButtonContainer} type="submit"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  updateInfoDisplay(label)
                                }}
                              >
                                {
                                  displayHover === label?
                                  <img className={classes.infoIcon}
                                    src={infoIcon_hover}
                                    alt={"Hier erfahren Sie mehr Informationen zu Ihrer Auswahl"}
                                  />:
                                  <img className={classes.infoIcon}
                                    src={infoIcon}
                                    alt={"Hier erfahren Sie mehr Informationen zu Ihrer Auswahl"}
                                  />
                                }
                              </button>
                            </div>
                            :
                            null
                          }
                      </div>

                    </button>

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
