import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"

import NavBar from 'components/shared/AppBar'
import StateInit from "components/StateInit"

const useStyles = makeStyles((theme) => ({
  mainArea: {
    backgroundColor: colorMain["15"],
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: "1152px",
    minHeight: "640px",
    padding: "22px"
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
