import { createContainer } from 'unstated-next';
import { useState } from 'react';

function useShowResult(initialState = false) {
  let [self, setShowResult] = useState(initialState)

  let show = () => setShowResult(true)
  let hide = () => setShowResult(false)

  return { self, show, hide }
}
export const ShowResult = createContainer(useShowResult)
