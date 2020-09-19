import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";

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
    justifyContent: 'flex-end',
  },
  bothButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  }
}));

export default function JourneyNavigation(props) {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();

  return (
    <div className={classes.buttonGroup}>
        {
          activeStep.self === 0 ?
            <div className={classes.singleButton}>
              <Button
                variant="contained"
                disableElevation
                onClick={() => activeStep.increment(documentQueue.self.length)}
              >Next</Button>
            </div>
            :
            <div className={classes.bothButtons}>
              <Button
                variant="outlined"
                onClick={() => activeStep.decrement()}
                disableFocusRipple
              >Back</Button>
              <Button
                variant="contained"
                disableElevation
                onClick={() => activeStep.increment(documentQueue.self.length)}
              >Next</Button>
            </div>
        }
    </div>
  );
}