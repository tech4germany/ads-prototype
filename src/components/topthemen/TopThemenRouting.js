import React, { useState, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopThemenLanding from './TopThemenLanding.js';
import TopThemenItem from "./TopThemenItem.js";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  ptSpace: {
    backgroundColor: theme.palette.action.hover,
  },
}));

const cards_ph = [1, 2, 3, 4, 5, 6];
const cards_tt = [1, 2, 3];

export default function TopThemen() {
  const classes = useStyles();
  const [selectedView, setSelectedView] = useState("Landing");

  const selectLandingView = useCallback(() => {
    setSelectedView("Landing");
  }, [setSelectedView]);

  const selectInfoView = useCallback(() => {
    setSelectedView("InfoView");
  }, [setSelectedView]);

  return (
    <React.Fragment>
      <main className={classes.ptSpace}>

        {/* Router */}
         <Router>
            <Switch>

              <Route exact path="/top">
                <TopThemenLanding
                  selectLandingView={selectLandingView}
                  selectInfoView={selectInfoView}
                 />
              </Route>

              <Route path="/top/item">
                <TopThemenItem
                />
              </Route>

            </Switch>
         </Router>
        {/* End Router */}

      </main>
    </React.Fragment>
  );
}