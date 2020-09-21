import { createContainer } from 'unstated-next';
import { useState } from 'react';

import result_map from "./../journey/documents/resultmap.json";
import result_specs from "./../journey/documents/resultspecs.json";

let matchAnswer = (answers) => {
  let answers_keys = answers.keys()
  let res_match = -1;
  for (var i=0; i < result_map.length; i++) {
    let kill = 0;
    for (var y=0; y<answers_keys.length; y++) {
      try {
        if (!(result_map[i]["input"][answers_keys[y]].includes(answers.self[answers_keys[y]][0]))) {
          kill = 1;
          break;
        }
      } catch(err) { continue }
    }
    if (kill===1) { continue; }
    else { res_match = result_map[i]["identifier"] }
  }
  return res_match
}

function useResultSpecs(initialState = -1) {
  let [self, setResultSpecs] = useState(initialState)

  let retrieveSpecs = (answers) => {
    let res_match = matchAnswer(answers);
    let res_document = result_specs.filter(function(el) {
      return el.identifier === res_match
    })
    if (res_document.length > 0) {return res_document[0]}
    else {return {}}
  }

  return { self, retrieveSpecs }
}
export const ResultSpecs = createContainer(useResultSpecs)
