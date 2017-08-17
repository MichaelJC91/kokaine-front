import axios from 'axios';
import { GET_ALL_TASKS, GET_SINGLE_TASK, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../types';
import history from '../../config/history';
const ROOT_URL = 'https://kokaine.staging.bid';

export const getAllTasks = () => {
  console.log(this)

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

export const getTaskFromID = (taskID) => {
  const TOKEN = localStorage.getItem('token');
  console.log("TaskID Action:", taskID);

  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/tasks/${taskID}?token=${TOKEN}`)
      .then(response => {

        console.log("TaskID response:", response)

        //Extract task object from response
        const { task } = response.data;

        // Dispatch single task to reducer
        dispatch({ type: GET_SINGLE_TASK, payload: task });

      })
      .catch(err => console.log(err));
  }
}

export const updateTask = (task) => {
  const TOKEN = localStorage.getItem('token');

  const { name, description } = task;
  const updatedTaskData = { name, description };

  return function(dispatch) {
    axios.put(`${ROOT_URL}/api/tasks/${task.id}?token=${TOKEN}`, updatedTaskData)
      .then((response) => {

        const { task } = response.data;
        dispatch({ type: UPDATE_TASK, payload: task })

        history.push('/dashboard/tasks');

      })
      .catch(err => console.log(err))
  }
}

// action called when clicked on "edit contact" in contacts component
export const selectTask = (task) => {
  console.log(task)
  return function(dispatch) {
    dispatch({ type: GET_SINGLE_TASK, payload: task })
  }
}

export const createTask = (task) => {
  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {

    axios.post(`${ROOT_URL}/api/tasks?token=${TOKEN}`, task)
      .then((response) => {

        const { task } = response.data;

        dispatch({ type: CREATE_TASK, payload: task });

        history.push('/dashboard/tasks');

      })
      .catch(err => console.log(err));
  }
}
