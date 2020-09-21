import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import NavBar from './components/shared/AppBar.js';
import FootBar from './components/shared/FootBar.js';
import Start from './components/start/Start.js';
import JourneyStateInit from "./components/journey/JourneyStateInit.js"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fef3df",
    height:"100%",
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
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

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>

          {/* Navbar */}
          <NavBar classes={classes}/>
          {/* End Navbar */}

          <div className={classes.placeholder}></div>

          <div className={classes.mainArea}>

                {/* Router */}
                 <Router>
                    <Switch>
                      <Route exact path="/">
                        <Start />
                      </Route>
                      <Route path="/journey">
                        <JourneyStateInit />
                      </Route>
                    </Switch>
                 </Router>
                {/* End Router */}

          </div>
        </div>
    </React.Fragment>
  );
}
