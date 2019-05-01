import React from 'react';
import ItemsCard from '../ItemsCard';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview, tags }) => {
  return <ItemsCard item={shareItemPreview} tags={tags} />;
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(ShareItemPreview);
