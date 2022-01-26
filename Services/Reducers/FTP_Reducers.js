import {
  FILE_NAME,
  SET_FILES,
  GET_FILES,
  FTP_RESULTS,
  FTP_SINGLE_RESULTS,
} from '../Types/FTP_Types';

const file = {
  filename: '',
  data_patient_files: [],
  ftp_results: {data: [], loading: false},
  ftp_base64_pdf: {data: '', loading: false},
};
const FTP_Reducers = (data_state = file, actions) => {
  switch (actions.type) {
    case FILE_NAME:
      return {...data_state, filename: actions.payload};
    case GET_FILES:
      return {...data_state, data_patient_files: actions.payload};
    case FTP_RESULTS:
      return {...data_state, ftp_results: actions.payload};
    case FTP_SINGLE_RESULTS:
      return {...data_state, ftp_base64_pdf: actions.payload};
    default:
      return data_state;
  }
};
export default FTP_Reducers;
