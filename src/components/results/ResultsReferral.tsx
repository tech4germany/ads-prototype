import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getResultReferrals } from "data/Interface"
import { ResultSpecsLayout } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  referralsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "50px"
  },
  subHeaderContainer: {
    marginBottom: "32px",
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    margin: "0px",
    fontWeight: "normal"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    margin: "0px 0px 16px 0px"
  },
  referralsList:{
    paddingLeft: "0px",
  },
  referralItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px"
  },
  contentElementText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    hyphens: "auto"
  },
  contentWebsiteLink: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textDecoration: "none",
    color: "black",
    lineHeight: "32px",
    '@media (hover: hover)': {
      "&:hover": {
        textDecoration: "underline",
        textDecorationColor: "black"
      },
      "&:focus": {
        textDecoration: "underline",
        textDecorationColor: "black"
      }
    }
  }
}));

interface Props {
  result: ResultSpecsLayout;
}

export default function ResultReferrals(props: Props) {
  const classes = useStyles()
  let list = getResultReferrals(props.result.non_default_identifier)

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
                  <div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Website der Verweisstelle öffnen"
                      aria-label="Website der Verweisstelle öffnen"
                      href={label.website}
                      className={classes.contentWebsiteLink}>
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
