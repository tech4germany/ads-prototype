import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import map from 'assets/images/map_icon.png';

const useStyles = makeStyles((theme) => ({
  mapSpace: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    minWidth: "100%",
    paddingBottom: "4vh"
  },
  mapHeader: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "22px",
    paddingBottom: "2.3vh"
  },
  mapImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "50vw",
    maxHeight: "20vh",
    overflow: "hidden",
    borderWidth: "3px",
    backgroundColor: "white"
  },
  mapImageZoom: {
    width: "auto",
    maxHeight: "20vh"
  }
}));

export default function ResultMap() {
  const classes = useStyles();

  return (
    <div className={classes.mapSpace}>
      <div className={classes.mapHeader}>
        Beratungsstellen in Ihrer Nähe finden
      </div>
      <div className={classes.mapImage}>
        <a target="_blank" href="https://www.antidiskriminierungsstelle.de/SiteGlobals/Forms/Suche/Beratungsstellensuche/Karte/Beratungsstellensuche_formular.html?nn=6560716&ambit_distance=200&ambit_distance.HASH=3f1f143fdef1207bca01">
        <img className={classes.mapImageZoom} src={map} alt={"empty"}/>
        </a>
      </div>
    </div>
  );
}
