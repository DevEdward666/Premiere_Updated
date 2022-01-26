import {
  SET_DOCTOR,
  SET_DOCTOR_INFO,
  SET_SPECIALTY,
  SET_DOCTOR_BY_SPECIALTY,
} from '../Types/Doctors_Types';
import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const action_GET_doctors = (offset) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/doctors/getdoctors`;
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
    .then((res) => {
      dispatch({
        type: SET_DOCTOR,
        payload: res.data,
      });
    });
};
export const action_GET_doctorsbySpecialty = (offset, specialty) => async (
  dispatch,
) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/doctors/getdoctorsbyspecialty`;
  const fetchdata = await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offset: offset,
      specialty: specialty,
    }),
  });
  const parseData = await fetchdata.json();
  try {
    responseData = await response.json();
  } catch (e) {
    dispatch({
      type: SET_DOCTOR_BY_SPECIALTY,
      payload: parseData.data,
    });
  }
};
export const action_GET_doctorsSpecialty = () => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');

  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/doctors/getdoctorsspecialty`;
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
        type: SET_SPECIALTY,
        payload: res.data,
      });
    });
};
export const action_GET_doctors_info = (doccode) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/doctors/getdoctorsinfo`;
  await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      doccode: doccode,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_DOCTOR_INFO,
          payload: res.data,
        });
      }
    });
};

export const action_GET_doctors_byname = (offset, specialty, name) => async (
  dispatch,
) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;

  var url = `${BASE_URL}/api/doctors/getdoctorsbyspecialtyandname`;
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
      specialty: specialty,
      name: name,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      await dispatch({
        type: SET_DOCTOR_BY_SPECIALTY,
        payload: res.data,
      });
    });
};
