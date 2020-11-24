import React, { useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { Answers } from "states/answerState"
import { getResultFeature } from "data/Interface"
import { ResultFeatureType } from "data/customTypes"
import { getResultReferrals } from "data/Interface"

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
  referralItem: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px"
  }
}));

export default function ResultReferrals() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let list = getResultReferrals(resultSpecs.self.identifier)

  return (
    <div className={classes.infoSpace}>
      <span className={classes.subHeader}>Anlaufstellen:</span>
      <span className={classes.infoText}>
        Beratungen und Unterstützung für Ihre spezielle Fallkonstellation finden Sie außerdem hier:<br></br>
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <div className={classes.referralItem}>
                <span>{label.name}</span>
                <span>{label.phone}</span>
                <span>{label.email}</span>
                <span>{label.website}</span>
              </div>
            )
          }):
          <></>
        }
      </span>

    </div>
  );
}
