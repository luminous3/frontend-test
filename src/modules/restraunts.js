import get from './get'
import { YELP_TOKEN } from '../config.js'

const baseConfig = {
  headers: {
    'Authorization': `Bearer ${YELP_TOKEN}`,
  },
}

export const fetchRestaurants = (params) =>
  get(
    '/v3/businesses/search',
    { ...baseConfig, params },
    (resp) => resp.data.businesses
  )

export const fetchRestaurant = (id) =>
  get(
    `/v3/businesses/${id}`,
    baseConfig,
    (resp) => resp.data
  )

export const fetchReviews = (id) =>
  get(
    `/v3/businesses/${id}/reviews`,
    baseConfig,
    (resp) => resp.data.reviews
  )
