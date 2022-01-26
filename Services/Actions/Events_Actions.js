import {BASE_URL} from '../Types/Default_Types';
import {SET_EVENTS_DATA} from '../Types/Events_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const action_GET_events = () => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/manage/getEvents`;
  await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_EVENTS_DATA,
        payload: res?.data,
      });
    });
};
