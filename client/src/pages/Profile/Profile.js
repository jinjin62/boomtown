import React from 'react';
import { Grid, Typography, Avatar, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemsCard from '../../components/ItemsCard';
import Gravatar from 'react-gravatar';
import styles from './styles';
import PropTypes from 'prop-types';

const Profile = ({ classes, profile }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.topWrapper}>
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
                <span className={classes.numItem}>{profile.items.length}</span>
                <span className={classes.shared}>Shared Items</span>
                <span className={classes.numItem}>
                  {profile.borrowed.length}
                </span>
                Borrowed Items
              </Typography>
              <p>{!profile.bio ? 'No bio provided' : profile.bio}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Typography className={classes.shareTitle}>Shared Items</Typography>
      </div>
      <Grid
        // spacing={10}
        className={classes.profileItemContainer}
      >
        {profile.items.map(item => {
          return (
            <ItemsCard
              key={item.id}
              item={item}
              className={classes.profileCard}
            />
          );
        })}
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
