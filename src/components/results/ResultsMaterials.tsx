import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { getResultMaterials } from "data/Interface"
import downloadIcon from "assets/icons/Dokument.svg"

const useStyles = makeStyles((theme) => ({
  materialsBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "750px",
    marginBottom: "50px"
  },
  subHeaderContainer: {
    marginBottom: "32px",
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px"
  },
  materialsItem: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    marginTop: "16px"
  },
  materialsList:{
    marginTop: "16px",
    paddingLeft: "0px",
    marginBottom: "0px"
  },
  title: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
  },
  downloadIcon: {
    height: "54px",
    cursor: "pointer",
    marginRight: "15px",
  },
  downloadContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  downloadLink: {
    display: "flex",
    flexDirection: "row",
    textDecoration: "none"
  },
  downloadTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  downloadTitleText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    color: "black",
    lineHeight: "25px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px"
  },
  downloadSubtitleText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
  },
}));

export default function ResultsMaterials() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let materials = getResultMaterials(resultSpecs.self.non_default_identifier)

  return (
    <div className={classes.materialsBox}>

      <div className={classes.subHeaderContainer}>
        <span className={classes.subHeaderText}>Informationsmaterial:</span>
      </div>

      <span className={classes.infoText}>
        Weitere Informationen zu Ihren Fragen gibt es hier:
      </span>

      <ul className={classes.materialsList}>
        {
          (materials !== null)?
          materials.map((label, index) => {
            return(
              <li className={classes.materialsItem} key={index}>
                <div className={classes.downloadContainer}>
                  <a href={label.link}
                    className={classes.downloadLink}
                  >
                    <img className={classes.downloadIcon}
                      src={downloadIcon}
                      alt={"empty"}
                    />
                    <div className={classes.downloadTextContainer}>
                      <span className={classes.downloadTitleText}>{label.name}</span>
                      <span className={classes.downloadSubtitleText}>Download</span>
                    </div>
                  </a>
                </div>
              </li>
            )
          }):
          null
        }
      </ul>
    </div>
  );
}
