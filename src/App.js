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
    backgroundColor: "rgba(0, 73, 139, 0.15)",
    height:"100%",
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
  },
  mainArea: {
    minHeight: "80vh",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
  },
  ptSpace: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    height: "auto"
  },
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

          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item lg={8} md={8} xs={8} className={classes.mainArea}>

              <main>

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

              </main>
              </Grid>
            <Grid item xs></Grid>
          </Grid>
        </div>
    </React.Fragment>
  );
}
