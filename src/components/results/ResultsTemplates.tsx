import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getResultTemplates } from "data/Interface"
import downloadIcon from "assets/icons/Dokument.svg"
import { ResultSpecsLayout } from "data/customTypes"

const useStyles = makeStyles((theme) => ({
  templatesBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "50px",
    maxWidth: "750px",
    "@media (max-width: 375px)": {
      width: "255px",
    }
  },
  subHeaderContainer: {
    marginBottom: "32px"
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
  templateItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px"
  },
  downloadTitleText: {
    textAlign: "left",
    color: "black",
    lineHeight: "25px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px"
  },
  downloadSubtitleText: {
    fontFamily: "BundesSansWeb-Regular",
    color: "black",
    textAlign: "left"
  },
  templateList:{
    marginTop: "16px",
    paddingLeft: "0px",
    marginBottom: "0px"
  },
  downloadIcon: {
    height: "54px",
    cursor: "pointer",
    marginRight: "15px",
  },
  downloadContainer: {
    display: "flex",
    flexDirection: "row",
    height: "54px",
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
  itemSpacer: {
    height: "24px"
  }
}));

interface Props {
  result: ResultSpecsLayout;
}

export default function ResultsTemplates(props: Props) {
  const classes = useStyles()
  let list = getResultTemplates(props.result.non_default_identifier)

  return (
    <section className={classes.templatesBox} aria-label="Formulierungshilfen und Ausfüllhinweise">

      <header className={classes.subHeaderContainer} aria-hidden="true">
        <h2 className={classes.subHeaderText}>Formulierungs&shy;hilfen und Ausfüllhinweise:</h2>
      </header>

      <p className={classes.infoText}>
        Die Vorlage hier können Sie ausfüllen und an die Gegenseite schicken, um Ihre Rechte geltend zu machen:
      </p>

      <ul className={classes.templateList}>
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <li className={classes.templateItem} key={index}>

                <div className={classes.downloadContainer}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={label.template}
                    className={classes.downloadLink}
                    title="Formulierungshilfe herunterladen"
                    aria-label="Formulierungshilfe herunterladen"
                  >
                    <img className={classes.downloadIcon}
                      src={downloadIcon}
                      alt={""}
                    />
                    <span className={classes.downloadTextContainer}>
                      <span className={classes.downloadTitleText}>Formulierungshilfe</span>
                      <span className={classes.downloadSubtitleText}>Download</span>
                    </span>
                  </a>
                </div>
                <span className={classes.itemSpacer}></span>
                <div className={classes.downloadContainer}>
                  <a
                    target="_blank"
		                rel="noopener noreferrer"
                    href={label.help}
                    className={classes.downloadLink}
                    title="Ausfüllhinweis herunterladen"
                    aria-label="Ausfüllhinweis herunterladen"
                  >
                    <img className={classes.downloadIcon} src={downloadIcon} alt={""}/>
                    <span className={classes.downloadTextContainer}>
                      <span className={classes.downloadTitleText}>Ausfüllhinweis</span>
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
