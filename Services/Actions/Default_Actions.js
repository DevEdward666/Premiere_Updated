import * as signalR from "@microsoft/signalr";
import { PermissionsAndroid } from "react-native";
import {
  REQUEST_CALLBACK,
  BASE_URL, GET_DEVICE, GET_NOTIF, GET_NOTIFICATION_LIST, GET_NOTIFICATION_LIST_ALL, PASSBASE_STATUS, QUEUE_BASE_URL, SET_BARANGAY, SET_CAMERA, SET_CITY, SET_CIVIL_STATUS, SET_DEPARTMENT, SET_HEADER_HIDE, SET_LIBRARY, SET_LOADED, SET_NATIONALITY, SET_NOTIFICATION_OFFSET, SET_OFFSET, SET_OPEN_BOTTOMSHEET, SET_PROCEDURE, SET_PROVINCE, SET_REFRESHING, SET_REGION, SET_RELIGION, SET_TESTIMONIALS, SET_TOKEN, SHOW_ALERT, SIGNALR_CONNECT,
  SIGNALR_CONNECT_NOTIFY,
  SIGNALR_CONNECT_NOTIFY_FROM_QUEUE, SPINNER_ALERT,REFRESH_PAYMENT
} from "../Types/Default_Types";
import { SET_APPOINTMENT_MESSAGE } from "../Types/Diagnostic_Types";
export const action_GET_region = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getregion`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_REGION,
        payload: res.data,
      });
    });
};

export const action_GET_province = (region_code) => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getprovince`;

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      region_code: region_code,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: SET_PROVINCE,
        payload: res.data,
      });
    });
};

export const action_GET_city =
  (region_code, province_code) => async (dispatch) => {
    var url = `${BASE_URL}/api/default/getcity`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region_code: region_code,
        province_code: province_code,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: SET_CITY,
          payload: res.data,
        });
      });
  };

export const action_GET_barangay =
  (region_code, province_code, city_code) => async (dispatch) => {
    var url = `${BASE_URL}/api/default/getbarangay`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region_code: region_code,
        province_code: province_code,
        city_code: city_code,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: SET_BARANGAY,
          payload: res.data,
        });
      });
  };

export const action_GET_department = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getDepartments`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DEPARTMENT,
        payload: res.data,
      });
    });
};

export const action_GET_nationality = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getnationality`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_NATIONALITY,
          payload: res.data,
        });
      }
    });
};

