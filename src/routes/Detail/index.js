import React, { Component } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty'
import Header from 'components/Header';
import Map from 'components/Map';
import Image from 'components/Image';
import Stars from 'components/Stars';
import { fetchRestaurant, fetchReviews } from 'modules/restraunts';
import { connectState } from 'decorators/contextState';
import style from './detail.css'
import GeneralInfo from './components/GeneralInfo';
import Reviews from './components/Reviews';

@connectState(
  'business',
  (state, props) => {
    const id = get(props, 'match.params.businessId')
    return get(state, `businesses.${id}`)
  }
)
class Detail extends Component {
  state = {
    details: {},
    reviews: []
  }

  static defaultProps = {
    business: {}
  }

  constructor(props) {
    super(props);
    const id = get(props, 'match.params.businessId')
    fetchRestaurant(id).then(resp => this.setState({ details: resp }))
    fetchReviews(id).then(resp => this.setState({ reviews: resp }))
  }

  render() {
    const {
      business: {
        image_url,
        name,
        categories,
        rating,
        price,
        is_closed
      }
    } = this.props;
    const { details, reviews } = this.state;

    return (
      <div>
        <Header title={name}>
          <Stars number={rating}/>
          <div className={style.meta}>
            <span>{categories[0].title.toUpperCase()} - {price}</span>
            <div className={style.isClosed}>
              <span className={is_closed ? style.dotRed : style.dotGreen}>
                ⬤
              </span>
              <span>{is_closed ? 'CLOSED' : 'OPEN NOW'}</span>
            </div>
          </div>
        </Header>
        <GeneralInfo
          photos={details.photos}
          coordinates={details.coordinates}
          location={details.location}
        />
        <Reviews number={details.review_count} reviews={reviews} />
      </div>
    )
  }
}

export default Detail;
