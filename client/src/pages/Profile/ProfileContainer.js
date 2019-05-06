import React, { Component } from 'react';
import Profile from './Profile';
import FullScreenLoader from '../../components/FullScreenLoader';
import styles from './styles';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

class ProfileContainer extends Component {
  render() {
    const id = this.props.match.params.id;
    //id que doenst give profilepage, why
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return <p>{`Error! ${error.message}`}</p>;

          return <Profile classes={this.props.classes} profile={data.user} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
