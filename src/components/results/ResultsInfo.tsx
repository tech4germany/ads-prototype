import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { ResultSpecs } from "states/resultState"
import { Answers } from "states/answerState";

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
    fontSize: "28px",
    paddingBottom: "2.3vh",
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    paddingBottom: "2.3vh"
  },
  nextStepsHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    paddingBottom: "1vh"
  },
  nextStepsText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "22px",
    whiteSpace: "pre-wrap"
    }
}));

export default function ResultInfo() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let answers = Answers.useContainer();

  let aggText;
  let fristText;

  if (resultSpecs.isAGG()) {
    aggText = "Das Allgemeine Gleichbehandlungsgesetz (AGG) verbietet solche Benachteiligungen. "
    fristText = "Bitte beachten Sie, dass Sie Ihre Ihre Ansprüche innerhalb von zwei Monaten nach dem Vorfall "
    fristText += "schriftlich geltend machen müssen."
  } else {
    aggText = "Der von Ihnen geschilderte Sachverhalt ist leider nicht vom Diskriminierungsschutz durch das AGG umfasst. Dennoch können Sie Ihre Rechte auf verschiedenen Wegen verfolgen."
  }

  let nextSteps;
  if ((resultSpecs.isAGG()) && (resultSpecs.isFrist())) {
    nextSteps = "Machen Sie Ihre Forderung geltend! \nLaden Sie dazu das Download Paket runter und senden Sie das "
    nextSteps += "ausgefüllte Formular innerhalb der 2 Monatsfrist an die diskriminierende Stelle."
  } else if (resultSpecs.isAGG()) {
    nextSteps = "Leider scheint die Frist in Ihrem Fall schon abgelaufen zu sein. Wenn Sie dennoch Beratung zu Ihrem Fall wünschen, kontaktieren Sie uns bitte über das Kontaktformular."
  } else {
    nextSteps = "Möglicherweise gibt es eine Stelle, die für Ihren Fall besser geeignet ist. Die Karte leitet Sie weiter zu einer Liste aller eingetragenen Beratungsstellen. Sollten Sie dort nicht fündig werden und wünschen weiterhin Beratung, kontaktieren Sie uns bitte über das Kontaktformular."
  }

  return (
    <div className={classes.infoSpace}>
      <div className={classes.header}>
        Die Ersteinschätzung Ihres Sachverhalts
      </div>
      <div className={classes.infoText}>
        Sie sehen sich aufgrund des Merkmals <b>{answers.getAnswerByKey("merkmal", 0)}</b> im Lebensbereich <b>{answers.getAnswerByKey("lebensbereich", 0)}</b> diskriminiert.
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
