import React from 'react';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import style from './filter.css';
import DropDown from 'components/DropDown';

const Filter = ({
  category,
  categories,
  price,
  prices,
  onLocalFilter,
  onApiFilter,
  isOpen
}) => (
  <div className={style.container}>
    <div className={style.filters}>
      <p>Filter By:</p>
      <Toggle value={isOpen} label="Open Now" onClick={onLocalFilter('isOpen')}/>
      <DropDown
        onChange={onLocalFilter('price')}
        value={price}
        label="Price"
        options={['All', ...prices]}
      />
      <DropDown
        onChange={onApiFilter('categories')}
        value={category}
        label="Categories"
        options={['All', ...categories]}
      />
    </div>
    <Button label="Clear All" onClick={() => {
      onLocalFilter('price')('All')
      onApiFilter('categories')('All')
    }}/>
  </div>
)

Filter.defaultProps = {
  category: 'All',
  categories: [],
  price: 'All',
  prices: ['$', '$$', '$$$', '$$$$']
}

export default Filter;
