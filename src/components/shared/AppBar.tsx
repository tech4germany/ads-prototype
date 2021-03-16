import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import logo from 'assets/images/antidiskriminierungsstelle.jpg'

const useStyles = makeStyles((theme) => ({
  appBar: {
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

export default function NavBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar tabIndex={0} position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <Link href="/">
            <img className={classes.logo} src={logo} alt={""}/>
        </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
