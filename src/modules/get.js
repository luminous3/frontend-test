import axios from 'axios';

const get = (url, config, getter) => {
  return axios
    .get(url, config)
    .then(resp => getter ? getter(resp) : resp)
    .catch(err => {
      // TODO: handle error
    })
}

export default get;
