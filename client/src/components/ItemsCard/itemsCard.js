import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import styles from './styles';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import moment from 'moment';

const ItemsCard = ({ classes, item, viewer }) => {
  const dateToStore = new Date(item.created);
  const momentDate = moment(dateToStore);
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          image={item.imageurl || 'http://via.placeholder.com/350x?text=Image'}
          title={item.title}
          component={Link}
          to={`/profile/${item.itemowner.id}`}
        />

        <CardContent className={classes.content}>
          <CardContent
            className={classes.userInfo}
            component={Link}
            to={`/profile/${item.itemowner.id}`}
          >
            <Avatar className={classes.avatar}>
              {item.itemowner.email ? (
                <Gravatar email={item.itemowner.email} />
              ) : (
                <Gravatar email="placeholder@placeholder.com" />
              )}
            </Avatar>
            <div className={classes.metaInfo}>
              <Typography className={classes.metaName} component="h2">
                {item.itemowner.fullname}
              </Typography>
              <Typography className={classes.metaDate}>
                {momentDate.fromNow()}
              </Typography>
            </div>
          </CardContent>

          <Typography className={classes.title} component="h1">
            {item.title}
          </Typography>

          <Typography className={classes.select} color="textSecondary">
            {item.tags.map(tag => `${tag.title}`).join(', ')}
          </Typography>
          <Typography className={classes.description}>
            {item.description}
          </Typography>
        </CardContent>
      </Fragment>

      {viewer && viewer.id !== item.itemowner.id ? (
        <CardActions>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => console.log('Borrowed!')}
          >
            Borrow
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

ItemsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

ItemsCard.defaultProps = {
  item: {
    title: 'title',
    description: 'description',
    tags: []
  }
};

export default withRouter(withStyles(styles)(ItemsCard));
