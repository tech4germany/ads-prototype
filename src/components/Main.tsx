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
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
  },
}));

export default function Journey() {
  const classes = useStyles();
  let showResult = ShowResult.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();
  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)

  useEffect(() => {
    if (activeStep.self === documentQueue.self.length-1) {
      showResult.show()
    } else showResult.hide()
  })

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
