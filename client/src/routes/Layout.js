import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ItemsContainer from '../pages/Items';
import Home from '../pages/Home';
import AppBar from '../components/AppBar';
import Share from '../pages/Share';

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Route component={AppBar} />
    <Switch>
      <Route exact path="/items" component={ItemsContainer} />
      {/* <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userid" component={Profile} /> */}
      <Route exact path="/share" component={Share} />
      <Redirect from="*" to="/items" />
    </Switch>
  </Fragment>
);
