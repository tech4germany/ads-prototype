import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  startButton: {
    backgroundColor: theme.palette.primary.light,
    width: "50%"
  },
}));

export default function StartButton() {
  const classes = useStyles();

  return (
    <Button
      className={classes.startButton}
      variant="contained"
      color="primary"
      disableElevation
      href="/journey"
    >
      Hier Beginnen Sie den Wegweiser
    </Button>
  );
}