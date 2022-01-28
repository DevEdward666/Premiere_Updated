import {
  SET_REGION,
  SET_BARANGAY,
  SET_CITY,
  SET_NATIONALITY,
  SET_PROVINCE,
  SET_CIVIL_STATUS,
  SET_RELIGION,
  SET_PROCEDURE,
  BASE_URL,
  REMOTE_URL,
  SIGNALR_CONNECT,
  SIGNALR_CONNECT_NOTIFY,
  SIGNALR_CONNECT_NOTIFY_FROM_QUEUE,
  SET_REFRESHING,
  SET_OFFSET,
  GET_NOTIF,
  GET_DEVICE,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_ALL,
  SET_OPEN_BOTTOMSHEET,
  APP_NAME,
  SET_NOTIFICATION_OFFSET,
  REGISTRATION_COMPLETE,
  SPINNER_ALERT,
  SET_LOADED,
  QUEUE_BASE_URL,
  SET_HEADER_HIDE,
  SHOW_ALERT,
  SET_CAMERA,
  SET_LIBRARY,
  SET_TESTIMONIALS,
  SET_DEPARTMENT,
  SET_TOKEN,
  PASSBASE_STATUS,
  REFRESH_PAYMENT,
  REQUEST_CALLBACK,
  REQUEST_OTP_CALLBACK,
  REQUEST_UPDATE_PASSWORD_CALLBACK,
  REQUEST_GET_OTP_CALLBACK
} from '../Types/Default_Types';

const defult_values = {
  app_name: 'Premiere',
  region: [],
  barangay: [],
  city: [],
  nationality: [],
  provinces: [],
  civil_status: [],
  religion: [],
  procedures: [],
  departments: [],
  base_url: BASE_URL,
  queue_base_url: QUEUE_BASE_URL,
  remote_url: BASE_URL,
  loading: false,
  hubconnect: '',
  hubconnect_notify: '',
  hubconnect_notify_from_queue: '',
  refresh: false,
  offset: 0,
  notification: {title: '', body: '', to: '', type: ''},
  notificationlist: {data: [], loading: false},
  notificationlistall: {data: [], loading: false},
  device: '',
  bottomSheet: false,
  notifoffset: 0,
  registrationcomplete: {message: '', success: false},
  spinneralert: false,
  loaded: false,
  hideheader: true,
  alerted: false,
  setlibrary: '',
  setcamera: '',
  settestimonials: [],
  gettoken:"",
  passbase_status:"",
  refresh_payment: false,
  request_callback:{message:"",success:false},
  request_otp_callback:{message:"",success:false},
  request_update_password_callback:{message:"",success:false},
  request_get_otp_callback:{message:"",success:false},
};
const Default_Reducer = (data_state = defult_values, actions) => {
  switch (actions.type) {
    case REQUEST_GET_OTP_CALLBACK:
      return { ...data_state, request_get_otp_callback: actions.payload };
    case REQUEST_UPDATE_PASSWORD_CALLBACK:
      return { ...data_state, request_update_password_callback: actions.payload };
    case REQUEST_OTP_CALLBACK:
      return { ...data_state, request_otp_callback: actions.payload };
    case REQUEST_CALLBACK:
      return { ...data_state, request_callback: actions.payload };
    case REFRESH_PAYMENT:
      return {...data_state, refresh_payment: actions.payload};
    case PASSBASE_STATUS:
      return {...data_state, passbase_status: actions.payload};
    case SET_TOKEN:
      return {...data_state, gettoken: actions.payload};
    case SET_TESTIMONIALS:
      return {...data_state, settestimonials: actions.payload};
    case SET_CAMERA:
      return {...data_state, setcamera: actions.payload};
    case SET_LIBRARY:
      return {...data_state, setlibrary: actions.payload};
    case SHOW_ALERT:
      return {...data_state, alerted: actions.payload};
    case SET_HEADER_HIDE:
      return {...data_state, hideheader: actions.payload};
    case SET_LOADED:
      return {...data_state, loaded: actions.payload};
    case SPINNER_ALERT:
      return {...data_state, spinneralert: actions.payload};
    case REGISTRATION_COMPLETE:
      return {...data_state, registrationcomplete: actions.payload};
    case SET_NOTIFICATION_OFFSET:
      return {...data_state, notifoffset: actions.payload};
    case APP_NAME:
      return {...data_state, app_name: actions.payload};
    case SET_REGION:
      return {...data_state, region: actions.payload};
    case SET_BARANGAY:
      return {...data_state, barangay: actions.payload};
    case SET_CITY:
      return {...data_state, city: actions.payload};
    case SET_PROVINCE:
      return {...data_state, provinces: actions.payload};
    case SET_NATIONALITY:
      return {...data_state, nationality: actions.payload};
    case SET_CIVIL_STATUS:
      return {...data_state, civil_status: actions.payload};
    case SET_PROCEDURE:
      return {...data_state, procedures: actions.payload};
    case SET_RELIGION:
      return {...data_state, religion: actions.payload};
    case SET_DEPARTMENT:
      return {...data_state, departments: actions.payload};
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    case REMOTE_URL:
      return {...data_state, remote_url: actions.payload};
    case SIGNALR_CONNECT:
      return {...data_state, hubconnect: actions.payload};
    case SIGNALR_CONNECT_NOTIFY:
      return {...data_state, hubconnect_notify: actions.payload};
    case SIGNALR_CONNECT_NOTIFY_FROM_QUEUE:
      return {...data_state, hubconnect_notify_from_queue: actions.payload};
    case SET_REFRESHING:
      return {...data_state, refresh: actions.payload};
    case SET_OFFSET:
      return {...data_state, offset: actions.payload};
    case GET_NOTIF:
      return {...data_state, notification: actions.payload};
    case GET_DEVICE:
      return {...data_state, device: actions.payload};
    case GET_NOTIFICATION_LIST:
      return {...data_state, notificationlist: actions.payload};
    case GET_NOTIFICATION_LIST_ALL:
      return {...data_state, notificationlist: actions.payload};
    case SET_OPEN_BOTTOMSHEET:
      return {...data_state, bottomSheet: actions.payload};
    default:
      return data_state;
  }
};
export default Default_Reducer;
