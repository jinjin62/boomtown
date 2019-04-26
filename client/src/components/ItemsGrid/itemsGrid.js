import React from 'react';
import ItemsCard from '../ItemsCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';
import classNames from 'classnames';

function ItemsGrid({ classes, items }) {
  return (
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid
        className={classes.gridContainer}
        container
        //direction="row"
        spacing={40}
        // justify="space-around"
        // justify="center"
      >
        {items ? items.map(item => <ItemsCard item={item} />) : null}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ItemsGrid);
