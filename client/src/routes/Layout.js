import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ItemsContainer from '../pages/Items';
import Home from '../pages/Home';
import AppBar from '../components/AppBar';

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Route component={AppBar} />
    <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
      <Route path="/items" component={ItemsContainer} />
      {/* <Route exact path="/profile" component={Profile} /> */}
      <Route path="/welcome" component={Home} />
      {/* <Route path={`${match.url}`} component={Profile} /> */}
      {/* <Route path="/share" component={Share} /> */}
    </Switch>
  </Fragment>
);
