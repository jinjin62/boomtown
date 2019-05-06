import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { Avatar, Grid } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';

import Gravatar from 'react-gravatar';

function ItemsCard({ classes, item }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={
            item.imageurl === ''
              ? 'https://loremflickr.com/320/240/'
              : item.imageurl
          }
          title="Image title"
          component={Link}
          to={`/profile/${item.itemowner.id}`}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.itemowner}>
            <Avatar>
              {item.itemowner && <Gravatar email={item.itemowner.email} />}
            </Avatar>
            <Typography>{item.itemowner.fullname}</Typography>
          </div>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography> {item.tags.map(tag => tag.title).join(', ')}</Typography>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="outlined"
            color="default"
            className={classes.button}
          >
            Borrow Item
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withRouter(withStyles(styles)(ItemsCard));
