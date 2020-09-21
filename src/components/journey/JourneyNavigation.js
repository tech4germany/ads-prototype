import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";
import { ShowResult } from "./../states/showResultState.js";

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
  },
  buttonCardInactive: {
    backgroundColor: "white",
    padding: theme.spacing(1,3,1,3),
    cursor: "pointer"
  },
  buttonCardActive: {
    color: "white",
    backgroundColor: "grey",
    padding: theme.spacing(1,3,1,3),
    cursor: "pointer"
  }
}));

export default function JourneyNavigation(props) {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let showResult = ShowResult.useContainer();

  return (
    <div className={classes.buttonGroup}>
        {
          activeStep.self === 0 ?
            <div className={classes.singleButton}>
              <Card className={classes.buttonCardActive}
                variant="outlined"
                onClick={() => activeStep.increment(documentQueue.self.length)}
              >Next</Card>
            </div>
            :
            <div className={classes.bothButtons}>
              <Card className={classes.buttonCardInactive}
                variant="outlined"
                onClick={() => activeStep.decrement()}
              >Back</Card>
              {
                activeStep.isLast(documentQueue.self.length) ?
                  <Card className={classes.buttonCardActive}
                    variant="outlined"
                    onClick={() => showResult.show()}
                  >Result</Card>
                  :
                  <Card className={classes.buttonCardActive}
                    variant="outlined"
                    onClick={() => activeStep.increment(documentQueue.self.length)}
                  >Next</Card>
              }

            </div>
        }
    </div>
  );
}