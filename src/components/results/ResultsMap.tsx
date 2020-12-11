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
    margin: "0px"
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
    lineHeight: "22px"
  },
  mapContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "344px",
    backgroundColor: "white"
  },
  mapContent: {
    height: "100%",
    width: "300px"
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
  mapButton: {
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
    <div className={classes.mapSpace}>
      <div className={classes.mapContainer}>
        <div className={classes.mapContent}>
          <div className={classes.mapHeaderContainer}>
            <h3 className={classes.mapHeaderText}>Beratungsstellen</h3>
          </div>
          <div className={classes.mapInfoContainer}>
            <p className={classes.mapInfoText}>Finden Sie eine Beratungsstelle in Ihrer Nähe über unsere Beratungsstellensuche</p>
            <span className={classes.mapSpacer}></span>
            <button onClick={(e) => {e.preventDefault(); window.location.href="https://www.antidiskriminierungsstelle.de/SiteGlobals/Forms/Suche/Beratungsstellensuche/Karte/Beratungsstellensuche_formular.html?nn=6560716&ambit_distance=200&ambit_distance.HASH=3f1f143fdef1207bca01";}}
              className={classes.mapButton}>
              <a title="Zur Beratungsstellensuche" className={classes.mapLinkText} target="_blank" href={"https://www.antidiskriminierungsstelle.de/SiteGlobals/Forms/Suche/Beratungsstellensuche/Karte/Beratungsstellensuche_formular.html?nn=6560716&ambit_distance=200&ambit_distance.HASH=3f1f143fdef1207bca01"}>Zur Beratungsstellensuche</a>
              </button>
          </div>
        </div>
        <div className={classes.mapStripe}></div>
      </div>
    </div>
  );
}
