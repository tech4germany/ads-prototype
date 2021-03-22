/*
This file initialises states that need to be accessible throughout the app. This
could of course also be done through passing state hooks back and forth within
individual components. This is however more tedious to stay on top of, which is
why I resort to using unstated-next.
 */
import React from 'react';
import Main from "./Main";

import { Answers } from "states/answerState"
import { ActiveNode } from "states/activeNodeState"
import { ShowResult } from "states/showResultState"
import { ShowInfo } from "states/showInfoState"

export default function JourneyStateInit() {

  return (
    <Answers.Provider>
    <ActiveNode.Provider>
    <ShowResult.Provider>
    <ShowInfo.Provider>

      <Main />

    </ShowInfo.Provider>
    </ShowResult.Provider>
    </ActiveNode.Provider>
    </Answers.Provider>
  );
}
