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
    fontSize: "30px",
    margin: "0px",
    fontWeight: "normal"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    margin: "0px"
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
    justifyContent: "flex-start",
    alignItems: "center",
    border: "solid 0px",
    backgroundColor: "inherit",
    padding: "0px"
  },
  downloadLink: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
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
  downloadTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  downloadTitleText: {
    color: "black",
    lineHeight: "25px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px",
    textAlign: "left"
  },
  downloadSubtitleText: {
    fontFamily: "BundesSansWeb-Regular",
    textAlign: "left",
    color: "black"
  },
}));

export default function ResultsMaterials() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let materials = getResultMaterials(resultSpecs.self.non_default_identifier)

  return (
    <section className={classes.materialsBox} aria-label="Informationsmaterial">

      <header className={classes.subHeaderContainer} aria-hidden="true">
        <h2 className={classes.subHeaderText}>Informations&shy;material:</h2>
      </header>

      <p className={classes.infoText}>
        Weitere Informationen zu Ihren Fragen gibt es hier:
      </p>

      <ul className={classes.materialsList}>
        {
          (materials !== null)?
          materials.map((label, index) => {
            return(
              <li className={classes.materialsItem} key={index}>
                <div className={classes.downloadContainer}>
                  <a
                    tabIndex={0}
                    target="_blank"
	                  rel="noopener noreferrer"
                    href={label.link}
                    className={classes.downloadLink}
                    title="Informationsmaterial herunterladen"
                    aria-label="Informationsmaterial herunterladen"
                  >
                    <img className={classes.downloadIcon} src={downloadIcon} alt={""}/>
                    <span className={classes.downloadTextContainer}>
                      <span className={classes.downloadTitleText}>{label.name}</span>
                      <span className={classes.downloadSubtitleText}>Download</span>
                    </span>
                  </a>
                </div>
              </li>
            )
          }):
          null
        }
      </ul>
    </section>
  );
}
