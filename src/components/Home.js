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

import LandingCards from "../content/LandingCards.json";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    padding: theme.spacing(8, 0, 8, 0),
    justify: "space-between"
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
  ptSpace: {
    backgroundColor: theme.palette.action.hover,
    display: "flex",
    flexDirection: "column",
    marginTop: "3%",
    marginBottom: "3%",
  },
  mainSpace: {
      display: "flex",
      flexDirection: "column",
      padding: "3%",
      marginTop: "3%",
      marginBottom: "3%",
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.ptSpace}>

        <Grid container className={classes.mainSpace}>

          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Prototype Space
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Eine Übersicht der Prototypen, die sich aktuell in der Entwicklung befinden.
              </Typography>
            </Container>
          </div>
          {/* End hero unit */}
          
	  <Container className={classes.cardGrid}>
            <Grid container spacing={4} justify="space-between">

              {LandingCards.map((card) => (

                <Grid item key={card.name} xs={12} sm={6} md={6}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />

                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.brief_description}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button size="small" color="primary" href={card.link}>
                        View
                      </Button>
                    </CardActions>

                  </Card>
                </Grid>

              ))}
            </Grid>
          </Container>

        </Grid>
      </main>
    </React.Fragment>
  );
}
