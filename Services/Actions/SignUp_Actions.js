import {
  SET_DATA,
  SET_FIRST_INFO,
  SET_LAST_INFO,
  SET_SECOND_INFO,
  SET_THIRD_INFO,
  SET_USERNAME,
  UPDATE_INFO,
  UPDATE_INFO_IMAGE,
  DONE_SIGNUP,
  UPDATED_PROFILE,
} from "../Types/SignUp_Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";
import {
  BASE_URL,
  REGISTRATION_COMPLETE,
  SPINNER_ALERT,
} from "../Types/Default_Types";
import { Platform } from "react-native";
import { ACTION_SPINNER_ALERT } from "../Actions/Default_Actions";

const finished = false;
export const action_update_user = (username, otp) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getUserOTP`;
  const fetchdata = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      otp: otp,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: REGISTRATION_COMPLETE,
        payload: { message: res.message, success: res.success },
      });
    });
};
export const action_GET_usernameExist = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getUsernameExist`;
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
      dispatch({
        type: SET_USERNAME,
        payload: res.data,
      });
    });
};
export const action_set_firstinfo =
  (firstname, middlename, lastname, completed) => async (dispatch) => {
    dispatch({
      type: SET_FIRST_INFO,
      payload: {
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        completed: completed,
      },
    });
  };
export const action_set_secondinfo =
  (birthdate, gender, completed) => async (dispatch) => {
    dispatch({
      type: SET_SECOND_INFO,
      payload: { birthdate: birthdate, gender: gender, completed: completed },
    });
  };
export const action_set_thirdinfo =
  (email, mobile, completed) => async (dispatch) => {
    dispatch({
      type: SET_THIRD_INFO,
      payload: { email: email, mobile: mobile, completed: completed },
    });
  };
export const action_set_lastinfo =
  (username, password, completed) => async (dispatch) => {
    dispatch({
      type: SET_LAST_INFO,
      payload: { username: username, password: password, completed: completed },
    });
  };
export const action_set_imageinfo =
  (profileimage, docsimage, username) => async (dispatch) => {
    var url = `${BASE_URL}/api/user/UploadFileProfile`;
    var name = profileimage.uri.split("/").pop();
    let formdata = new FormData();
    formdata.append("FormFile", {
      uri:
        Platform.OS === "android"
          ? profileimage.uri
          : profileimage.uri.replace("file://", ""),
      name: name,
      type: profileimage.type,
    });
    formdata.append("FileName", username + ".jpg");
    formdata.append("FolderName", username);
    formdata.append("username", username);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    }).then((response) => {
      var url = `${BASE_URL}/api/user/UploadFile`;
      var name = docsimage.uri.split("/").pop();
      let formdata = new FormData();
      formdata.append("FormFile", {
        uri:
          Platform.OS === "android"
            ? docsimage.uri
            : docsimage.uri.replace("file://", ""),
        name: name,
        type: docsimage.type,
      });
      formdata.append("FileName", username + "_VerificationDocs.jpg");
      formdata.append("FolderName", username);
      formdata.append("username", username);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      }).then((response) => {});
      // dispatch({
      //   type: UPDATE_INFO_IMAGE,
      //   payload: {profileimage: profileimage, docsimage: docsimage},
      // });
    });
  };
