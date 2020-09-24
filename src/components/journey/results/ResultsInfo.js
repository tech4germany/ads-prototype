import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  infoSpace: {
    backgroundColor: "#f3b500",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "40vh"
  },
}));

export default function ResultInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.infoSpace}>
      This is where we put all that information
    </div>
  );
}