import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  mapSpace: {
    flex: "1 1 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "white",
    position: "relative"
  },
  mapContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "20px 30px 22.5px 30px"
  },
  mapHeaderContainer: {
    marginBottom: "8px"
  },
  mapHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    margin: "0px",
    fontWeight: "normal",
    hyphens: "auto"
  },
  mapInfoContainer: {
    marginBottom: "8px"
  },
  mapInfoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "22px",
    margin: "0px",
    hyphens: "auto"
  },
  mapLinkContainer: {
    display: "flex",
    flexDirection: "row",
    border: "solid 0px",
  },
  mapLinkText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "16px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textDecoration: "none",
    color: "black",
    lineHeight: "22px",
    hyphens: "auto",
    '@media (hover: hover)': {
      "&:hover": {
        textDecoration: "underline",
        textDecorationColor: "black"
      },
      "&:focus": {
        textDecoration: "underline",
        textDecorationColor: "black"
      }
    }
  },
  mapStripe: {
    backgroundColor: colorMain["115"],
    height: "100%",
    width: "6px",
    position: "absolute",
    right: "0px"
  },

}));

export default function ResultMap() {
  const classes = useStyles();

  return (
    <section className={classes.mapSpace}
      aria-label="Informationen für Beratungsstellensuche">
      <div className={classes.mapContainer}>

        <header className={classes.mapHeaderContainer} aria-hidden="true">
          <h3 className={classes.mapHeaderText}>Beratungsstellen</h3>
        </header>

        <div className={classes.mapInfoContainer}>
          <p className={classes.mapInfoText}>Finden Sie eine Beratungsstelle in Ihrer Nähe über unsere Beratungsstellensuche</p>
        </div>

        <div>
          <a
            className={classes.mapLinkText}
            target="_blank"
            rel="noopener noreferrer"
            title="Zur Beratungsstellensuche"
            aria-label="Beratungsstellensuche der Antidiskriminierungsstelle öffnen"
            href={"https://www.antidiskriminierungsstelle.de/SiteGlobals/Forms/Suche/Beratungsstellensuche/Karte/Beratungsstellensuche_formular.html?nn=6560716&ambit_distance=200&ambit_distance.HASH=3f1f143fdef1207bca01"}
            >Zur Beratungsstellensuche
          </a>
        </div>

      </div>
      <canvas className={classes.mapStripe}></canvas>
    </section>
  );
}
