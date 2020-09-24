import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  templateSpace: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      minWidth: "100%",
      minHeight: "20vh"
  },
}));

export default function ResultTemplates(props) {
  const classes = useStyles();

  return (
    <div className={classes.templateSpace}>
      This is where people can download different templates
    </div>
  );
}