import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Accordion from "./ResultsInfobox.js";

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

const isTrue = (bool) => bool===true;


const initialiseDocumentQueue = () => {
  return result_specs.filter(function (element) {
    return element.type === "default"
  })
}

export default function Result(props) {
  const classes = useStyles();

  const matchResultType = () => {
    let answers_keys = Object.keys(props.answers);
    let result_match = null;
    for (var i=0; i < result_map.length; i++) {
      for (var y=0; y<answers_keys.length; y++) {
        if (result_map[i]["input"][answers_keys[y]] != props.answers[answers_keys[y]][0]) { break; }
        else { result_match = result_map[i]["identifier"] }
      }
    }
    return result_match
  }

  const retrieveResultSpecs = () => {
    let result_identifier = matchResultType();
    let res_document = result_specs.filter(function(el) {
      return el.identifier == result_identifier
    })
    return res_document[0]
  }

  let resDoc = retrieveResultSpecs();
  console.log(resDoc);

  return (
    <Grid container className={classes.mainSpace}>
      <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
        Ergebnis
      </Typography>
      <Accordion />
    </Grid>
  );
}