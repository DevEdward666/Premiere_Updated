import {
  SET_SERVICES,
  SET_IMAGE_SERVICES,
  GET_SERVICES_INFO,
  GET_SERVICES_DESC,
  GET_SERVICE_ID,
  GET_SERVICE_INFO_ID,
} from '../Types/Services_Types';
import {BASE_URL} from '../Types/Default_Types';
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const action_GET_Services = (offset) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;

  var url = `${BASE_URL}/api/services/getServices`;
  await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_SERVICES,
          payload: res.data,
        });
      }
    });
};

export const action_GET_Services_Desc = (service_id) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;

  var url = `${BASE_URL}/api/services/getservicesdesc`;
  await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: service_id,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_SERVICES_DESC,
        payload: res.data,
      });
    });
};
export const action_set_service_id = (service_id) => (dispatch) => {
  dispatch({
    type: GET_SERVICE_ID,
    payload: service_id,
  });
};
export const action_set_service_info_id = (service_info_id) => (dispatch) => {
  dispatch({
    type: GET_SERVICE_INFO_ID,
    payload: service_info_id,
  });
};
export const action_GET_Services_Info = (service_desc_id) => async (
  dispatch,
) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;

  var url = `${BASE_URL}/api/services/getservicesinfo`;
  await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_desc_id: service_desc_id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_SERVICES_INFO,
        payload: res.data,
      });
    });
};
export const action_GET_Servicesimage = (imgname) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/services/getimage?imgname=${imgname}`;
  await RNFetchBlob.fetch('POST', url, {
    Authorization: bearer,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
    // when response status code is 200
    .then(async (res) => {
      // the conversion is done in native code
      let base64Str = res.base64();
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_IMAGE_SERVICES,
          payload: base64Str,
        });
      }

      // the following conversions are done in js, it's SYNC
      let text = res.text();
      let json = res.json();
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      // error handling
    });
};
