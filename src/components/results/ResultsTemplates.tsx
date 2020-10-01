import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import { ResultSpecs } from "components/states/resultState"

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
    color: "black",
    paddingBottom: "1vh",
    textDecoration: "underline",
  }
}));

export default function ResultTemplates() {
  const classes = useStyles();
  let resultSpecs = ResultSpecs.useContainer()

  let showTemplate;
  if ((resultSpecs.isAGG()) && (resultSpecs.isFrist())) {
    showTemplate = true
  } else {
    showTemplate = false
  }

  return (
    <div className={classes.templateSpace}>
      { showTemplate ?
          <a target="_blank" href="https://www.antidiskriminierungsstelle.de/DE/ThemenUndForschung/Recht_und_gesetz/Handbuch/Anhang/Musterschreiben/Musterschreiben_node.html" className={classes.formulierungsHeader} >
            Formulierungshilfen finden Sie hier
          </a>
        :
        null
      }
    </div>
  );
}
