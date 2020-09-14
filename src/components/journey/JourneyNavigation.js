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

export default function JourneyNavigation(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {
          props.activeStep !== 0 ?
          <Button
            variant="outlined"
            onClick={() => {props.updateStep("back")}}
          >Back</Button> :
          false
        }
        {
          props.activeStep !== 3 ?
          <Button
            variant="contained"
            disableElevation
            onClick={() => {props.updateStep("next")}}
          >Next</Button> :
          <Button
            variant="contained"
            disableElevation
            onClick={() => {props.updateStep("next")}}
          >Result</Button>
        }

    </div>

  );
}