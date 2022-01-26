import {
  SET_DATA_USERS,
  SET_IMAGE_USERS,
  SET_DOCIMAGE_USERS,
  GET_LINK_MESSAGE,
  SET_PIN,
  SET_LOCKED,
  SET_USERNAME,
  SET_QR_USER,
} from '../Types/User_Types';

const users_infos = {
  image: '',
  docimage: '',
  link_message: '',
  user_pin: '',
  user_locked: '',
  userinfo: [],
  username: '',
  user_qr: {qrbase64: ''},
};
const User_Reducers = (data_state = users_infos, actions) => {
  switch (actions.type) {
    case SET_QR_USER:
      return {...data_state, user_qr: actions.payload};
    case SET_IMAGE_USERS:
      return {...data_state, image: actions.payload};
    case SET_DOCIMAGE_USERS:
      return {...data_state, docimage: actions.payload};
    case SET_DATA_USERS:
      return {...data_state, userinfo: actions.payload};
    case GET_LINK_MESSAGE:
      return {...data_state, link_message: actions.payload};
    case SET_PIN:
      return {...data_state, user_pin: actions.payload};
    case SET_LOCKED:
      return {...data_state, user_locked: actions.payload};
    case SET_USERNAME:
      return {...data_state, username: actions.payload};
    default:
      return data_state;
  }
};
export default User_Reducers;
