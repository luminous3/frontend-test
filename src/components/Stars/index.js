import React, { PureComponent } from 'react';
import uniqueId from 'lodash/uniqueId';
import Icon from 'components/Icon';
import style from './stars.css';

const Stars = ({ number }) => {
  let remaining = 5;
  const stars = []
  const fullStars = Math.floor(number);

  // Add Full Stars
  if (number > 0) {
    for (let i = 0; i < number - 1; i++) {
      remaining--
      stars.push(<Icon name="fullStar" id={`fullStar_${uniqueId()}`} />)
    }
  }

  // Add Half Star
  if (number % 1 !== 0) {
    remaining--
    stars.push(<Icon name="halfStar" id={`halfStar_${uniqueId()}`} />);
  }

  // Add Empty Stars
  for (let i = 0; i < remaining; i++) {
    stars.push(<Icon name="emptyStar" id={`emptyStar_${uniqueId()}`} />)
  }

  return (
    <div className={style.container}>
      {stars}
    </div>
  )
}

export default Stars;
