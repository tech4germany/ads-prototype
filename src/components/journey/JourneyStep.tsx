import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import JourneyQuestion from "components/journey/JourneyQuestion";
import JourneySelection from "components/journey/JourneySelection";
import JourneyNavigation from "components/journey/JourneyNavigation";

const useStyles = makeStyles((theme) => ({
  stepContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    width: "100%",
  },
}));

export default function JourneyStep() {
  const classes = useStyles()

  return (

    <div className={classes.stepContent}>

      <JourneyQuestion />

      <JourneySelection />

      <JourneyNavigation />

    </div>
  );
}
