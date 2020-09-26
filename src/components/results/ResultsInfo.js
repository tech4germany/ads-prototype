import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  infoSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    paddingBottom: "2.3vh",
  },
  header: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "2.7vh",
    paddingBottom: "2.3vh",
    paddingLeft: "0.8vw"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "2.1vh",
    paddingBottom: "2.3vh"
  },
  nextStepsHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "2.1vh",
    paddingBottom: "1vh"
  },
  nextStepsText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "2.1vh",
    whiteSpace: "pre-wrap"
    }
}));

export default function ResultInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.infoSpace}>
      <div className={classes.header}>
        Die Ersteinschätzung Ihres Sachverhalts
      </div>
      <div className={classes.infoText}>
        Der von Ihnen geschilderte Sachverhalt fällt unter den Diskriminierungsschutz des Allgemeinen Gleichbehandlungsgesetz (AGG).
        Es könnte somit eine rechtswidrige Benachteiligung vorliegen. Dagegen können Sie auf verschiedenen Wegen vorgehen.
      </div>
      <div className={classes.nextStepsHeader}>
        Nächste Schritte:
      </div>
      <div className={classes.nextStepsText}>
        1. Machen Sie Ihre Forderung geltend<br></br>
        Laden Sie dazu das Download Paket runter und senden Sie das ausgefüllte Formular innerhalb der 2 Monatsfrist an
        die diskriminierende Stelle.
      </div>
    </div>
  );
}