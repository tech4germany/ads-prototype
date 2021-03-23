import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getResultMaterials } from "data/Interface"
import downloadIcon from "assets/icons/Dokument.svg"
import { ResultSpecsLayout } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  materialsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
    margin: "0px 0px 16px 0px"
  },
  materialsList:{
    paddingLeft: "0px",
  },
  materialsItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px"
  },
  downloadLink: {
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
  downloadIcon: {
    height: "54px",
    cursor: "pointer",
    marginRight: "15px",
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
    paddingBottom: "2.5px",
    textAlign: "left",
    hyphens: "auto"
  },
  downloadSubtitleText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
    textAlign: "left",
    color: "black",
    hyphens: "auto"
  },
}));

interface Props {
  result: ResultSpecsLayout;
}

export default function ResultsMaterials(props: Props) {
  const classes = useStyles()
  let materials = getResultMaterials(props.result.non_default_identifier)

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
              </li>
            )
          }):
          null
        }
      </ul>
    </section>
  );
}
