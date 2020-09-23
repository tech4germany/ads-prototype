import { createContainer } from 'unstated-next';
import { useState } from 'react';

import result_map from "./../journey/documents/resultmap.json";
import result_specs from "./../journey/documents/resultspecs.json";

const currentExceptions = [
  "merkmal_ethnisch_detail",
  "merkmal_religion_detail",
  "merkmal_behinderung_detail",
  "merkmal_sex_detail",
  "lebensbereich_arbeit_detail",
  "lebensbereich_behörden_detail",
  "lebensbereich_wohnen_detail",
  "lebensbereich_bildung_detail",
  "lebensbereich_gesundheit_detail"
  ]

export function useResultSpecs(initialState = -1) {
  let [self, setResultSpecs] = useState(initialState)

  let _splitAnswers = (answers) => {
    return [answers.self, answers.keys()]
  }

  let matchAnswer = (answers_vals, answers_keys) => {
    let res_match = -1;
    for (var i=0; i < result_map.length; i++) {
      let kill_switch = 1;
      for (var y=0; y<answers_keys.length; y++) {
        kill_switch = 0;
        if (!currentExceptions.includes(answers_keys[y])) {
          if (!(result_map[i]["input"][answers_keys[y]].includes(answers_vals[answers_keys[y]][0]))) {
            kill_switch = 1;
            break;
          } else { continue; }
        }
      }
      if (kill_switch===1) { continue; }
      else { res_match = result_map[i]["identifier"] }
    }
    return res_match
  }

  let retrieveSpecs = (answers) => {
    let answers_vals = _splitAnswers(answers)[0]
    let answers_keys = _splitAnswers(answers)[1]
    let res_match = matchAnswer(answers_vals, answers_keys);
    let res_document = result_specs.filter(function(el) {
      return el.identifier === res_match
    })
    if (res_document.length > 0) {return res_document[0]}
    else {return {}}
  }

  return { self, retrieveSpecs, matchAnswer}
}
export const ResultSpecs = createContainer(useResultSpecs)
