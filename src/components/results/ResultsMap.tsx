import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  mapSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingBottom: "4vh"
  },
  mapHeaderContainer: {
    marginTop: "20px",
    marginBottom: "8px",
    marginLeft: "38px",
    marginRight: "38px"
  },
  mapHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    margin: "0px",
    fontWeight: "normal"
  },
  mapInfoContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    marginLeft: "38px",
    marginRight: "38px",
    maxWidth: "268px"
  },
  mapInfoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "22px",
    margin: "0px"
  },
  mapLinkText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "16px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textDecoration: "none",
    color: "black",
    lineHeight: "22px",
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
  mapContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "344px",
    minWidth: "255px",
    backgroundColor: "white",
    width: "100%",
  },
  mapContent: {
    height: "100%",
    width: "100%",
  },
  mapStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    minHeight: "100px",
    width: "6px",
    minWidth: "6px"
  },
  mapSpacer: {
    height: "24px"
  },
  mapLink: {
    display: "flex",
    flexDirection: "row",
    border: "solid 0px",
    backgroundColor: "inherit",
    padding: "0px"
  }
}));

export default function ResultMap() {
  const classes = useStyles();

  return (
    <section className={classes.mapSpace} aria-label="Informationen für Beratungsstellensuche">
      <div className={classes.mapContainer}>
        <div className={classes.mapContent}>
          <header className={classes.mapHeaderContainer} aria-hidden="true">
            <h3 className={classes.mapHeaderText}>Beratungsstellen</h3>
          </header>
          <div className={classes.mapInfoContainer}>
            <p className={classes.mapInfoText}>Finden Sie eine Beratungsstelle in Ihrer Nähe über unsere Beratungsstellensuche</p>
            <span className={classes.mapSpacer}></span>
            <div className={classes.mapLink}>
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
        </div>
        <canvas className={classes.mapStripe}></canvas>
      </div>
    </section>
  );
}
