import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width:"100%"
  },
  singleButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'right',
  },
  bothButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  }
}));

export default function JourneyNavigation(props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
        {
          props.activeStep === 0 ?
            <div className={classes.singleButton}>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {props.updateStep("next")}}
              >Next</Button>
            </div>
            :
            <div className={classes.bothButtons}>
              <Button
                variant="outlined"
                onClick={() => {props.updateStep("back")}}
              >Back</Button>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {props.updateStep("next")}}
              >Next</Button>
            </div>
        }
    </div>
  );
}