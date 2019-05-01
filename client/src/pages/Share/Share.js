import React from 'react';
import { Grid } from '@material-ui/core';

import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const Share = ({ classes, tags }) => {
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={6}>
        <ShareItemPreview tags={tags} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <ShareItemForm tags={tags} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
