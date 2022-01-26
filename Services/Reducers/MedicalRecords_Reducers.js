import {
  GET_SINGLE_MEDICAL_RECORDS,
  PATIENT_INFO,
} from '../Types/MedicalRecords_Types';

const events = {
  list_medical_records: {data: [], loading: false},
  patientinfo: {data: [], visible: false},
};
const MedicalRecords_Reducers = (data_state = events, actions) => {
  switch (actions.type) {
    case GET_SINGLE_MEDICAL_RECORDS:
      return {...data_state, list_medical_records: actions.payload};
    case PATIENT_INFO:
      return {...data_state, patientinfo: actions.payload};
    default:
      return data_state;
  }
};
export default MedicalRecords_Reducers;
