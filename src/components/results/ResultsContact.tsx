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
    paddingBottom: "4vh"
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "344px",
    backgroundColor: "white"
  },
  contactContent: {
    height: "100%",
    maxWidth: "333px",
    minWidth: "300px"
  },
  contactHeaderContainer: {
    marginTop: "20px",
    marginBottom: "8px",
    marginLeft: "38px",
    marginRight: "38px"
  },
  contactHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px"
  },
  contactInfoContainer: {
    marginBottom: "20px",
    marginLeft: "38px",
    marginRight: "38px",
    maxWidth: "268px"
  },
  contactInfoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "22px"
  },
  contactStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    minHeight: "100px",
    width: "6px",
    minWidth: "6px"
  }
}));

export default function ResultContact() {
  const classes = useStyles();

  return (
    <div className={classes.contactBox}>
      <div className={classes.contactContainer}>
        <div className={classes.contactContent}>
          <div className={classes.contactHeaderContainer}>
            <span className={classes.contactHeaderText}>Kontakt zu uns</span>
          </div>
          <div className={classes.contactInfoContainer}>
            <span className={classes.contactInfoText}>Email: <a href={"email:beratung@ads.bund.de"}>beratung@ads.bund.de</a></span><br></br>
            <span className={classes.contactInfoText}><a href={"https://www.antidiskriminierungsstelle.de/DE/Beratung/Beratung_Moeglichkeiten/Formular/Formular1_node.html"}>Kontaktformular</a></span>
          </div>
        </div>
        <div className={classes.contactStripe}></div>
      </div>
    </div>
  );
}
