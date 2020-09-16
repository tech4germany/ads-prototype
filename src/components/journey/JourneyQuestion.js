import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function JourneyQuestion(props) {

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