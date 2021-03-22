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
import { ActiveNode } from "states/activeNodeState"
import { ShowResult } from "states/showResultState"
import { StepDetail } from "data/customTypes"

export default function Journey() {
  let showResult = ShowResult.useContainer();
  let activeNode = ActiveNode.useContainer();

  return (
    <>
      <Helmet>
          {
            showResult.self?
            <title>Ergebnis</title>:
            <title>{ activeNode.getStepDetail(StepDetail.step_title)}</title>
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
