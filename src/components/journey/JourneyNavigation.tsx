import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { NextButton, BackButton } from "components/journey/JourneyButtons"
import Stepper from "components/journey/JourneyStepper"

const useStyles = makeStyles((theme) => ({
  navigationGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width:"100%",
    paddingLeft: "0.8vw",
    paddingRight: "0.8vw",
  },
  nextBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  backBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  stepperBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden"
  }

}));

export default function JourneyNavigation() {
  const classes = useStyles()

  return (
    <Grid className={classes.navigationGroup}>
      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.backBox}>
        <BackButton/>
      </Grid>
      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.stepperBox}>
        <Stepper/>
      </Grid>
      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.nextBox}>
        <NextButton/>
      </Grid>
    </Grid>
  );
}
