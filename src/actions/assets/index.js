import axios from 'axios';
import { GET_ALL_ASSETS } from '../types';
import history from '../../config/history';
const ROOT_URL = 'https://kokaine.staging.bid';

export function getAllAssets() {
  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/assets?token=${TOKEN}`)
      .then(response => {
        const { assets } = response.data;
        dispatch({ type: GET_ALL_ASSETS, payload: assets })
      })
      .catch(err => console.log(err))
  }
}
