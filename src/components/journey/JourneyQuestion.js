import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

export default function JourneyQuestion() {
  const classes = useStyles();

  return (
    <div>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Hier stellen wir eine Frage. Das ist aber aktuell ein Placeholder?
      </Typography>

      <Typography
        component="h1"
        variant="h6"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Hier wird dir nochmal erklärt, was mit der frage so auf sich hat.
      </Typography>
    </div>
);
}