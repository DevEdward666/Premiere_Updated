import {BASE_URL, PASSBASE_BASE_URL_IDENTITIES} from '../Types/Default_Types';
import {
  PASSBASE_PUBLIC_KEY,
  PASSBASE_SECRET_KEY,
  PASSBASE_SINGLE_DATA,
  PASSBASE_ID,
} from '../Types/PassbaseTypes';
import {DONE_PASSBASE} from '../Types/SignUp_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const action_passbase_get_single_info = (id) => async (dispatch) => {
  var url = `${PASSBASE_BASE_URL_IDENTITIES}${id}`;
  await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': PASSBASE_SECRET_KEY,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: PASSBASE_SINGLE_DATA,
        payload: res,
      });
    });
};

export const action_passbase_id = (id) => async (dispatch) => {
  dispatch({
    type: PASSBASE_ID,
    payload: id,
  });
};

export const action_insert_passbase_id = (id, username) => async (dispatch) => {
  let formdata = new FormData();
  formdata.append('passbase_id', id);
  formdata.append('passbase_status', 'processing');
  formdata.append('active', false);
  formdata.append('username', username);

  await fetch(`${BASE_URL}/api/users/updatepassbase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: DONE_PASSBASE,
        payload: {message: res.message, success: res.success},
      });
    });
};

export const action_passbase_prompt_reset = () => async (dispatch) => {
  dispatch({
    type: DONE_PASSBASE,
    payload: {message: '', success: false},
  });
};
