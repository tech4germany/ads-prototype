import { createContainer } from 'unstated-next';
import { useState } from 'react';



function useShowInfo(initialState: string | null = null) {
  let [self, setShowInfo] = useState(initialState)

  let show = (label: string | null) => setShowInfo(label)
  let hide = () => setShowInfo(null)

  return { self, show, hide }
}
export const ShowInfo = createContainer(useShowInfo)
