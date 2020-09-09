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

import cards_tt from "./../../content/TopThemenCards.json";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 3, 6, 3),
    width: "100%"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGridPlaceholder: {
    padding: theme.spacing(8, 1, 6, 1),
  },
  card_placeholder: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardGrid: {
    padding: theme.spacing(8, 1, 6, 1),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  card_item: {
    width: "100%"
  },
  mainSpace: {
    padding: "3%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  topThemen: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.error.main,
    height: "100%",
    padding: theme.spacing(4, 3, 4, 3),
  },
  topThemenList: {
  },
}));

const cards_ph = [1, 2, 3, 4, 5, 6];

export default function TopThemenLanding(props) {
  const classes = useStyles();

  return (
    <React.Fragment>

      <Grid container className={classes.mainSpace} spacing={3}>

        {/* Placeholder Content */}
        <Grid item xs={9}>
          <Grid container >

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
            <Container className={classes.cardGridPlaceholder} maxWidth="md">
              <Grid container spacing={4}>
                {cards_ph.map((card) => (
                  <Grid item className={classes.card_item} key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card_placeholder}>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h2">
                          Heading
                        </Typography>
                        <Typography>
                          This is a media card. You can use this section to describe the content.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" >
                          <Link to="/top/item">
                          View
                          </Link>
                        </Button>
                        <Button size="small" color="primary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            {/* Random Cards */}

          </Grid>
        </Grid>
        {/* End Placeholder Content */}

        {/* Top Themen Bar */}
        <Grid item xs={3}>
          <Container className={classes.topThemen}>

            {/* Top Themen Title */}
            <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
              Top Themen
            </Typography>
            {/* End Top Themen Title */}

            {/* Top Themen Cards */}
            <Grid container className={classes.topThemenList} spacing={4}>
              {cards_tt.map((card) => (

                <Grid item key={card.name} >
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h4">
                        {card.name}
                      </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary" href="/top/item">
                          View
                        </Button>
                    </CardActions>

                  </Card>
                </Grid>

              ))}
            </Grid>
          </Container>
          {/* End Top Themen Cards*/}

        </Grid>
        {/* End Top Themen Bar */}

      </Grid>
    </React.Fragment>
  );
}
