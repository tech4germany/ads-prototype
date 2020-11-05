import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"

import NavBar from 'components/shared/AppBar'
import StateInit from "components/StateInit"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colorMain["15"],
    height:"100%",
    minHeight: "105vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    paddingBottom: "5vh"
  },
  mainArea: {
    minHeight: "80vh",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    width: "78vw",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  placeholder: {
    height: "11vh",
  }
}));

type PlausibleArgs = Array<string>;

declare global {
  const plausible: {
    (...args: PlausibleArgs): void
    q?: PlausibleArgs[]
  }

  interface Window {
    plausible?: typeof plausible
  }
}

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>

          {/* Navbar */}
          <NavBar />
          {/* End Navbar */}

          <div className={classes.placeholder}></div>

          <div className={classes.mainArea}>

            <StateInit />

          </div>
        </div>
    </React.Fragment>
  );
}
