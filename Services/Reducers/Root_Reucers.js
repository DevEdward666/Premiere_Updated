import Login_Reducer from './Login_Reducers';
import SignUp_Reducers from './SignUp_Reducers';
import Default_Reducers from './Default_Reducers';
import Doctors_Reducers from './Doctors_Reducers';
import User_Reducers from './User_Reducers';
import Services_Reducers from './Services_Reducers';
import Diagnostic_Reducers from './Diagnostic_Reducers';
import News_Reducers from './News_Reducers';
import Events_Reducers from './Events_Reducers';
import MedicalRecords_Reducers from './MedicalRecords_Reducers';
import FTP_Reducers from './FTP_Reducers';
import SignalRReducers from './SignalRReducers';
import AgoraReducers from './AgoraReducers';
import QueueReducers from './QueueReducers';
import Clinic_Reducers from './Clinic_Reducers';
import PaymongoReducers from './PaymongoReducers';
import PassbaseReducers from './PassBaseReducers';
import PaymentReducers from './PaymentReducer'
import {combineReducers} from 'redux';

const Root_Reducer = combineReducers({
  Login_Reducer: Login_Reducer,
  SignUp_Reducers: SignUp_Reducers,
  Default_Reducers: Default_Reducers,
  Doctors_Reducers: Doctors_Reducers,
  Services_Reducers: Services_Reducers,
  User_Reducers: User_Reducers,
  Diagnostic_Reducers: Diagnostic_Reducers,
  News_Reducers: News_Reducers,
  Events_Reducers: Events_Reducers,
  MedicalRecords_Reducers: MedicalRecords_Reducers,
  FTP_Reducers: FTP_Reducers,
  SignalRReducers: SignalRReducers,
  AgoraReducers: AgoraReducers,
  QueueReducers: QueueReducers,
  Clinic_Reducers: Clinic_Reducers,
  PassbaseReducers: PassbaseReducers,
  PaymentReducers: PaymentReducers,
});
export default Root_Reducer;
