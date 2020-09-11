import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    '& > *': {
      margin: theme.spacing(1),
    },
    width:"100%"
  },
}));

export default function JourneyNavigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Button>Back</Button>
        <Button>Next</Button>
    </div>

  );
}