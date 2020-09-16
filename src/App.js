import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import NavBar from './components/shared/AppBar.js';
import FootBar from './components/shared/FootBar.js';
import Start from './components/start/Start.js';
import Journey from "./components/journey/Journey.js"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainArea: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    marginTop: 'auto',
    padding: theme.spacing(6),
  },
  ptSpace: {
    backgroundColor: theme.palette.action.hover,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3%",
    marginBottom: "3%",
    width: "100%"
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>

          <Grid container  className={classes.mainArea} spacing={3}>
            <Grid item xs></Grid>
            <Grid item lg={8} md={8} xs={6}>

              {/* Navbar */}
              <NavBar classes={classes}/>
              {/* End Navbar */}

              <main className={classes.ptSpace}>

                {/* Router */}
                 <Router>
                    <Switch>
                      <Route exact path="/">
                        <Start />
                      </Route>
                      <Route path="/journey">
                        <Journey

                        />
                      </Route>
                    </Switch>
                 </Router>
                {/* End Router */}

              </main>

              {/* Footer */}
              <FootBar classes={classes}/>
              {/* End footer */}

              </Grid>
            <Grid item xs></Grid>
          </Grid>
        </div>
    </React.Fragment>
  );
}