export const action_GET_civilstatus = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getcivilstatus`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_CIVIL_STATUS,
          payload: res.data,
        });
      }
    });
};

export const action_GET_religion = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getreligion`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_RELIGION,
          payload: res.data,
        });
      }
    });
};
export const action_GET_procedure = (search) => async (dispatch) => {
  const bodysearch = null;
  if (search === "") {
    search = bodysearch;
  }
  var url = `${BASE_URL}/api/default/getProcedures`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      procedure: search,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_PROCEDURE,
          payload: res.data,
        });
      }
    });
};
export const action_GET_testimonials = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/gettestimonials`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_TESTIMONIALS,
        payload: res.data,
      });
    });
};
export const action_GET_notications = (name, offset) => async (dispatch) => {
  let isUnmount = false;
  var url = `${BASE_URL}/api/default/getnotications`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_NOTIFICATION_LIST,
        payload: { data: res.data, loading: res.success },
      });
    });
};
export const action_GET_notications_all =
  (name, offset) => async (dispatch) => {

    var url = `${BASE_URL}/api/default/getnotications`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_NOTIFICATION_LIST_ALL,
          payload: { data: res.data, loading: res.success },
        });
      });
  };
export const action_SET_notications =
  (title, body, priority, audience, created_by) => async (dispatch) => {
    var url = `${BASE_URL}/api/default/insertNotifications`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        priority: priority,
        audience: audience,
        created_by: created_by,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        try {
          responseData = await response.json();
        } catch (e) {}
      });
  };
  export const action_set_device_token =
  (user_id, token, phone_model) => async (dispatch) => {
   
    var url = `${BASE_URL}/api/default/insertFCMToken`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        token: token,
        phone_model: phone_model,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_CALLBACK,
          payload: { message: res.message, success: res.success },
        });
      });
  };
  export const Action_Send_Notification_To_Admin=
  (title, body) => async (dispatch) => {
    let formdata = new FormData();
    var url = `${BASE_URL}/api/default/getSpecificTokenAdmin`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: "ADMIN" }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res)
        let mounted = true;
        const getresponse = async () => {
          if (mounted) {
            formdata.append("title", title);
            formdata.append("body", body);
            formdata.append("isAndroiodDevice", true);
            // Array.from(res?.data).forEach((f) => {
            formdata.append("deviceId", res?.data[0]?.token);
            // });

            var url = `${BASE_URL}/api/notification/sendnotiftoworkbench`;
            await fetch(url, {
              method: "POST",
              body: formdata,
            })
              .then((response) => response.json())
              .then((res) => {
                console.log(res)
                if (res?.success) {
                  dispatch({
                    type: REQUEST_CALLBACK,
                    payload: { message: res?.message, success: res?.success },
                  });
                } else {
                  dispatch({
                    type: REQUEST_CALLBACK,
                    payload: { message: res?.message, success: res?.success },
                  });
                }
              });
          }
        };
        mounted && getresponse();
        return () => {
          mounted = false;
        };
      });
  };
export const signalr_connection = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/api/message/message`)
    .build();
  hubConnect.start();
  dispatch({ type: SIGNALR_CONNECT, payload: hubConnect });
};
export const signalr_notify_connection = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/api/notif/notify`)
    .build();
  hubConnect.start();

  dispatch({ type: SIGNALR_CONNECT_NOTIFY, payload: hubConnect });
};
export const signalr_notify_connection_from_queue = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${QUEUE_BASE_URL}/api/notifmobile/notifymobile`)
    .build();
  hubConnect.start();
  dispatch({ type: SIGNALR_CONNECT_NOTIFY_FROM_QUEUE, payload: hubConnect });
};
export const ACTION_SPINNER_ALERT = (isSpinner) => async (dispatch) => {
  dispatch({ type: SPINNER_ALERT, payload: isSpinner });
};
export const ACTION_REFRESH = (isRefresh) => async (dispatch) => {
  dispatch({ type: SET_REFRESHING, payload: isRefresh });
};
export const ACTION_OFFSET = (offset) => async (dispatch) => {
  dispatch({ type: SET_OFFSET, payload: offset });
};
export const ACTION_NOTIF = (title, body, to, type) => async (dispatch) => {
  dispatch({
    type: GET_NOTIF,
    payload: { title: title, body: body, to: to, type: type },
  });
};
export const ACTION_NOTIFICATION_OFFSET = (offset) => async (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION_OFFSET,
    payload: offset,
  });
};
export const ACTION_LOADED = (loaded) => async (dispatch) => {
  dispatch({
    type: SET_LOADED,
    payload: loaded,
  });
};
export const action_sethide_header = (hide) => async (dispatch) => {
  dispatch({
    type: SET_HEADER_HIDE,
    payload: hide,
  });
};
export const ACTION_GET_DEVICE = (device) => async (dispatch) => {
  let isUnmount = false;
  if (!isUnmount) {
    dispatch({ type: GET_DEVICE, payload: device });
  }
  return () => {
    isUnmount = true;
  };
};
export const action_open_bottomsheet = (open) => async (dispatch) => {

    dispatch({ type: SET_OPEN_BOTTOMSHEET, payload: open });
  
};
export const action_clinic_callback_reset = (alerted) => async (dispatch) => {
  dispatch({
    type: SET_APPOINTMENT_MESSAGE,
    payload: { message: "", success: false },
  });
};
export const action_diagnostic_callback_reset = (alerted) => async (dispatch) => {
  dispatch({
    type: SET_APPOINTMENT_MESSAGE,
    payload: { message: "", success: false },
  });
};
export const action_refresh = refreshed => async dispatch => {
  dispatch({type: REFRESH_PAYMENT, payload: refreshed});
};
export const action_alerted = (alerted) => async (dispatch) => {
  dispatch({ type: SHOW_ALERT, payload: alerted });
};
export const action_imagepickeroptions = (camera) => async (dispatch) => {
  dispatch({ type: SET_CAMERA, payload: camera });
};
export const action_library = (library) => async (dispatch) => {
  dispatch({ type: SET_LIBRARY, payload: library });
};
export const action_set_token = (token) => async (dispatch) => {
  dispatch({ type: SET_TOKEN, payload: token });
};
export const action_set_passbase_status = (status) => async (dispatch) => {
  dispatch({ type: PASSBASE_STATUS, payload: status });
};
export const requestLocationPermission = () => async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Premiere",
        message: "Premiere App access to your Storage ",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the storage");
    } else {
      console.log("location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
