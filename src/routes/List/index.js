import React, { Component } from 'react';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import uniqueId from 'lodash/uniqueId'
import slice from 'lodash/slice';
import values from 'lodash/values';
import Header from 'components/Header';
import Button from 'components/Button';
import { connectState } from 'decorators/contextState';
import { fetchRestaurants } from 'modules/restraunts';
import Filter from './components/Filter';
import BusinessCard from './components/BusinessCard';
import style from './list.css';

const DISPLAY_NUM = 12;

@connectState('businesses')
@connectState('params')
class List extends Component {
  state = {
    showing: DISPLAY_NUM,
    price: 'All',
    categories: 'All',
    filteredBusinesses: [{}, {}, {}, {}],
    formattedCategories: [],
    loading: false
  }

  componentWillMount = () => {
    this.handleFetchRestaurants()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.params !== prevProps.params) {
      this.handleFetchRestaurants()
    }
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading})
  }

  applyLocalFilters = () => {
    const { businesses } = this.props;
    const { price, isOpen } = this.state;

    // Businesses
    const allBusinesses = values(businesses);
    const pricedBusinesses = price === 'All'
      ? allBusinesses
      : filter(allBusinesses, business => business.price === price);
    const filteredBusinesses = !isOpen
      ? pricedBusinesses
      : filter(pricedBusinesses, business => !business.is_closed)

    // Categories
    const allCategories = flatten(map(values(this.props.businesses), business => business.categories));
    const formattedCategories = uniq(map(allCategories, cat => cat.alias))

    this.setState({
      filteredBusinesses,
      formattedCategories
    })
  }

  // Handlers

  handleFetchRestaurants = () => {
    const { params, setContextState } = this.props;
    this.toggleLoading()
    fetchRestaurants(params).then(data => {
      const normalized = reduce(
        data,
        (acc, datum) => ({... acc, [datum.id]: datum}),
        {}
      )
      setContextState({ businesses: normalized });
      this.applyLocalFilters();
      this.toggleLoading();
    })
  }

  handleLoadingMore = () => {
    this.setState({ showing: this.state.showing + DISPLAY_NUM })
  }

  handleLocalFilter = (key) => (value) => {
    this.setState({ [key]: value }, this.applyLocalFilters)
  }

  handleApiFilter = (key) => (value) => {
    const { params, setContextState } = this.props;
    setContextState({ params: { ...params, [key]: value } })
    this.setState({ [key]: value })
  }

  // Rendering

  renderBusinesses = () => {
    const { businesses } = this.props;
    const { showing, filteredBusinesses } = this.state;
    const visibleBusinesses = slice(filteredBusinesses, 0, showing)

    return map(visibleBusinesses, (business) => (
      <BusinessCard
        loading={this.state.loading}
        key={business.id || uniqueId()}
        id={business.id}
        imageUrl={business.image_url}
        name={business.name}
        categories={business.categories}
        rating={business.rating}
        price={business.price}
        isClosed={business.is_closed}
      />
    ))
  }

  renderLoadMoreButton = () => {
    const numShowing = this.state.showing;
    const numTotal = values(this.props.businesses).length;
    if (numShowing < numTotal) {
      return (
        <div className={style.buttonContainer}>
          <Button className={style.button} label="LOAD MORE" onClick={this.handleLoadingMore} />
        </div>
      )
    }
    return null
  }

  render() {
    const { price, categories, formattedCategories, isOpen } = this.state;

    return (
      <div>
        <Header title="Restaurants" >
          <p className={style.emphasize}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Header>
        <Filter
          category={categories}
          price={price}
          isOpen={isOpen}
          categories={formattedCategories}
          onLocalFilter={this.handleLocalFilter}
          onApiFilter={this.handleApiFilter}
        />
        <section className={style.listContainer}>
          <h2>All Restaurants</h2>
          <div className={style.list}>
            {this.renderBusinesses()}
          </div>
          {this.renderLoadMoreButton()}
        </section>
      </div>
    )
  }
}

export default List;
