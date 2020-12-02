import React, { useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { Answers } from "states/answerState"
import { getResultFeature, getResultMaterials } from "data/Interface"
import { ResultFeatureType } from "data/customTypes"

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
    marginTop: "16px",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px"
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
        Beratungen und Unterstützung für Ihre spezielle Fallkonstellation finden Sie außerdem hier:
      </span>
        {
          (materials !== null)?
          materials.map((label, index) => {
            return(
              <div className={classes.materialsItem}>
                <span>{label.name}</span>
                <span><a href={label.link}>Link zum Download</a></span>
              </div>
            )
          }):
          null
        }
    </div>
  );
}
