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
    paddingBottom: "1vh",
    textDecoration: "underline",
  }
}));

export default function ResultTemplates(props) {
  const classes = useStyles();

  return (
    <div className={classes.templateSpace}>
      <div className={classes.formulierungsHeader}>
        Formulierungshilfen finden Sie hier
      </div>
    </div>
  );
}