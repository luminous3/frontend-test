import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';
import style from './businessCard.css';

class BusinessCard extends PureComponent {
  render() {
    return (
      <div className={style.container} >
        <ContentLoader height={900} width={450}>
          <rect x="0" y="0" rx="5" ry="5" width="450" height="450" />
          <rect x="0" y="470" rx="4" ry="4" width="450" height="45" />
          <rect x="0" y="540" rx="4" ry="4" width="450" height="45" />
          <rect x="0" y="610" rx="4" ry="4" width="100" height="45" />
          <rect x="350" y="610" rx="4" ry="4" width="100" height="45" />
          <rect x="0" y="800" rx="4" ry="4" width="450" height="100" />
        </ContentLoader>
      </div>
    )
  }
}

export default BusinessCard;
