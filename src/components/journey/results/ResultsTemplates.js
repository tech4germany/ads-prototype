import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  templateSpace: {
      backgroundColor: "inherit",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      minWidth: "100%",
      maxHeight: "auto",
  },
  formulierungsHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "2.1vh",
    paddingBottom: "1vh"
  },
  formulierungsLinks: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "2.1vh",
    paddingBottom: "2.3vh"
  },
  formulierungsPaket: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "2.5vh",
    textDecoration: "underline",
    cursor: "pointer"
  }
}));

export default function ResultTemplates(props) {
  const classes = useStyles();

  return (
    <div className={classes.templateSpace}>
      <div className={classes.formulierungsHeader}>
        Formulierungshilfen:
      </div>
      <div className={classes.formulierungsLinks}>
        Ein Leitfaden mit Informationen zu Ihrem Sachverhalt | PDF<br></br>
        Formulierungen zur Geltendmachung von Forderungen | Word<br></br>
        Guide für die Ausfüllung der Formulare | Word<br></br>
      </div>
      <div className={classes.formulierungsPaket}>
        Download Paket
      </div>
    </div>
  );
}