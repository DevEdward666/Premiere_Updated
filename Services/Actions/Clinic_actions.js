import {
  SET_DATA,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
  SET_DATA_CLINIC,
  SET_APPOINTMENT_MESSAGE,
  TOGGLE_ENABLED,
  CREATE_SOURCE,
  PAYMENT_DONE,
  CONSULTATION_TABLE,
  CONSULTATION_TABLE_OFFSET,
  CONSULTATION_TABLE_STATUS,
  LINK_CONSULT_MESSAGE,
  LINK_CONSULT_DETAILS,
  DONE_LINK_CONSULT_MESSAGE,
  CONSULT_INFO,
  SET_APPOINTMENT_DTLS
} from "../Types/Clinic_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, RETRIEVE_SOURCE } from "../Types/Default_Types";
import { Linking } from "react-native";
import { Actions } from "react-native-router-flux";

export const action_POST_clinic_appointment =
  (
    imagepath,
    imagename,
    premid,
    department,
    complaint,
    symptomps,
    remarks,
    selecteddocs
  ) =>
  async (dispatch) => {
    let formdata = new FormData();
    formdata.append("imagename", imagename);
    formdata.append("imagpath", imagepath);
    formdata.append("premid", premid);
    formdata.append("assign_dept_pk", department);
    formdata.append("complaint", complaint);
    formdata.append("symptomps", symptomps);
    formdata.append("notes", remarks);
    selecteddocs.map((f) => {
      formdata.append("consultation_files", f);
    });

    console.log(remarks, department, symptomps);
    await fetch(`${BASE_URL}/api/users/addClinicAppointment`, {
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
          payload: {
            data: res.data,
            message: res.message,
            success: res.success,
          },
        });
        console.log(res);
      });
  };

export const action_POST_appointment_others =
  (
    citylabel,
    regiondesc,
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
    complaint,
    symptomps,
    remarks,
    department,
    selecteddocs
  ) =>
  async (dispatch) => {
    let formdata = new FormData();
    formdata.append("line1", fulladdress);
    formdata.append("line2", psgc);
    formdata.append("citylabel", citylabel);
    formdata.append("regiondesc", regiondesc);
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
    formdata.append("province", province);
    formdata.append("city_code", city);
    formdata.append("region_code", region);
    formdata.append("psgc_address", psgc);
    formdata.append("req_total", req_total);
    formdata.append("zipcode", zipcode);
    formdata.append("complaint", complaint);
    formdata.append("symptoms", symptomps);
    formdata.append("notes", remarks);
    formdata.append("assign_dept_pk", department);
    selecteddocs.map((f) => {
      formdata.append("consultation_files", f);
    });
    await fetch(`${BASE_URL}/api/users/addClinicAppointmentOthers`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          dispatch({
            type: SET_APPOINTMENT_MESSAGE,
            payload: {
              data: [
                {
                  appointment_id: res?.other_info,
                  firstname: firstname,
                  middlename: middlename,
                  lastname: lastname,
                  regiondesc: regiondesc,
                  citymundesc: citylabel,
                  zipcode: zipcode,
                  line1: fulladdress,
                  line2: psgc,
                  email: email,
                  mobileno: mobile,
                },
              ],
              message: res.message,
              success: res.success,
            },
          });
        } else {
          alert("Something Went Wrong");
        }
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
          type: SET_DATA_CLINIC,
          payload: res.data,
        });
      });
  };

export const createsource =
  (
    consultpk,
    type,
    currency,
    amount,
    description,
    statement_descriptor,
    billingaddress,
    billingredirect
  ) =>
  async (dispatch) => {
    var url = `${BASE_URL}/api/paymongo/EWalletCreateSource`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consult_req_pk: consultpk,
        type: type,
        currency: currency,
        amount: amount,
        description: description,
        statement_descriptor: statement_descriptor,
        billing: billingaddress,
        redirect: billingredirect,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data !== undefined) {
          const words = res.data.split("=");
          dispatch({
            type: CREATE_SOURCE,
            payload: { source: words[1], status: res.other_info },
          });
          Linking.openURL(res.data);
          console.log(res.other_info);
        }
      });
  };
export const reset = () => (dispatch) => {
  dispatch({
    type: CREATE_SOURCE,
    payload: { source: "", status: "" },
  });
};
export const createpayment = (paymentdata, sourceid) => async (dispatch) => {
  var url = `${BASE_URL}/api/paymongo/EWalletPaidWebHook`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: paymentdata,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: PAYMENT_DONE,
        payload: res.data,
      });
      dispatch({
        type: CREATE_SOURCE,
        payload: { source: "", status: "" },
      });
    });
};
export const consultation_table =
  (premid, status, offset) => async (dispatch) => {
    var url = `${BASE_URL}/api/clinic/consultationTable`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        premid: premid,
        status: status,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: CONSULTATION_TABLE,
          payload: { data: res.data, loaded: res.success },
        });
      });
  };
export const action_Link_Consultation =
  (username, fullname, email, consult_req_pk) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/Link_Consultation`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        fullname: fullname,
        email: email,
        consult_req_pk: consult_req_pk,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: LINK_CONSULT_MESSAGE,
          payload: { message: res.message, success: res.success },
        });
      });
  };
export const action_Link_OTP =
  (username, prem_id, consult_req_pk, otp) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/LinkOTPCosult`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        prem_id: prem_id,
        consult_req_pk: consult_req_pk,
        otp: otp,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        dispatch({
          type: DONE_LINK_CONSULT_MESSAGE,
          payload: { message: res.message, success: res.success },
        });
      });
  };
export const action_InsertLink_OTP =
  (username, fullname, email) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/InsertLinkOTP`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        fullname: fullname,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  };
export const consultation_dtls =
  (premid, consult_req_pk) => async (dispatch) => {
    var url = `${BASE_URL}/api/clinic/consultationDtls`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        premid: premid,
        consult_req_pk: consult_req_pk,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        await dispatch({
          type: SET_APPOINTMENT_DTLS,
          payload: {
            data: res.data,
            message: res.message,
            success: res.success,
          },
        });
        console.log(res.data);
        Actions.consultinfo();
        // await Actions.mainpayment();
      });
  };
export const consultation_info =
  (premid, consult_req_pk) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/getConsultInfo`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prem_id: premid,
        consult_req_pk: consult_req_pk,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: CONSULT_INFO,
          payload: { data: res.data, success: res.success },
        });
      });
  };

export const action_link_details =
  (fullname, email, username, consult_req_pk) => (dispatch) => {
    dispatch({
      type: LINK_CONSULT_DETAILS,
      payload: {
        fullname: fullname,
        email: email,
        username: username,
        consult_req_pk: consult_req_pk,
      },
    });
  };
export const LoadMoreTable = (offset) => (dispatch) => {
  dispatch({
    type: CONSULTATION_TABLE_OFFSET,
    payload: offset,
  });
};
export const ActionsetStatus = (status) => (dispatch) => {
  dispatch({
    type: CONSULTATION_TABLE_STATUS,
    payload: status,
  });
};
export const action_reset_link = () => (dispatch) => {
  dispatch({
    type: LINK_CONSULT_MESSAGE,
    payload: { message: "", success: false },
  });
};
export const action_reset_done_link = () => (dispatch) => {
  dispatch({
    type: DONE_LINK_CONSULT_MESSAGE,
    payload: { message: "", success: false },
  });
};
export const action_reset_submit = () => (dispatch) => {
  dispatch({
    type: SET_APPOINTMENT_MESSAGE,
    payload: { data: [], message: "", success: false },
  });
};
