import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_TOKEN } from '../../config.js';

export class MapContainer extends Component {
  render() {
    const { google, lat, lng, style } = this.props;

    return (
      <Map
        style={style}
        google={google}
        center={{
           lat,
           lng
         }}
        zoom={14}
      >
        <Marker
          position={{
           lat,
           lng
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_TOKEN)
})(MapContainer)
