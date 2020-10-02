import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contactSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    minWidth: "100%",
    paddingBottom: "4vh"
  },
  contactHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "2.1vh",
    paddingBottom: "2.3vh"
  },
  contactInfo: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "2.1vh",
  }
}));

export default function ResultContact() {
  const classes = useStyles();

  return (
    <div className={classes.contactSpace}>

      <div className={classes.contactHeader}>
        Kontakt zu uns!
      </div>
      <div className={classes.contactInfo}>
        Mo 13-15, Mi und Fr 9-12 bieten wir eine juristische Erstberatung an.<br></br>
        Tel.: 030 18555-1855
      </div>

    </div>
  );
}
