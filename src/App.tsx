import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"
import StateInit from "components/StateInit"

const useStyles = makeStyles((theme) => ({
  mainArea: {
    backgroundColor: colorMain["15"],
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "1152px",
    minHeight: "640px",
    padding: "22px",
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
          <div className={classes.mainArea}>
            <StateInit />
          </div>
    </React.Fragment>
  );
}
