import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { getResultReferrals } from "data/Interface"

const useStyles = makeStyles((theme) => ({
  referralsBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "750px",
    marginBottom: "50px"
  },
  subHeaderContainer: {
    marginBottom: "32px"
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
  },
  referralsList:{
    marginTop: "16px",
    paddingLeft: "0px"
  },
  referralItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px"
  },
  title: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
  },
  contentElementText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px"
  }
}));

export default function ResultReferrals() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let list = getResultReferrals(resultSpecs.self.non_default_identifier)

  return (
    <div className={classes.referralsBox}>

      <div className={classes.subHeaderContainer}>
        <span className={classes.subHeaderText}>Anlaufstellen:</span>
      </div>

      <span className={classes.infoText}>
        Beratungen und Unterstützung für Ihre spezielle Fallkonstellation finden Sie außerdem hier:
      </span>

      <ul className={classes.referralsList}>
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <li className={classes.referralItem} key={index}>
                <span className={classes.title}>{label.name}</span>
                {
                  label.phone?
                  <span className={classes.contentElementText}>Telefon: <a href={"tel:"+label.phone}>{label.phone}</a></span>:
                  null
                }
                {
                  label.email?
                  <span className={classes.contentElementText}>Email: <a href={"email:"+label.email}>{label.email}</a></span>:
                  null
                }
                {
                  label.website?
                  <span className={classes.contentElementText}><a href={label.website}>Website</a></span>:
                  null
                }
              </li>
            )
          }):
          null
        }
      </ul>
    </div>
  );
}
