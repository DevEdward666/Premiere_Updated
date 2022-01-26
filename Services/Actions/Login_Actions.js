import { SETMOBILENO, SET_DATA } from "../Types/Login_Types";
import { SET_USERNAME } from "../Types/User_Types";
import { BASE_URL, REQUEST_CALLBACK } from "../Types/Default_Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";

import { ACTION_SPINNER_ALERT } from "../Actions/Default_Actions";
export const action_Login_user = (username, password) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/login`;
  const fetchdata = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.success) {
    await AsyncStorage.setItem("tokenizer", parseData.data.access_token);
    await AsyncStorage.setItem("username", username);
    Actions.index();
  } else {
    var url = `${BASE_URL}/api/user/InserNewOTP`;
    const fetchdata = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const parseData2 = await fetchdata.json();
    if (parseData2.success) {
      var url = `${BASE_URL}/api/user/getUserMobile`;
      const fetchdata = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => response.json())
        .then(async (res) => {
          if (res?.success) {
            await AsyncStorage.setItem("mobileno", res?.data?.mobileno);
            await Actions.otp();
          }
        });
    } else {
      dispatch({
        type: REQUEST_CALLBACK,
        payload: { message: parseData2?.message, success: parseData2?.success },
      });
    }
  }
};
export const action_set_username = (username) => async (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};
export const action_GET_mobileno = (username) => async () => {
  const value = await AsyncStorage.getItem("tokenizer");
  // const API_HOST = config.REACT_APP_BASE_URL;
  // var url = `${API_HOST}/api/user/login`;
  var url = `${BASE_URL}/api/user/getUserMobile`;
  const fetchdata = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SETMOBILENO,
          payload: res.data,
        });
      }
    });
};
export const action_add_OTP = (username) => async () => {
  var url = `${BASE_URL}/api/user/deletelastOTP`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      if (res?.success) {
        var url2 = `${BASE_URL}/api/user/InserNewOTP`;
        await fetch(url2, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        })
          .then((response) => response.json())
          .then(async (res) => {
            if (res?.success) {
              alert(res.message);
            } else {
              console.log(res.message);
            }
            console.log(res);
          });
      } else {
        console.log(res.message);
      }
    });
};
export const action_addotp_for_reset_password= (username) => async () => {
  var url = `${BASE_URL}/api/user/deletelastOTP`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      if (res?.success) {
        var url2 = `${BASE_URL}/api/user/OTP_for_UpdatePassword`;
        await fetch(url2, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        })
          .then((response) => response.json())
          .then(async (res) => {
            if (res?.success) {
              alert(res.message);
            } else {
              console.log(res.message);
            }
            console.log(res);
          });
      } else {
        console.log(res.message);
      }
    });
};
