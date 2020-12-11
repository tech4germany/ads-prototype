import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultSpecs } from "states/resultState"
import { getResultTemplates } from "data/Interface"
import downloadIcon from "assets/icons/Dokument.svg"

const useStyles = makeStyles((theme) => ({
  templatesBox: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "100%",
    maxWidth: "750px",
    marginBottom: "50px"
  },
  subHeaderContainer: {
    marginBottom: "32px"
  },
  subHeaderText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "30px",
    margin: "0px"
  },
  infoText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px"
  },
  templateItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px"
  },
  downloadTitleText: {
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "18px",
    textAlign: "left",
    color: "black",
    lineHeight: "25px",
    borderBottom: "3px solid #000",
    paddingBottom: "2.5px"
  },
  downloadSubtitleText: {
    fontFamily: "BundesSansWeb-Regular",
    fontSize: "18px",
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
    display: "flex",
    flexDirection: "row",
    textDecoration: "none"
  },
  downloadTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  itemSpacer: {
    height: "24px"
  }
}));

export default function ResultsTemplates() {
  const classes = useStyles()
  let resultSpecs = ResultSpecs.useContainer()
  let list = getResultTemplates(resultSpecs.self.non_default_identifier)

  let handleClick = (link: string) => {
    return function(e: React.SyntheticEvent) {
      e.preventDefault()
      window.location.href=link
    }
  }

  return (
    <div className={classes.templatesBox}>

      <div className={classes.subHeaderContainer}>
        <h2 className={classes.subHeaderText}>Formulierungshilfen und Ausfüllhinweise:</h2>
      </div>

      <span className={classes.infoText}>
        Die Vorlage hier können Sie ausfüllen und an die Gegenseite schicken, um Ihre Rechte geltend zu machen:
      </span>

      <ul className={classes.templateList}>
        {
          (list !== null)?
          list.map((label, index) => {
            return(
              <li className={classes.templateItem} key={index}>

                <button className={classes.downloadContainer}
                  onClick={handleClick(label.template)}
                >
                  <a href={label.template}
                    className={classes.downloadLink}
                  >

                    <img className={classes.downloadIcon}
                      src={downloadIcon}
                      alt={"Icon zeigt ein generisches Dokument und ist einen Link engebettet, der den Download des Dokuments einleitet."}
                    />
                    <div className={classes.downloadTextContainer}>
                      <span className={classes.downloadTitleText}>Formulierungshilfe</span>
                      <span className={classes.downloadSubtitleText}>Download</span>
                    </div>
                  </a>
                </button>
                <span className={classes.itemSpacer}></span>
                <button className={classes.downloadContainer}
                  onClick={handleClick(label.help)}
                >
                  <a href={label.help}
                    className={classes.downloadLink}
                  >
                    <img className={classes.downloadIcon}
                      src={downloadIcon}
                      alt={"Icon zeigt ein generisches Dokument und ist einen Link engebettet, der den Download des Dokuments einleitet."}
                    />
                    <div className={classes.downloadTextContainer}>
                      <span className={classes.downloadTitleText}>Ausfüllhinweis</span>
                      <span className={classes.downloadSubtitleText}>Download</span>
                    </div>
                  </a>
                </button>

              </li>
            )
          }):
          null
        }
      </ul>
    </div>
  );
}
