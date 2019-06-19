import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';
import PropTypes from 'prop-types';

const Items = ({ classes, items, viewer }) => {
  return (
    <div className={classes.container}>
      <ItemsGrid items={items} viewer={viewer} />
    </div>
  );
};

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  viewer: PropTypes.object.isRequired
};

export default Items;
