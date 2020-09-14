import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import logo from './../../images/antidiskriminierungsstelle.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '20vh',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  logo: {
    width: 'auto',
    height: '18vh',
  },
}));


export default function NavBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <Link href="/">
            <img className={classes.logo} src={logo} />
        </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}