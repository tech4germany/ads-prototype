import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import TopThemen from './components/topthemen/TopThemenRouting.js';
import NavBar from './components/shared/AppBar.js';
import FootBar from './components/shared/FootBar.js';
import logo from './images/antidiskriminierungsstelle.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '20vh',
  },
  mainArea: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    color: "black",
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    marginTop: 'auto',
    padding: theme.spacing(6),
  },
  logo: {
    width: 'auto',
    height: '18vh',
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>

          <Grid container  className={classes.mainArea} spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={6}>

              {/* Navbar */}
              <NavBar classes={classes}/>
              {/* End Navbar */}

              {/* Router */}
               <Router>
                  <Switch>
                    <Route path="/top">
                      <TopThemen />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
               </Router>
              {/* End Router */}

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
