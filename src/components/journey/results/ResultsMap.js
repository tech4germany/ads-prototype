import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import map from './../../../images/image_ph.jpg';

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
    fontSize: "2.1vh",
    paddingBottom: "2.3vh"
  },
  mapImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "18.6vw",
    maxHeight: "20vh",
    overflow: "hidden",
    borderStyle: "solid",
    borderWidth: "3px",
    borderColor: "white"
  },
  mapImageZoom: {
    maxWidth: "100%",
    height: "auto"
  }
}));

export default function ResultMap(props) {
  const classes = useStyles();

  return (
    <div className={classes.mapSpace}>
      <div className={classes.mapHeader}>
        Beratungsstellen in Ihrer Nähe finden
      </div>
      <div className={classes.mapImage}>
        <img src={map} alt={"empty"}/>
      </div>
    </div>
  );
}