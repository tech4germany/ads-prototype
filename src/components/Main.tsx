/*
This component is the main entry point to the wegweiser. Each time the
active step updates it checks whether we have reached the final node in the
document queue. Depending on that it either renders the next step or switches to
the result page.
 */
import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import JourneyStep from "components/journey/JourneyStep"
import Result from "components/results/Results"

import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowResult } from "states/showResultState"

const useStyles = makeStyles((theme) => ({
  mainSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  }
}));

export default function Journey() {
  const classes = useStyles();
  let showResult = ShowResult.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();

  useEffect(() => {
    if (activeStep.isLast(documentQueue.self.length)) {
      showResult.show()
    } else showResult.hide()
  }, [activeStep])

  return (
    <Grid container className={classes.mainSpace}>
      {
        !showResult.self ?
        <JourneyStep />
        :
        <Result />
      }
    </Grid>

  );
}
