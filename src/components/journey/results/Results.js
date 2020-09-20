import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ControlledAccordions from "./ResultsInfobox.js";
import { Answers } from "./../../states/answerState.js";

import result_map from "./../documents/resultmap.json";
import result_specs from "./../documents/resultspecs.json";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
  }
}));

export default function Result(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  console.log(answers);

  const matchResultType = () => {
    let answers_keys = Object.keys(answers);
    let result_match = null;
    for (var i=0; i < result_map.length; i++) {
          console.log("current match:", result_match);
          console.log("current match:", result_map[i]["identifier"]);
      let kill=0;
      for (var y=0; y<answers_keys.length; y++) {
        console.log("resultmap",result_map[i]["input"][answers_keys[y]]);
        console.log("provided answer:", answers[answers_keys[y]]);
        try {
          if (!(result_map[i]["input"][answers_keys[y]].includes(answers[answers_keys[y]][0]))) {
            kill = 1;
            break;
          }
        } catch(err) { continue; }

      }
      if (kill==1) { continue; }
      else { result_match = result_map[i]["identifier"] }
    }
    console.log(result_match)
    return result_match
  }

  const retrieveResultSpecs = () => {
    let result_identifier = matchResultType();
    let res_document = result_specs.filter(function(el) {
      return el.identifier === result_identifier
    })
    if (res_document.length > 0) {return res_document[0]}
    else {return {}}

  }
  let resDoc = retrieveResultSpecs();

  return (
    <Grid container className={classes.mainSpace}>
      <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
        Ergebnis
      </Typography>
      <ControlledAccordions
       resDoc={resDoc}
       />
    </Grid>
  );
}