import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ItemsCard from '../ItemsCard/itemsCard';
import styles from './styles';

const ItemsGrid = ({ classes, items, viewer }) => {
  return (
    <Grid container className={classes.root} spacing={24}>
      {items.map(item => {
        return (
          <Grid key={item.id} item xs={3} className={classes.gridItem}>
            <ItemsCard item={item} viewer={viewer} />
          </Grid>
        );
      })}
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  viewer: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemsGrid);
