import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain, textSelectionMain, textSelectionExplanation } from "components/styleguide"

const useStyles = makeStyles((theme) => ({
  mapSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingBottom: "4vh"
  },
  mapHeader: {
    marginTop: "20px",
    marginBottom: "8px",
    marginLeft: "38px",
    marginRight: "38px",
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px"
  },
  mapInfo: {
    marginBottom: "20px",
    marginLeft: "38px",
    marginRight: "38px",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "16px",
    lineHeight: "22px",
    maxWidth: "268px"
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
    maxWidth: "333px"
  },
  mapStripe: {
    display: "flex",
    backgroundColor: colorMain["115"],
    minHeight: "100px",
    width: "6px",
    minWidth: "6px"
  }
}));

export default function ResultMap() {
  const classes = useStyles();

  return (
    <div className={classes.mapSpace}>
      <div className={classes.mapContainer}>
        <div className={classes.mapContent}>
          <div className={classes.mapHeader}>
            <span>Beratungsstellen</span>
          </div>
          <div className={classes.mapInfo}>
            <span>Finden Sie eine Beratungsstelle in Ihrer Nähe über unsere Beratungsstellensuche</span>
              <br></br>
              <br></br>
            <span><a target="_blank" href={"https://www.antidiskriminierungsstelle.de/SiteGlobals/Forms/Suche/Beratungsstellensuche/Karte/Beratungsstellensuche_formular.html?nn=6560716&ambit_distance=200&ambit_distance.HASH=3f1f143fdef1207bca01"}>Beratungsstelle finden</a></span>
          </div>
        </div>
        <div className={classes.mapStripe}></div>
      </div>
    </div>
  );
}
