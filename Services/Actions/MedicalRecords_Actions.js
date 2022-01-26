import { BASE_URL, REMOTE_URL } from "../Types/Default_Types";
import {
  GET_SINGLE_MEDICAL_RECORDS,
  PATIENT_INFO,
} from "../Types/MedicalRecords_Types";
import { FTP_SINGLE_RESULTS } from "../Types/FTP_Types";
import RNFetchBlob from "react-native-fetch-blob";
import { FILE_NAME, FTP_RESULTS, GET_FILES } from "../Types/FTP_Types";

export const action_get_info = (data, visible) => (dispatch) => {
  dispatch({
    type: PATIENT_INFO,
    payload: { data: data, visible: visible },
  });
};

export const action_get_single_medical_records =
  (patno) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/getmedicalrecordsList`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospitalno: patno,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: GET_SINGLE_MEDICAL_RECORDS,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_get_patient_files =
  (nameofFile, prem_id, device) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/getpatientfiles`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: nameofFile,
        prem_id: prem_id,
        deviceStored: device,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        dispatch({
          type: GET_FILES,
          payload: res.data,
        });
      });
  };
export const action_get_diagnostics_results = (patno) => async (dispatch) => {
  var url = `${REMOTE_URL}api/lab-result/getLabReqResults`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: patno,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: FTP_RESULTS,
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_get_diagnostics_singleresults_pdf =
  (file_url) => async (dispatch) => {
    var url = `${BASE_URL}api/diagnostics/getLabReqPdf`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: file_url,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        try {
          responseData = await response.json();
        } catch (e) {
          dispatch({
            type: FTP_SINGLE_RESULTS,
            payload: { data: res.data, loading: true },
          });
        }
      });
  };
export const action_set_patient_files =
  (prem_id, filename, type, deviceStored) => async (dispatch) => {
    var url = `${BASE_URL}/api/users/SyncFile`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prem_id: prem_id,
        filename: filename,
        type: type,
        deviceStored: deviceStored,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        try {
          responseData = await response.json();
        } catch (e) {
          dispatch({
            type: GET_FILES,
            payload: res.data,
          });
        }
      });
  };
export const action_get_files = (nameofFile, file) => async (dispatch) => {
  const { config, fs } = RNFetchBlob;
  const date = new Date();
  let url = "";
  console.log(file);
  if (nameofFile === "SOA") {
    url = "https://www.clickdimensions.com/links/TestPDFfile.pdf";
  } else if (nameofFile === "CF") {
    url = "http://www.pdf995.com/samples/pdf.pdf";
  } else if (nameofFile === "DTR") {
    url = "http://www.orimi.com/pdf-test.pdf";
  } else if (nameofFile === "CA") {
    url = "http://www.africau.edu/images/default/sample.pdf";
  }
  const { DCIMDir } = fs.dirs; // You can check the available directories in the wiki.
  let filename = `${DCIMDir}/Premiere/${file}`;
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true, // true will use native manager and be shown on notification bar.
      notification: true,
      path: filename,
      // _${Math.floor(
      //   date.getTime() + date.getSeconds() / 2,
      // )}.pdf`,
      description: "Downloading.",
    },
  };

  config(options)
    .fetch("GET", url)
    .then((res) => {
      dispatch({
        type: FILE_NAME,
        payload: res.data,
      });
    });
};
