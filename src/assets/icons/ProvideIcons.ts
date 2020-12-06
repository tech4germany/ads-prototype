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
import ethnische_herkunft from "assets/icons/Ethnische_Herkunkt.svg"
import ethnische_herkunft_hover from "assets/icons/Ethnische_Herkunkt_hover.svg"
import religion_weltanschauung from "assets/icons/Religion_Weltanschauung.svg"
import religion_weltanschauung_hover from "assets/icons/Religion_Weltanschauung_hover.svg"
import disease from "assets/icons/Behinderung.svg"
import disease_hover from "assets/icons/Behinderung_hover.svg"
import age from "assets/icons/Alter.svg"
import age_hover from "assets/icons/Alter_hover.svg"
import sexual_identity from "assets/icons/Sexuelle_Identitaet.svg"
import sexual_identity_hover from "assets/icons/Sexuelle_Identitaet_hover.svg"
import gender from "assets/icons/Geschlecht.svg"
import gender_hover from "assets/icons/Geschlecht_hover.svg"
import social from "assets/icons/Sozialer_Status.svg"
import social_hover from "assets/icons/Sozialer_Status_hover.svg"
import other from "assets/icons/Sonstiges.svg"
import other_hover from "assets/icons/Sonstiges_hover.svg"
import aemter from "assets/icons/Aemter.svg"
import aemter_hover from "assets/icons/Aemter_hover.svg"
import police from "assets/icons/Justiz.svg"
import police_hover from "assets/icons/Justiz_hover.svg"
import education from "assets/icons/Bildungsbereich.svg"
import education_hover from "assets/icons/Bildungsbereich_hover.svg"
import health from "assets/icons/Gesundheit.svg"
import health_hover from "assets/icons/Gesundheit_hover.svg"
import leisure from "assets/icons/Freizeit.svg"
import leisure_hover from "assets/icons/Freizeit_hover.svg"

import internet from "assets/icons/Internet.svg"
import internet_hover from "assets/icons/Internet_hover.svg"

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
  "wohnungsmarkt_hover": wohnungsmarkt_hover,
  "ethnische_herkunft": ethnische_herkunft,
  "ethnische_herkunft_hover": ethnische_herkunft_hover,
  "religion_weltanschauung": religion_weltanschauung,
  "religion_weltanschauung_hover": religion_weltanschauung_hover,
  "disease": disease,
  "disease_hover": disease_hover,
  "age": age,
  "age_hover": age_hover,
  "sexual_identity": sexual_identity,
  "sexual_identity_hover": sexual_identity_hover,
  "gender": gender,
  "gender_hover": gender_hover,
  "social": social,
  "social_hover": social_hover,
  "other": other,
  "other_hover": other_hover,
  "aemter": aemter,
  "aemter_hover": aemter_hover,
  "police": police,
  "police_hover": police_hover,
  "education": education,
  "education_hover": education_hover,
  "health": health,
  "health_hover": health_hover,
  "leisure": leisure,
  "leisure_hover": leisure_hover,
  "internet": internet,
  "internet_hover": internet_hover
}

export function provideSelectionIcon(label: string | null): string | null {
  if (label) {
    return allIcons[label]
  }
  else {return null}
}
