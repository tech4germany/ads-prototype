import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import JourneyStep from "./JourneyStep.js";
import Result from "./results/Results.js";

import { ShowResult } from "./../states/showResultState.js";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
  },
}));

export default function Journey(props) {
  const classes = useStyles();
  let showResult = ShowResult.useContainer();
  console.log(showResult.self)
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
