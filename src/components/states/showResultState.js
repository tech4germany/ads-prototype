import { createContainer } from 'unstated-next';
import { useState } from 'react';

function useShowResult(initialState = false) {
  let [self, setShowResult] = useState(initialState)
  let show = () => setShowResult(true)

  return { self, show }
}
export const ShowResult = createContainer(useShowResult)