export const action_update_info =
  (
    username,
    civil_status,
    region_code,
    religion_code,
    nationality_code,
    city_code,
    province_code,
    barangay_code,
    address,
    active,
    passbase_id,
    passbase_status
  ) =>
  async (dispatch) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("civil_status", civil_status);
    formdata.append("region_code", region_code);
    formdata.append("religion_code", religion_code);
    formdata.append("nationality_code", nationality_code);
    formdata.append("city_code", city_code);
    formdata.append("province_code", province_code);
    formdata.append("barangay_code", barangay_code);
    formdata.append("fulladdress", address);
    formdata.append("zipcode", "8000");
    formdata.append("active", active);
    formdata.append("passbase_id", passbase_id);
    formdata.append("passbase_status", passbase_status);

    await fetch(`${BASE_URL}/api/users/updateinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res?.message);
        dispatch({
          type: UPDATE_INFO,
          payload: { message: res.message, success: res.success },
        });
      });
  };
// RNFetchBlob.fetch(
//   'POST',
//   url,
//   {accept: '*/*', 'Content-Type': 'multipart/form-data'},

//   [
//     {
//       data: formdata._parts,
//     },
//   ],
// )
//   .then((res) => {
//     var tempMSG = res.data;

//     tempMSG = tempMSG.replace(/^"|"$/g, '');

//     Alert.alert(tempMSG);
//     // the conversion is done in native code
//     // let base64Str = res.base64();
//     // dispatch({
//     //   type: SET_IMAGE_USERS,
//     //   payload: base64Str,
//     // });
//     // // the following conversions are done in js, it's SYNC
//     // let text = res.text();
//     // let json = res.json();
//   })
//   // Status code is not 200
//   .catch((errorMessage, statusCode) => {
//     // error handling
//   });
// };
export const action_SignUp_user =
  (
    firstname,
    middlename,
    lastname,
    gender,
    birthdate,
    mobileno,
    email,
    username,
    password
  ) =>
  async (dispatch) => {
    const mobile = mobileno.split("+").join("");
    const value = await AsyncStorage.getItem("tokenizer");
    var url = `${BASE_URL}/api/user/addnewuser`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // 'Content-Type': 'multipart/form-data',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        gender: gender,
        birthdate: birthdate,
        mobileno: mobile,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        AsyncStorage.setItem("username", username);
        if (res.success) {
          dispatch({
            type: DONE_SIGNUP,
            payload: { data: res.data, done: res.success },
          });

          // var url = `${BASE_URL}/api/user/UploadFileProfile`;
          // var name = responseProfile.uri.split('/').pop();
          // let formdata = new FormData();
          // formdata.append('FormFile', {
          //   uri:
          //     Platform.OS === 'android'
          //       ? responseProfile.uri
          //       : responseProfile.uri.replace('file://', ''),
          //   name: name,
          //   type: responseProfile.type,
          // });
          // formdata.append('FileName', username + '.jpg');
          // formdata.append('FolderName', username);
          // fetch(url, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //   },
          //   body: formdata,
          // })
          //   .then((response) => {
          //     var url = `${BASE_URL}/api/user/UploadFile`;
          //     var name = responseVerfication.uri.split('/').pop();
          //     let formdata = new FormData();
          //     formdata.append('FormFile', {
          //       uri:
          //         Platform.OS === 'android'
          //           ? responseVerfication.uri
          //           : responseVerfication.uri.replace('file://', ''),
          //       name: name,
          //       type: responseVerfication.type,
          //     });
          //     formdata.append('FileName', username + '_VerificationDocs.jpg');
          //     formdata.append('FolderName', username);
          //     fetch(url, {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'multipart/form-data',
          //       },
          //       body: formdata,
          //     })
          //       .then((response) => {
          AsyncStorage.setItem("mobileno", mobileno);
          var url = `${BASE_URL}/api/email/sendOTP?toname=${username}&&to=${email}&&otp=${res.other_info}`;
          fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          // })
          // .catch((err) => {
          //   alert(err);
          // });
          // })
          // .catch((err) => {
          //   alert(err);
          // });
        } else {
          dispatch({
            type: DONE_SIGNUP,
            payload: { data: res.data, done: res.success },
          });

          alert(res?.message);
          console.log(res);
        }
      });
  };

export const UploadProfile = (responseProfile) => async (dispatch) => {
  const username = await AsyncStorage.getItem("username");
  var url = `${BASE_URL}/api/user/UploadFileProfile`;
  let formdata = new FormData();
  formdata.append("FileName", username);
  formdata.append("username", username);
  formdata.append("profile_image", responseProfile);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATED_PROFILE,
        payload: { message: res?.message, success: res.success },
      });
    });
};
export const reset_update_profile_callback = () => async (dispatch) => {
  dispatch({
    type: UPDATED_PROFILE,
    payload: { message: "", success: false },
  });
};
export const UploadFile = (responseFile) => async(dispatch) => {
  const username = await AsyncStorage.getItem("username");
  var url = `${BASE_URL}/api/user/UploadFile`;
  let formdata = new FormData();
  formdata.append("FileName", username + "_VerificationDocs.jpg");
  formdata.append("username", username);
  formdata.append("Document_file", responseFile);
  console.log(responseFile)
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((res) => {

      dispatch({
        type: UPDATED_PROFILE,
        payload: { message: res?.message, success: res.success },
      });
    });
};
