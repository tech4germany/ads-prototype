import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BackButton } from "components/journey/JourneyButtons"
import Stepper from "components/journey/JourneyStepper"

const navBox = {
  "display": 'flex',
  "alignItems": "center"
}

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
    justifyContent: "flex-end",
    ...navBox
  },
  backBox: {
    justifyContent: "flex-start",
    ...navBox,
  },
  stepperBox: {
    [theme.breakpoints.down('xs')]: {
      visibility: "hidden",
    },
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    ...navBox,
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

      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.nextBox}></Grid>

    </Grid>
  );
}
