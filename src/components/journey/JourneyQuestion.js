import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));

export default function JourneyQuestion(props) {
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
        {props.question}
      </Typography>

      <Typography
        component="h1"
        variant="h6"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {props.explanation}
      </Typography>
    </div>
);
}