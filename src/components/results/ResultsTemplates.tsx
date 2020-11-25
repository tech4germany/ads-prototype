import React, { useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { getResultFeature, getResultTemplates } from "data/Interface"
import { ResultFeatureType } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  infoSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "750px",
    paddingBottom: "2.3vh",
  },
  subHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    marginBottom: "32px",
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    marginBottom: "50px"
  },
  templateItem: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px"
  }
}));

export default function ResultsTemplates() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let template = getResultTemplates(resultSpecs.self.identifier)

  return (
    <div className={classes.infoSpace}>
      <span className={classes.subHeader}>Formulierungshilfen und Ausfühllhinweise:</span>
      <span className={classes.infoText}>
        Beratungen und Unterstützung für Ihre spezielle Fallkonstellation finden Sie außerdem hier:
        {
          template !== null?
              <div className={classes.templateItem}>
                <span>{template.template}</span>
                <span>{template.help}</span>
              </div>
          :
          <></>
        }
      </span>
    </div>
  );
}
