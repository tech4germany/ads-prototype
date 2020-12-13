import React, { useState, useLayoutEffect, MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
    minWidth: "285px",
    height: "130px",
    marginBottom: "15px",
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "22px",
  },
  itemContent: {
    minWidth: "285px",
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
      }
    },
    "&:focus": {
      backgroundColor: colorMain["100"],
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
  infoButtonContainer: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    border: "solid 0px",
    width: "100%",
    padding: "0px",
    cursor: "pointer",
  },
  infoIcon: {
    width: "68px",
    marginTop: "10px",
    marginRight: "10px",
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
      <div>
        <ul className={classes.selectionList}>
          {documentQueue.getEdges(activeStep.self).map((label, index) => {

            const infoTextisSet = documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.info_text)
            const selectionIcon = provideSelectionIcon(documentQueue.getEdgeFeatureByLabel(activeStep.self, label, EdgeDetail.icon))

            return (
              <li className={classes.itemContainer} key={index}>

                <div className={classes.itemContent}
                  onMouseOver={() => setDisplayHover(label)}
                  onFocus={() => setDisplayHover(label)}
                  onMouseOut={() => setDisplayHover(null)}
                >
                  <div className={classes.buttonGroup}>

                    <button tabIndex={0} className={classes.button} type="submit"
                      title="Auswahl bestätigen"

                      onClick={() => {
                        answers.add(activeDocument.identifier, label)
                        documentQueue.update(UpdateType.add, activeStep.self, label)
                        activeStep.increment(documentQueue.getVisibilityQueue())
                      }}
                      onMouseDown={handleClick}
                      onKeyUp={(e) => {if (e.keyCode === 13 || e.keyCode === 32) {handleClick(e)}}}
                    >

                        {
                          selectionIcon?
                          <div className={classes.iconContainer}>
                            <img className={classes.icon} src={selectionIcon} alt={"Icon repräsentiert das Auswahlelement"}/>
                          </div>:
                          <div className={classes.iconContainerPlaceholder}></div>
                        }


                      <div className={classes.textContainer}>
                        <p className={classes.text}>
                          {wrap(label)}
                        </p>
                      </div>

                    </button>

                    <div className={classes.infoIconContainer}>
                      {
                        infoTextisSet?
                        <div>
                          <button
                            title="Informationstext anzeigen"
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
