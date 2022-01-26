import {GET_MESSAGES, SET_MESSAGES} from '../Types/SignalRTypes';
import {BASE_URL} from '../Types/Default_Types';
export const action_GET_messages = (from, to, offset) => async (dispatch) => {
  var url = `${BASE_URL}/api/messages/getmessages`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      receiver: from,
      sender: to,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_MESSAGES,
        payload: {data: res.data, loading: res.success},
      });
    });
};
export const action_send_messages = (message, from, to) => async (dispatch) => {
  var url = `${BASE_URL}/api/messages/sendmessage`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      receiver: from,
      sender: to,
    }),
  })
    .then((response) => response.json())
    .then((res) => {});
};
export const action_send_signal = (data) => async () => {
  var url = `${BASE_URL}/api/message`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: data.message,
      from: data.from,
      to: data.to,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {});
};
export const action_notify_signal = (data) => async () => {
  var url = `${BASE_URL}/api/notification`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notification: data.notification,
      from: data.from,
      to: data.to,
      img: data.img,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {});
};
export const action_set_message = (message) => async (dispatch) => {
  dispatch({type: SET_MESSAGES, payload: message});
};
