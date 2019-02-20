import React from 'react';
import get from 'lodash/get';
import Map from 'components/Map';
import Image from 'components/Image';
import style from './generalInfo.css'

const GeneralInfo = ({
  coordinates,
  photos,
  location
}) => (
    <div className={style.details}>
      <div className={style.row1}>
        <div className={style.map}>
          <Map
            style={{width: '100%', height: '100%'}}
            lat={get(coordinates, 'latitude')}
            lng={get(coordinates, 'longitude')}
          />
        </div>
        <Image loading={!get(photos, '[0]')} src={get(photos, '[0]')} className={style.imageOne} />
        <Image loading={!get(photos, '[1]')} src={get(photos, '[1]')} className={style.imageTwo} />
      </div>
      <div className={style.row2}>
        <p>
          {`${get(location, 'address1')} ${get(location, 'city')}, ${get(location, 'state')} ${get(location, 'zip_code')}`}
        </p>
      </div>
    </div>
)

export default GeneralInfo;
