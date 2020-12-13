import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorMain } from "components/styleguide"

import NavBar from 'components/shared/AppBar'
import StateInit from "components/StateInit"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "105vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    paddingBottom: "5vh"
  },
  mainArea: {
    backgroundColor: colorMain["15"],
    minHeight: "256px",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: "1152px",
    paddingLeft: "22px",
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
          <div className={classes.mainArea}>
            <StateInit />
          </div>
    </React.Fragment>
  );
}
