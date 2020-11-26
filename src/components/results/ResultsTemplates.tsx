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
    marginTop: "16px"
  }
}));

export default function ResultsTemplates() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let list = getResultTemplates(resultSpecs.self.non_default_identifier)

  return (
    <div className={classes.infoSpace}>
      <span className={classes.subHeader}>Formulierungshilfen und Ausfühllhinweise:</span>
      <span className={classes.infoText}>
        Beratungen und Unterstützung für Ihre spezielle Fallkonstellation finden Sie außerdem hier:
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <div className={classes.templateItem}>
                <span><a href={label.template}>Vorlage</a></span>
                <span><a href={label.help}>Ausfüllhinweise</a></span>
              </div>
            )
          }):
          <></>
        }
      </span>
    </div>
  );
}
