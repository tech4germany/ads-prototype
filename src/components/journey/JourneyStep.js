import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import JourneyQuestion from "components/journey/JourneyQuestion.js";
import JourneySelection from "components/journey/JourneySelection.js";
import JourneyNavigation from "components/journey/JourneyNavigation.js";

const useStyles = makeStyles((theme) => ({
  stepContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    width: "100%",
  },
}));

export default function JourneyStep(props) {
  const classes = useStyles()

  return (

    <div className={classes.stepContent}>

      <JourneyQuestion />

      <JourneySelection />

      <JourneyNavigation />

    </div>
  );
}