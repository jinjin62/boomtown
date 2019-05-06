import React from 'react';
import ItemGrid from '../../components/ItemsGrid';
import Grid from '@material-ui/core/Grid';

const Items = ({ classes, items }) => {
  return <ItemGrid items={items} />;
};

export default Items;
