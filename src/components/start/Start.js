import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import StartButton from "components/start/StartButton.js";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
      height: "auto"
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainSpace}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Wegweiser
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Hier kommt ein kleiner Text, der den Wegweiser und seine Funktionsweise ein bisschen erklärt. Und so weiter
      </Typography>
      <StartButton />
    </Grid>
  );
}
