/*
This component is the main entry point to the wegweiser. Each time the
active step updates it checks whether we have reached the final node in the
document queue. Depending on that it either renders the next step or switches to
the result page.
 */
import React from 'react';
import { Helmet } from 'react-helmet'
import JourneyStep from "components/journey/JourneyStep"
import Result from "components/results/Results"
import { ActiveStep } from "states/activeStepState"
import { DocumentQueue } from "states/documentQueueState"
import { ShowResult } from "states/showResultState"

export default function Journey() {
  let showResult = ShowResult.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();
  let activeDocument = documentQueue.self[activeStep.self]

  return (
    <>
      <Helmet>
          {
            showResult.self?
            <title>Ergebnis</title>:
            <title>{ activeDocument.step_title }</title>
          }
      </Helmet>
      {
        !showResult.self ?
        <JourneyStep />
        :
        <Result />
      }
    </>
  );
}
