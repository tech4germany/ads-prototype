import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { ResultSpecs } from "components/states/resultState.js";

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
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()

  let aggText;
  let fristText;

  if (resultSpecs.self.agg === 1) {
    aggText = "Das Allgemeine Gleichbehandlungsgesetz (AGG) verbietet solche Benachteiligungen. "
    fristText = "Bitte beachten Sie, dass Sie Ihre Ihre Ansprüche innerhalb von zwei Monaten nach dem Vorfall "
    fristText += "schriftlich geltend machen müssen."
  } else {
    aggText = "Der von Ihnen geschilderte Sachverhalt ist leider nicht vom Diskriminierungsschutz durch das AGG umfasst."
  }

  let nextSteps;
  if ((resultSpecs.self.agg === 1) && (resultSpecs.self.frist === 1)) {
    nextSteps = "Machen Sie Ihre Forderung geltend! \nLaden Sie dazu das Download Paket runter und senden Sie das "
    nextSteps += "ausgefüllte Formular innerhalb der 2 Monatsfrist an die diskriminierende Stelle."
  } else {
    nextSteps = "Leider scheint die Frist in Ihrem Fall schon abgelaufen zu sein."
  }

  return (
    <div className={classes.infoSpace}>
      <div className={classes.header}>
        Die Ersteinschätzung Ihres Sachverhalts
      </div>
      <div className={classes.infoText}>
        Sie sehen sich aufgrund Ihrer/Ihres (Merkmal1) im Lebensbereich (Lebensbereich1) diskriminiert.
        <br></br>
        {aggText}
        {fristText}
      </div>
      <div className={classes.nextStepsHeader}>
        Nächste Schritte:
      </div>
      <div className={classes.nextStepsText}>
        {nextSteps}
      </div>
    </div>
  );
}