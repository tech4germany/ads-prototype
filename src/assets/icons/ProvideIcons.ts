/*
This file handles all dealing with data from the webapp.
 */
import group from "assets/icons/group.png"
import arbeitsleben from "assets/icons/Arbeitsleben.svg"
import arbeitsleben_hover from "assets/icons/Arbeitsleben_hover.svg"
import geschaefte from "assets/icons/Geschaefte.svg"
import geschaefte_hover from "assets/icons/Geschaefte_hover.svg"
import wohnungsmarkt from "assets/icons/Wohnungsmarkt.svg"
import wohnungsmarkt_hover from "assets/icons/Wohnungsmarkt_hover.svg"

type allIconsLayout = {
  [key: string]: string
}

const allIcons: allIconsLayout = {
  "group": group,
  "arbeitsleben": arbeitsleben,
  "arbeitsleben_hover": arbeitsleben_hover,
  "geschaefte": geschaefte,
  "geschaefte_hover": geschaefte_hover,
  "wohnungsmarkt": wohnungsmarkt,
  "wohnungsmarkt_hover": wohnungsmarkt_hover
}

export function provideSelectionIcon(label: string | null): string | null {
  if (label) {
    return allIcons[label]
  }
  else {return null}
}
