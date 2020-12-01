import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  contactSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingBottom: "4vh"
  },
  contactHeader: {
    marginTop: "20px",
    marginBottom: "8px",
    marginLeft: "38px",
    marginRight: "38px",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px"
  },
  contactInfo: {
    marginBottom: "20px",
    marginLeft: "38px",
    marginRight: "38px",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "22px",
    maxWidth: "268px"
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
    maxWidth: "333px"
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
    <div className={classes.contactSpace}>
      <div className={classes.contactContainer}>
        <div className={classes.contactContent}>
          <div className={classes.contactHeader}>
            <span>Kontakt zu uns</span>
          </div>
          <div className={classes.contactInfo}>
            Mo 13-15, Mi und Fr 9-12 bieten wir eine juristische Erstberatung an.<br></br>
            <span>Tel.: <a href={"tel:030 18555-1855"}>030 18555-1855</a></span><br></br>
              <br></br>
            <span>Email: <a href={"email:beratung@ads.bund.de"}>beratung@ads.bund.de</a></span><br></br>
            <span><a href={"https://www.antidiskriminierungsstelle.de/DE/Beratung/Beratung_Moeglichkeiten/Formular/Formular1_node.html"}>Kontaktformular</a></span>
          </div>
        </div>
        <div className={classes.contactStripe}></div>
      </div>
    </div>
  );
}
