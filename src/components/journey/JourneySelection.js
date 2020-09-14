import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
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
            <Button variant="outlined">{label}</Button>
          );
        })}
    </div>

  );
}