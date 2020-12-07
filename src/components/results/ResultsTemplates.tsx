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
  templateItem: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px"
  },
  templateList:{
    marginTop: "16px",
    paddingLeft: "0px"
  }
}));

export default function ResultsTemplates() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let list = getResultTemplates(resultSpecs.self.non_default_identifier)

  return (
    <div className={classes.infoSpace}>
      <span className={classes.subHeader}>Formulierungshilfen und Ausfüllhinweise:</span>
      <span className={classes.infoText}>
        Die Vorlage hier können Sie ausfüllen und abschicken, um Ihre Rechte geltend zu machen:
      </span>
      <ul className={classes.templateList}>
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <li className={classes.templateItem} key={index}>
                <span><a href={label.template}>Vorlage</a></span>
                <span><a href={label.help}>Ausfüllhinweise</a></span>
              </li>
            )
          }):
          null
        }
      </ul>
    </div>
  );
}
