import {
  GET_GENERATOR_REGULAR,
  GET_COUNTER_QUEUE,
  SET_COUNTER,
  GET_WAITING_QUEUE,
  GET_USER_QUEUE_NUMBER,
  GET_GENERATED_NUMBER,
} from '../Types/QueueTypes';
import {BASE_URL} from '../Types/Default_Types';
export const action_counter_queue = () => async (dispatch) => {
  var url = `${BASE_URL}/api/queue/getcounterlist`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_COUNTER_QUEUE,
        payload: res.data,
      });
    });
};
export const GeneratorRegular = () => async (dispatch) => {
  var url = `${BASE_URL}/api/queue/getqueuemain`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_GENERATOR_REGULAR,
        payload: res.data,
      });
    });
};

export const generatenumberregular = (countername, prem_id) => async (
  dispatch,
) => {
  var url = `${BASE_URL}/api/queue/generatenumberkiosk`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      generated_counter: countername,
      prem_id: prem_id,
      generated_countertype: 'Regular',
    }),
  })
    .then((response) => response.json())
    .then(async (res2) => {
      dispatch({
        type: GET_GENERATED_NUMBER,
        payload: {data: res2.data, message: res2.message},
      });
      var url2 = `${BASE_URL}/api/queue/generatequeuenumber`;
      fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          counter: countername,
        }),
      })
        .then((response) => response.json())
        .then((res) => {});
    });
};

export const getuserqueuenumbers = (prem_id, countername) => async (
  dispatch,
) => {
  var url = `${BASE_URL}/api/queue/getuserqueuenumbers`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      countername: countername,
      prem_id: prem_id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_USER_QUEUE_NUMBER,
        payload: {data: res.data, loaded: res.success},
      });
    });
};

export const getwaitingqueue = (countername) => async (dispatch) => {
  var url = `${BASE_URL}/api/queue/waiting`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      countername: countername,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_WAITING_QUEUE,
        payload: {data: res.data, loaded: res.success},
      });
    });
};

export const action_set_counter = (counter) => async (dispatch) => {
  dispatch({
    type: SET_COUNTER,
    payload: counter,
  });
};
