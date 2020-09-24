import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mapSpace: {
    backgroundColor: "#f3b500",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "30vh"
  },
}));

export default function ResultMap(props) {
  const classes = useStyles();

  return (
    <div className={classes.mapSpace}>
      This is where people can search different beratungsstellen
    </div>
  );
}