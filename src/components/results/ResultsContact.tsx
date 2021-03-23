import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  contactBox: {
    flex: "1 1 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "white",
    position: "relative"
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "20px 30px 22.5px 30px"
  },
  contactHeaderContainer: {
    marginBottom: "8px"
  },
  contactHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    margin: "0px",
    fontWeight: "normal",
    hyphens: "auto"
  },
  contactInfoContainer: {
    marginBottom: "8px"
  },
  contactInfoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "22px",
    margin: "0px"
  },
  emailLink: {
    color: "black",
    hyphens: "auto",
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
  },
  contactLink: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "16px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textDecoration: "none",
    color: "black",
    lineHeight: "22px",
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
  },
  contactStripe: {
    backgroundColor: colorMain["115"],
    height: "100%",
    width: "6px",
    position: "absolute",
    right: "0px"
  }
}));

export default function ResultContact() {
  const classes = useStyles();

  return (
    <section className={classes.contactBox} aria-label="Informationen für Kontaktaufnahme">

      <div className={classes.contactContainer}>

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
              beratung&shy;@ads.bund.de
            </a>
          </p>
        </div>

        <div>
          <a
            className={classes.contactLink}
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
      <canvas className={classes.contactStripe}></canvas>
    </section>
  );
}
