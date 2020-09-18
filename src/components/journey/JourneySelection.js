import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: "wrap",
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function JourneySelection(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {props.options.map((label, index) => {
          return(
            <div key={index}>
            {
              props.stepAnswers.includes(label) ?
              <Button
                onClick={() => {
                  props.updateStepAnswers(label);
                  props.removeDocumentQueue(label);
                }}
                variant="contained"
                disableElevation>
                  {label}
              </Button>
              :
              <Button
                onClick={() => {
                    props.updateStepAnswers(label);
                    props.addDocumentQueue(label);
                  }}
                variant="outlined">
                  {label}
              </Button>
            }
            </div>
          );
        })}
    </div>

  );
}