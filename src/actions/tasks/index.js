import axios from 'axios';
import { GET_ALL_TASKS, GET_SINGLE_TASK, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../types';
import history from '../../config/history';
const ROOT_URL = 'https://kokaine.staging.bid';

export const getAllTasks = () => {

  const TOKEN = localStorage.getItem('token');

  // return function to dispatch GET_ALL_TASKS
  // with a payload of all tasks
  return function(dispatch) {

  // get request to api endpoint for all tasks
  axios.get(`${ROOT_URL}/api/tasks?token=${TOKEN}`)
    .then(response => {

      const { tasks } = response.data;

      dispatch({ type: GET_ALL_TASKS, payload: tasks });

    })
    .catch(err => console.log(err));
  }

}
