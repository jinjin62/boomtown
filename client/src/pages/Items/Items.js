import React from 'react';
import ItemGrid from '../../components/ItemsGrid';
import ItemsCard from '../../components/ItemsCard';

const Items = ({ classes, items }) => {
  console.log(items);
  return (
    <ItemGrid  items={items} />
     
  );
};

export default Items;
