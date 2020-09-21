import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ControlledAccordions from "./ResultsInfobox.js";
import { Answers } from "./../../states/answerState.js";
import { ResultSpecs } from "./../../states/resultState.js";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
  }
}));

export default function Result(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let resultSpecs = ResultSpecs.useContainer();
  let resDoc = resultSpecs.retrieveSpecs(answers);

  return (
    <Grid container className={classes.mainSpace}>
      <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
        Ergebnis
      </Typography>
      <ControlledAccordions
       resDoc={resDoc}
       />
    </Grid>
  );
}