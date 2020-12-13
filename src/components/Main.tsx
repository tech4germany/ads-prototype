/*
This component is the main entry point to the wegweiser. Each time the
active step updates it checks whether we have reached the final node in the
document queue. Depending on that it either renders the next step or switches to
the result page.
 */
import React, {useEffect} from 'react';
import JourneyStep from "components/journey/JourneyStep"
import Result from "components/results/Results"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowResult } from "states/showResultState"

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1086,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default function Journey() {
  let showResult = ShowResult.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();

  useEffect(() => {
    if (activeStep.isLast(documentQueue.self.length)) {
      showResult.show()
    } else showResult.hide()
  }, [activeStep])

  return (
    <ThemeProvider theme={theme}>
      {
        !showResult.self ?
        <JourneyStep />
        :
        <Result />
      }
    </ThemeProvider>
  );
}
