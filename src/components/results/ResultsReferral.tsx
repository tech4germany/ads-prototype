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
    fontSize: "30px",
    margin: "0px"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    margin: "0px"
  },
  referralsList:{
    marginTop: "16px",
    marginBottom: "0px",
    paddingLeft: "0px"
  },
  referralItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px"
  },
  contentElementText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
  },
  contentWebsiteText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textDecoration: "none",
    color: "black",
    lineHeight: "32px",
    '@media (hover: hover)': {
      "&:hover": {
        borderBottom: "3px solid #fef3df",
        fontSize: "20px"
      },
      "&:focus": {
        borderBottom: "3px solid #fef3df",
        fontSize: "20px"
      }
    }
  },
  websiteButton: {
      display: "flex",
      flexDirection: "row",
      border: "solid 0px",
      backgroundColor: "inherit",
      padding: "0px"
  }
}));

export default function ResultReferrals() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let list = getResultReferrals(resultSpecs.self.non_default_identifier)

  return (
    <section className={classes.referralsBox} aria-label="Anlaufstellen">

      <header className={classes.subHeaderContainer} aria-hidden="true">
        <h2 className={classes.subHeaderText}>Anlaufstellen:</h2>
      </header>

      <p className={classes.infoText}>
        Beratungen und Unterstützung für Ihre spezielle Fallkonstellation finden Sie außerdem hier:
      </p>

      <ul className={classes.referralsList}>
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <li className={classes.referralItem} key={index}>
                <span className={classes.contentElementText}>{label.name}</span>
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
                  <div className={classes.websiteButton}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Website der Verweisstelle öffnen"
                      aria-label="Website der Verweisstelle öffnen"
                      href={label.website}
                      className={classes.contentWebsiteText}>
                      Zur Website
                    </a>
                  </div>:
                  null
                }
              </li>
            )
          }):
          null
        }
      </ul>
    </section>
  );
}
