import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import JourneyQuestion from "./JourneyQuestion.js";
import JourneySelection from "./JourneySelection.js";
import JourneyNavigation from "./JourneyNavigation.js";

const useStyles = makeStyles((theme) => ({
}));

export default function JourneyStep() {
  const classes = useStyles();

  return (

    <div>
    <JourneyQuestion />

    <JourneySelection/>

    <JourneyNavigation />
    </div>
  );
}