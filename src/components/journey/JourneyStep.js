import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import JourneyQuestion from "./JourneyQuestion.js";
import JourneySelection from "./JourneySelection.js";
import JourneyNavigation from "./JourneyNavigation.js";
import HorizontalLinearStepper from "./JourneyStepper.js";

export default function JourneyStep(props) {

  return (

    <div>

      <JourneyQuestion />

      <JourneySelection />

      <JourneyNavigation />

      <HorizontalLinearStepper />

    </div>
  );
}