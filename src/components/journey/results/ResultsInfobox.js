import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {
        props.resDoc.info ?
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>Infos</Typography>
              <Typography className={classes.secondaryHeading}>Get some info on your situation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {props.resDoc.info}
              </Typography>
            </AccordionDetails>
          </Accordion>
          : null
      }

      {
        props.resDoc.agg === 1 ?
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>AGG</Typography>
              <Typography className={classes.secondaryHeading}>
                Ihr Fall ist AGG-Relevant
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus.
              </Typography>
            </AccordionDetails>
          </Accordion>
          : null
      }

      {
        props.resDoc.contact === 1 ?
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Kontakt</Typography>
              <Typography className={classes.secondaryHeading}>
                Nehmen Sie mit uns Kontakt auf
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus.
              </Typography>
            </AccordionDetails>
          </Accordion>
          : null
      }
      {
        props.resDoc.blist === 1 ?
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Beratungsstellenlist</Typography>
              <Typography className={classes.secondaryHeading}>
                Hier finden Sie andere Stellen
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus.
              </Typography>
            </AccordionDetails>
          </Accordion>
          : null
      }

      {
        props.resDoc.templates === 1 ?
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Vorlagen</Typography>
              <Typography className={classes.secondaryHeading}>
                Hier finden Sie Vorlagen zu Ihrem Fall
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus.
              </Typography>
            </AccordionDetails>
          </Accordion>
          : null
      }
    </div>
  );
}