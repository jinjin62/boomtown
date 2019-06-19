import React, { Component } from 'react';
import Profile from './Profile';
import FullScreenLoader from '../../components/FullScreenLoader';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { Query } from 'react-apollo';
import { ViewerContext } from '../../context/ViewerProvider';
class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {values => (
          <Query
            query={ALL_USER_ITEMS_QUERY}
            variables={{ id: values.viewer.id }}
          >
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader />;
              if (error) return <p>{`Error! ${error.message}`}</p>;

              return <Profile profile={data.user} />;
            }}
          </Query>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
