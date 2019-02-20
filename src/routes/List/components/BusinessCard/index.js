import React, { PureComponent } from 'react';
import Button from 'components/Button';
import Stars from 'components/Stars';
import Image from 'components/Image';
import style from './businessCard.css';
import { Redirect } from 'react-router';
import withLoading from 'decorators/withLoading';
import LoadingComponent from './BusinessCard.loading';

@withLoading(LoadingComponent)
class BusinessCard extends PureComponent {
  state = { redirect: false }

  handleRedirect = () => {
    this.setState({ redirect: true })
  }

  render() {
    const {
      imageUrl,
      name,
      categories,
      rating,
      price,
      isClosed,
      id
    } = this.props;

    if (this.state.redirect) {
      return <Redirect push to={`/${id}`} />;
    }

    return (
      <section className={style.container}>
        <Image src={imageUrl} className={style.image} />

        <div className={style.info}>
          <h3>{name}</h3>
          <Stars number={rating}/>
          <div className={style.meta}>
            <span>{categories[0].title.toUpperCase()} - {price}</span>
            <div className={style.isClosed}>
              <span className={isClosed ? style.dotRed : style.dotGreen}>
                ⬤
              </span>
              <span>{isClosed ? 'CLOSED' : 'OPEN NOW'}</span>
            </div>
          </div>
        </div>

        <Button filled label="LEARN MORE" onClick={this.handleRedirect}/>
      </section>
    )
  }
}

export default BusinessCard;
