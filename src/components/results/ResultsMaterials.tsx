import React, { useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { Answers } from "states/answerState"
import { getResultFeature, getResultMaterials } from "data/Interface"
import { ResultFeatureType } from "data/customTypes"
import downloadIcon from "assets/icons/Dokument.svg"

const useStyles = makeStyles((theme) => ({
  infoSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "750px",
    marginBottom: "50px"
  },
  subHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    marginBottom: "32px",
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px"
  },
  materialsItem: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    marginBottom: "18px"
  },
  materialsList:{
    marginTop: "16px",
    paddingLeft: "0px"
  },
  title: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
  },
  downloadIcon: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
    marginRight: "15px",
  },
  downloadContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  downloadLink: {
    textDecoration: "none"
  },
  downloadText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    color: "black"
  }
}));

export default function ResultsMaterials() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let materials = getResultMaterials(resultSpecs.self.non_default_identifier)

  return (
    <div className={classes.infoSpace}>
      <span className={classes.subHeader}>Informationsmaterial:</span>
      <span className={classes.infoText}>
        Weitere Informationen zu Ihren Fragen gibt es hier:
      </span>
      <ul className={classes.materialsList}>
        {
          (materials !== null)?
          materials.map((label, index) => {
            return(
              <li className={classes.materialsItem} key={index}>
                <div className={classes.downloadContainer}>
                  <a href={label.link}
                    className={classes.downloadLink}
                  >
                    <img className={classes.downloadIcon}
                      src={downloadIcon}
                      alt={"empty"}
                    />
                    <span className={classes.downloadText}>Download {label.name}</span>
                  </a>
                </div>
              </li>
            )
          }):
          null
        }
      </ul>
    </div>
  );
}
