import { createContainer } from 'unstated-next';
import { useState } from 'react';



function useShowInfo(initialState: Array<string | null> = [null]) {
  let [self, setShowInfo] = useState(initialState)

  let show = (label: string | null) => {
    let self_ = [...self]
    self_.push(label)
    setShowInfo(self_)
  }
  let hide = () => {
    let self_ = [...self]
    self_.push(null)
    setShowInfo(self_.slice(self_.length-2,self_.length))
  }

  let lastIsSet = (): boolean => {
    if (self[self.length-1]) {return true}
    else { return false }
  }

  let retrieveActiveLabel = (): string | null => {
    return self[self.length-1]
  }

  let retrievePreviousLabel = (): string | null => {
    return self[self.length-2]
  }

  return { self, show, hide, lastIsSet, retrieveActiveLabel, retrievePreviousLabel }
}
export const ShowInfo = createContainer(useShowInfo)
