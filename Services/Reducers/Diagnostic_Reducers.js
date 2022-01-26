import {
  SET_DATA_DIAGNOSTIC,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
  SET_URL,
  SET_APPOINTMENT_MESSAGE,
  TOGGLE_ENABLED,
} from '../Types/Diagnostic_Types';
import {REMOTE_URL} from '../Types/Default_Types';
const diagnostic = {
  data_diagnostic: [],
  data_finished: [],
  data_result: [],
  appointment_message: {message: '', success: ''},
  loading: false,
  isEnabled: false,
  url: REMOTE_URL,
};
const Diagnostic_Reducer = (data_state = diagnostic, actions) => {
  switch (actions.type) {
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

    case SET_URL:
      return {...data_state, url: actions.payload};

    default:
      return data_state;
  }
};
export default Diagnostic_Reducer;
