import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  contactSpace: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "30vh"
  },
}));

export default function ResultContact(props) {
  const classes = useStyles();

  return (
    <div className={classes.contactSpace}>
      This is where we provide all the contact information
    </div>
  );
}