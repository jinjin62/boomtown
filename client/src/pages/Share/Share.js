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
      className={classes.shareFormContainer}
      direction="row"
      alignItems="center"
      justify="space-around"
    >
      <ShareItemPreview tags={tags} classes={classes} />
      <ShareItemForm tags={tags} />
    </Grid>
  );
};

export default withStyles(styles)(Share);
