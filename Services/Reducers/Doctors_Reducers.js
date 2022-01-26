import {
  SET_DOCTOR,
  SET_DOCTOR_INFO,
  SET_SPECIALTY,
  SET_DOCTOR_BY_SPECIALTY,
} from '../Types/Doctors_Types';

const doctors = {
  data: [],
  byspecialty: [],
  specialty: [],
  doc_info: [],
  loading: false,
};
const Doctors_Reducers = (data_state = doctors, actions) => {
  switch (actions.type) {
    case SET_DOCTOR:
      return {...data_state, data: actions.payload};
    case SET_DOCTOR_BY_SPECIALTY:
      return {...data_state, byspecialty: actions.payload};
    case SET_SPECIALTY:
      return {...data_state, specialty: actions.payload};
    case SET_DOCTOR_INFO:
      return {...data_state, doc_info: actions.payload};
    default:
      return data_state;
  }
};
export default Doctors_Reducers;
