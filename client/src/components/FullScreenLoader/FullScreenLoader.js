import React from 'react';
import Loader from 'react-loader-spinner';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';

const FullScreenLoader = ({ classes }) => {
  //other logic

  return (
    <div className={classes.container}>
      <Loader type="ThreeDots" color="#00BFFF" height="100" width="100" />
    </div>
  );
};

export default withStyles(styles)(FullScreenLoader);
