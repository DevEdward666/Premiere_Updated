import {
  SET_DATA,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
  SET_DATA_DIAGNOSTIC,
  SET_APPOINTMENT_MESSAGE,
  TOGGLE_ENABLED,
} from "../Types/Diagnostic_Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Types/Default_Types";
export const action_POST_appointment =
  (premid, reason, req_total_cost, proccode, selecteddocs) =>
  async (dispatch) => {
    const i = 0;
    let formdata = new FormData();
    formdata.append("premid", premid);
    formdata.append("reason", reason);
    formdata.append("req_total_cost", req_total_cost);
    proccode?.map((p, index) => {
      formdata.append(`listofprocedures[${index}].proccode`, p?.proccode);
      formdata.append(`listofprocedures[${index}].procdesc`, p?.procdesc);
      formdata.append(`listofprocedures[${index}].proccost`, p?.proccost);
    });
    // formdata.append('listofprocedures', proccode);
    selecteddocs.map((f) => {
      formdata.append("attach_req_files", f);
    });
    await fetch(`${BASE_URL}/api/users/addDiagnosticAppointment`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_APPOINTMENT_MESSAGE,
          payload: { message: res.message, success: res.success },
        });
      });
  };

export const action_POST_appointment_others =
  (
    premid,
    prefix,
    firstname,
    middlename,
    lastname,
    suffix,
    gender,
    civilstatusvalue,
    civilstatuslabel,
    nationality,
    religion,
    birthdate,
    email,
    mobile,
    fulladdress,
    barangay,
    province,
    city,
    region,
    psgc,
    req_total,
    zipcode,
    reasons,
    appointmentprocedure,
    selecteddocs
  ) =>
  async (dispatch) => {
    let formdata = new FormData();
    formdata.append("premid", premid);
    formdata.append("prefix", prefix);
    formdata.append("firstname", firstname);
    formdata.append("middlename", middlename);

    formdata.append("lastname", lastname);
    formdata.append("suffix", suffix);
    formdata.append("gender", gender);
    formdata.append("civil_status_key", civilstatusvalue);

    formdata.append("civil_status_desc", civilstatuslabel);
    formdata.append("nationality_code", nationality);
    formdata.append("religion_code", religion);
    formdata.append("birthdate", birthdate);

    formdata.append("email", email);
    formdata.append("mobile", mobile);
    formdata.append("fulladdress", fulladdress);
    formdata.append("barangay", barangay);

    formdata.append("province_code", province);
    formdata.append("city_code", city);
    formdata.append("region_code", region);
    formdata.append("psgc_address", psgc);

    formdata.append("req_total", req_total);
    formdata.append("zipcode", zipcode);
    formdata.append("reasons", reasons);
    appointmentprocedure.map((p, index) => {
      formdata.append(`listofprocedures[${index}].proccode`, p?.proccode);
      formdata.append(`listofprocedures[${index}].procdesc`, p?.procdesc);
      formdata.append(`listofprocedures[${index}].proccost`, p?.proccost);
    });
    selecteddocs.map((f) => {
      formdata.append("attach_req_files", f);
    });
    await fetch(`${BASE_URL}/api/users/addDiagnosticAppointmentOthers`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_APPOINTMENT_MESSAGE,
          payload: { message: res.message, success: res.success },
        });
      });
  };

export const action_GET_diagnostics_request_finished =
  (premid, offset) => async (dispatch) => {
    var url = `${BASE_URL}/api/diagnostics/getAppointmentsRequestTableFinished`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        premid: premid,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_DATA_FINISHED,
          payload: res.data,
        });
      });
  };

export const action_GET_diagnostics_request =
  (premid, offset) => async (dispatch) => {
    var url = `${BASE_URL}/api/diagnostics/getAppointmentsRequestTable`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        premid: premid,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_DATA_DIAGNOSTIC,
          payload: res.data,
        });
      });
  };

export const action_GET_diagnostics_resultlist =
  (premid, offset) => async (dispatch) => {
    var url = `${BASE_URL}/api/diagnostics/getAppointmentsResultsList`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        premid: premid,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        try {
          responseData = await response.json();
        } catch (e) {
          dispatch({
            type: SET_DATA_RESULT,
            payload: res.data,
          });
        }
      });
  };

export const TOGGLE_SWITCH = (isEnabled) => async (dispatch) => {
  dispatch({ type: TOGGLE_ENABLED, payload: isEnabled });
};
