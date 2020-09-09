import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 3, 6, 3),
    width: "100%"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    padding: theme.spacing(8, 1, 6, 1),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  mainSpace: {
    padding: "3%",
    marginTop: "3%",
    marginBottom: "3%",
  },
}));

export default function TopThemenItem(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.mainSpace}>

        {/* Hero unit */}
        <div className={classes.heroContent} maxWidth="md">
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Prototype Space
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Eine Übersicht der Prototypen, die sich aktuell in der Entwicklung befinden. Hier schauen wir uns gerade mal
              den Top Themen Prototypen an.
            </Typography>
          </Container>
        </div>
        {/* End hero unit */}

        {/* Random Cards */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
          </Grid>
        </Container>
        {/* Random Cards */}

      </Grid>
    </React.Fragment>
  );
}