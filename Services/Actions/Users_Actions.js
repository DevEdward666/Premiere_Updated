import {
  SET_DATA_USERS,
  SET_IMAGE_USERS,
  SET_DOCIMAGE_USERS,
  GET_LINK_MESSAGE,
  SET_PIN,
  SET_LOCKED,
  SET_QR_USER,
} from "../Types/User_Types";
import SplashScreen from "react-native-splash-screen";
import { BASE_URL, REQUEST_CALLBACK } from "../Types/Default_Types";
import RNFetchBlob from "react-native-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";
var RNFS = require("react-native-fs");
const controller = new AbortController();
export const action_get_current_otp = (username,otp) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getcurrentotp`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username:username,
      otp: otp,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
     if(res?.success){
      dispatch({
        type: REQUEST_CALLBACK,
        payload: { message: res?.message, success: res?.success },
      });
      Actions.reset_password();
     }
  
    });
};
export const action_send_otp_for_reset = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/OTP_for_UpdatePassword`;
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
    .then((res) => {
      if(res?.success){
      dispatch({
        type: REQUEST_CALLBACK,
        payload: { message: res?.message, success: res?.success },
      });
      Actions.otp_reset_password();
    }
    });
};
export const action_UPDATE_password =
  (username, password) => async (dispatch) => {
    var url = `${BASE_URL}/api/user/update_password`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_CALLBACK,
          payload: { message: res?.message, success: res?.success },
        });
      });
  };
export const action_GET_userdetails = () => async (dispatch) => {
  const value = await AsyncStorage.getItem("username");
  var url = `${BASE_URL}/api/user/getUserInfo`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: value,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA_USERS,
        payload: res.data,
      });
    });
};
export const action_GET_userpin = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getuserpin`;
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
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_PIN,
          payload: res.data?.pin,
        });
      }
      // console.log('users' + res.username);
    })
    .catch(() => {
      return controller.abort();
    });
};
export const action_update_userlocked = (username, locked) => async () => {
  var url = `${BASE_URL}/api/user/updatelockeduser`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      islocked: locked,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {}
      // console.log('users' + res.username);
    })
    .catch(() => {
      return controller.abort();
    });
};
export const action_setqr = () => async (dispatch) => {
  const value = await AsyncStorage.getItem("username");
  if (value !== null) {
    var url = `${BASE_URL}/api/user/getusersqr`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: value,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: SET_QR_USER,
          payload: { qrbase64: res.data },
        });
      });
  } else {
    SplashScreen.hide();
  }
};
export const action_SET_LinkRequest =
  (patno, prem_id, status) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/InsertLinkRequest`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patno: patno,
        prem_id: prem_id,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        try {
          responseData = await response.json();
        } catch (e) {
          dispatch({
            type: GET_LINK_MESSAGE,
            payload: res.message,
          });
        }

        // console.log('users' + res.username);
      })
      .catch(() => {
        return controller.abort();
      });
  };
export const action_GET_Docs = (filename) => async (dispatch) => {
  let mounted = true;
  const getfiles = async () => {
    if (mounted) {
      var url = `${BASE_URL}/api/user/getimageDocs?filename=${filename}`;
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (res) => {
          dispatch({
            type: SET_DOCIMAGE_USERS,
            payload: res.message,
          });
        });
    }
  };
  mounted && getfiles();
  return () => {
    mounted = false;
  };
};
export const action_GET_Profileimage = (filename) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getimage?filename=${filename}`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: SET_IMAGE_USERS,
        payload: res.message,
      });

      // console.log('users' + res.username);
    });
};

export const action_SET_files = (Base64) => async () => {
  // const paths = `${RNFetchBlob.fs.dirs.DCIMDir}/${new Date().getTime()}.jpg`; // where u need to put that

  var path = `${RNFS.PicturesDirectoryPath}/SafeDavaoQr/SafeDavaoQr.jpg`;

  try {
    const filepath = `${path}`;

    RNFS.exists(filepath)
      .then((result) => {
        if (result) {
          return (
            RNFS.unlink(filepath)
              .then(() => {
                RNFS.writeFile(path, Base64, "base64") //data.base64 is your photo with convert base64
                  .then((value) => {
                    // try {
                    //   RNFS.scanFile(paths) //after save to notify gallry for that
                    //     .then(() => {
                    //       console.log('scan file success');
                    //     })
                    //     .catch((err) => {
                    //       console.log('scan file error');
                    //     });
                    // } catch (error) {
                    //   console.log('fileerror', error.message);
                    // }
                  })
                  .catch((e) => console.log(e.message));
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch((err) => {
                console.log(err.message);
              })
          );
        } else {
          RNFS.writeFile(path, Base64, "base64") //data.base64 is your photo with convert base64
            .then((value) => {
              // try {
              //   RNFS.scanFile(paths) //after save to notify gallry for that
              //     .then(() => {
              //       console.log('scan file success');
              //     })
              //     .catch((err) => {
              //       console.log('scan file error');
              //     });
              // } catch (error) {
              //   console.log('fileerror', error.message);
              // }
            })
            .catch((e) => console.log(e.message));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log("fileerror", error.message);
  }
};
