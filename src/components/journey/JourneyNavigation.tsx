import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BackButton } from "components/journey/JourneyButtons"
import Stepper from "components/journey/JourneyStepper"

const useStyles = makeStyles((theme) => ({
  navigationGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width:"100%",
  },
  placeholderBox: {
    justifyContent: "flex-end",
    display: 'flex',
    alignItems: "center"
  },
  backBox: {
    justifyContent: "flex-start",
    display: 'flex',
    alignItems: "center"
  },
  stepperBox: {
    [theme.breakpoints.down('xs')]: {
      visibility: "hidden",
    },
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    display: 'flex',
    alignItems: "center"
  }
}));

export default function JourneyNavigation() {
  const classes = useStyles()

  return (
    <nav className={classes.navigationGroup}>

      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.backBox}>
        <BackButton/>
      </Grid>

      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.stepperBox}>
        <Stepper/>
      </Grid>

      <Grid item md={4} sm={4} lg={4} xs={4} className={classes.placeholderBox}></Grid>

    </nav>
  );
}
