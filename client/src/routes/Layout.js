import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import FullScreenLoader from '../components/FullScreenLoader';
import AppBar from '../components/AppBar';

export default () => {
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer }) => {
        if (loading) return <FullScreenLoader />;
        if (!viewer) {
          return (
            <Switch>
              <Route path="/welcome" component={Home} />
              <Redirect to="/welcome" />
            </Switch>
          );
        }
        return (
          <React.Fragment>
            <AppBar />
            <Switch>
              <Route exact path="/items" name="items" component={Items} />
              <Route exact path="/profile" name="profile" component={Profile} />
              <Route
                exact
                path="/profile/:userId"
                name="profile"
                component={Profile}
              />
              <Route exact path="/share" name="share" component={Share} />
              <Redirect from="*" to="/items" />
            </Switch>
          </React.Fragment>
        );
      }}
    </ViewerContext.Consumer>
  );
};
