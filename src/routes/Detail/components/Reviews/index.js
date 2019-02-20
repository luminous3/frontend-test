import React from 'react';
import Image from 'components/Image';
import Stars from 'components/Stars';
import style from './reviews.css';
import moment from 'moment';
const Review = ({
  user,
  timeCreated,
  text,
  rating
}) => (
  <div className={style.reviewContainer}>
    <div className={style.user}>
      <Image src={user.image_url} className={style.avatar} />
      <div className={style.userInfo}>
        <h3>{user.name}</h3>
        <p className={style.emphasizeSmall}>
          {moment(timeCreated).format('MM/DD/YYYY')}
        </p>
      </div>

    </div>
    <div className={style.reviewText}>
      <Stars number={rating} />
      <p>{text}</p>
    </div>
  </div>
)

const Reviews = ({ number, reviews = [] }) => (
  <div className={style.reviewsContainer}>
    <p className={style.emphasize}>
      {number} Reviews
    </p>
    {
      reviews.map(({ user, id, time_created, text, rating }) => (
        <Review
          key={id}
          user={user}
          timeCreated={time_created}
          text={text}
          rating={rating}
        />
      ))
    }
  </div>
)

export default Reviews;
