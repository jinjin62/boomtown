import React, { Fragment } from 'react';
import { Grid, Typography, Avatar, Card, CardContent } from '@material-ui/core';
import ItemsCard from '../../components/ItemsCard';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';

const Profile = ({ classes, profile }) => {
  return (
    <Fragment className={classes.wrapper}>
      <div>
        <Card className={classes.profileContainer}>
          <CardContent>
            <div className={classes.profileInfo}>
              <Avatar className={classes.profileAvatar}>
                <Gravatar email={profile.email} />
              </Avatar>
              <Typography className={classes.profileName}>
                {profile.fullname}
              </Typography>
            </div>
            <div>
              <Typography className={classes.profileStats}>
                <span className={classes.numItem}>{profile.items.length}</span>{' '}
                Shared Items{' '}
                <span className={classes.numItem}>
                  {profile.borrowed.length}
                </span>{' '}
                Borrowed Items
              </Typography>
              <p>{profile.bio}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Typography className={classes.shareTitle}>Shared Items </Typography>
      </div>
      <Grid container className={classes.profileItemContainer}>
        <Grid item />
        {profile.items.map(item => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.profileItems}
              key={item.id}
            >
              <ItemsCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default Profile;
