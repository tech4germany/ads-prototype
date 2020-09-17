import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  linkJourney: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    textDecoration: "None"
  },
  startButton: {
    backgroundColor: theme.palette.primary.light,
    width: "50%"
  },
}));

export default function StartButton() {
  const classes = useStyles();

  return (
  <Link to="/journey" className={classes.linkJourney} >
    <Button
      className={classes.startButton}
      variant="contained"
      color="primary"
      disableElevation
    >
      Hier Beginnen Sie den Wegweiser
    </Button>
  </Link>
  );
}