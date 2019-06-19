import React from 'react';
import ItemsCard from '../ItemsCard';
import { connect } from 'react-redux';
import classes from './styles';
import { withStyles } from '@material-ui/core';

const ShareItemPreview = ({ shareItemPreview, tags, classes }) => {
  return (
    <div className={classes.previewCard}>
      <ItemsCard item={shareItemPreview} tags={tags} />
    </div>
  );
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(withStyles(classes)(ShareItemPreview));
