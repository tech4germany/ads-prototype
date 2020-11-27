/*
This file handles all dealing with data from the webapp.
 */
import group from "assets/icons/group.png"

type allIconsLayout = {
  [key: string]: string
}

const allIcons: allIconsLayout = {
  "group.png": group
}

export function provideSelectionIcon(label: string | null): string {
  if (label) {
    return allIcons[label]
  }
  else {return ""}
}
