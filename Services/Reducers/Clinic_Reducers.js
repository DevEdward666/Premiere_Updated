import {
  SET_DATA_DIAGNOSTIC,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
  SET_URL,
  SET_APPOINTMENT_MESSAGE,
  TOGGLE_ENABLED,
  SET_DETAILS,
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
} from '../Types/Clinic_types';
import {REMOTE_URL} from '../Types/Clinic_types';
const diagnostic = {
  data_diagnostic: [],
  data_finished: [],
  data_result: [],
  appointment_message: {data: [], message: '', success: ''},
  appointment_dtls: {data: [], message: '', success: ''},
  loading: false,
  isEnabled: false,
  url: REMOTE_URL,
  setdetails: [],
  sourcedata: {source: '', status: ''},
  paymentdone: '',
  consultation_table: {data: [], loaded: false},
  consultation_table_offset: 20,
  consult_status: 'for approval',
  link_consult_message: {message: '', success: false},
  done_link_consult_message: {message: '', success: false},
  link_consult_details: {
    fullname: '',
    email: '',
    username: '',
    consult_req_pk: '',
  },
  consult_info: {data: [], success: false},
};
const Clinic_Reducers = (data_state = diagnostic, actions) => {
  switch (actions.type) {
    case CONSULT_INFO:
      return {...data_state, consult_info: actions.payload};
    case DONE_LINK_CONSULT_MESSAGE:
      return {...data_state, done_link_consult_message: actions.payload};
    case LINK_CONSULT_DETAILS:
      return {...data_state, link_consult_details: actions.payload};
    case LINK_CONSULT_MESSAGE:
      return {...data_state, link_consult_message: actions.payload};
    case CONSULTATION_TABLE_STATUS:
      return {...data_state, consult_status: actions.payload};
    case CONSULTATION_TABLE_OFFSET:
      return {...data_state, consultation_table_offset: actions.payload};
    case CONSULTATION_TABLE:
      return {...data_state, consultation_table: actions.payload};
    case PAYMENT_DONE:
      return {...data_state, paymentdone: actions.payload};
    case CREATE_SOURCE:
      return {...data_state, sourcedata: actions.payload};
    case SET_DETAILS:
      return {...data_state, setdetails: actions.payload};
    case TOGGLE_ENABLED:
      return {...data_state, isEnabled: actions.payload};
    case SET_DATA_DIAGNOSTIC:
      return {...data_state, data_diagnostic: actions.payload};
    case SET_DATA_FINISHED:
      return {...data_state, data_finished: actions.payload};
    case SET_DONE:
      return {...data_state, loading: actions.payload};
    case SET_DATA_RESULT:
      return {...data_state, data_result: actions.payload};
    case SET_APPOINTMENT_MESSAGE:
      return {...data_state, appointment_message: actions.payload};
    case SET_APPOINTMENT_DTLS:
      return {...data_state, appointment_dtls: actions.payload};

    case SET_URL:
      return {...data_state, url: actions.payload};

    default:
      return data_state;
  }
};
export default Clinic_Reducers;
