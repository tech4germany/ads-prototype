import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  contactBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  contactContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "344px",
    minWidth: "255px",
    width: "100%",
  },
  contactContent: {
    height: "100%",
    width: "100%",
  },
  contactHeaderContainer: {
    marginTop: "20px",
    marginBottom: "8px",
    marginLeft: "38px",
    marginRight: "38px"
  },
  contactHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    margin: "0px",
    fontWeight: "normal"
  },
  contactInfoContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    marginLeft: "38px",
    marginRight: "38px",
    maxWidth: "268px"
  },
  contactInfoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    margin: "0px"
  },
  contactFormularText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "16px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textDecoration: "none",
    color: "black",
    lineHeight: "22px",
    '@media (hover: hover)': {
      "&:hover": {
        borderBottom: "3px solid #fff",
        fontSize: "18px",
      },
      "&:focus": {
        borderBottom: "3px solid #fff",
        fontSize: "18px",
      }
    }
  },
  contactStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    minHeight: "100px",
    width: "6px",
    minWidth: "6px"
  },
  contactSpacer: {
    height: "24px"
  },
  contactLink: {
    display: "flex",
    flexDirection: "row",
    border: "solid 0px",
    backgroundColor: "inherit",
    padding: "0px"
  },
  emailLink: {
    color: "black",
    '@media (hover: hover)': {
      "&:hover": {
        textDecoration: "none",
        fontFamily: "BundesSansWeb-Bold",
      }
    },
    "&:focus": {
      textDecoration: "none",
      fontFamily: "BundesSansWeb-Bold",
    }
  }
}));

export default function ResultContact() {
  const classes = useStyles();

  return (
    <section className={classes.contactBox} aria-label="Informationen für Kontaktaufnahme">
      <div className={classes.contactContainer}>
        <div className={classes.contactContent}>
          <header className={classes.contactHeaderContainer} aria-hidden="true">
            <h3 className={classes.contactHeaderText}>Kontakt zu uns</h3>
          </header>
          <div className={classes.contactInfoContainer}>
            <p className={classes.contactInfoText}>Für eine Beratung oder allgemeine Fragen nutzen Sie unser Kontaktformular oder schreiben eine Email an:&nbsp;
              <a
                className={classes.emailLink}
                href={"mailto:beratung@ads.bund.de"}
                aria-label="Email an die Antidiskriminierungsstelle schreiben"
              >
                beratung@ads.bund.de
              </a>
            </p>
            <span className={classes.contactSpacer}></span>
            <div className={classes.contactLink}>
              <a
                className={classes.contactFormularText}
                target="_blank"
                rel="noopener noreferrer"
                title="Zum Kontaktformular"
                aria-label="Kontaktformular der Antidiskriminierungsstelle öffnen"
                tabIndex={0}
                href={"https://www.antidiskriminierungsstelle.de/DE/Beratung/Beratung_Moeglichkeiten/Formular/Formular1_node.html"}
                >Zum Kontaktformular
              </a>
            </div>
          </div>
        </div>
        <canvas className={classes.contactStripe}></canvas>
      </div>
    </section>
  );
}
