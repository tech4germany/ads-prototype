import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import JourneyStep from "./JourneyStep.js";
import Result from "./results/Results.js";

import { ShowResult } from "./../states/showResultState.js";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: "inherit",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "100%",
  },
}));

export default function Journey(props) {
  const classes = useStyles();
  let showResult = ShowResult.useContainer();

  return (
    <Grid container className={classes.mainSpace}>
      {
        !showResult.self ?
        <JourneyStep />
        :
        <Result/>
      }
    </Grid>

  );
}
