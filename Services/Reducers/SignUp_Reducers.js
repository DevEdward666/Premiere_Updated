import {
  SET_DATA,
  SET_USERNAME,
  SET_FIRST_INFO,
  SET_SECOND_INFO,
  SET_THIRD_INFO,
  SET_LAST_INFO,
  UPDATE_INFO,
  UPDATE_INFO_IMAGE,
  DONE_SIGNUP,
  DONE_PASSBASE,
  UPDATED_PROFILE,
  UPDATED_DOCS,
} from "../Types/SignUp_Types";

const info = {
  data: [],
  username: [],
  loading: false,
  firstinfo: { firstname: "", middlename: "", lastname: "", completed: false },
  secondinfo: { birthdate: "", gender: "", completed: false },
  thirdinfo: { email: "", mobile: "", completed: false },
  lastinfo: { username: "", password: "", completed: false },
  updateinfo: { message: "", success: false },
  donepassbase: { message: "", success: false },
  updateimageinfo: { profileimage: null, docsimage: null },
  donesignup: { data: [], done: false },
  updated_profile: { message: "", success: false },
  updated_docs: { message: "", success: false },
};
const Login_Reducer = (data_state = info, actions) => {
  switch (actions.type) {
    case UPDATED_PROFILE:
      return { ...data_state, updated_profile: actions.payload };
    case UPDATED_DOCS:
      return { ...data_state, updated_docs: actions.payload };
    case DONE_PASSBASE:
      return { ...data_state, donepassbase: actions.payload };
    case DONE_SIGNUP:
      return { ...data_state, donesignup: actions.payload };
    case UPDATE_INFO_IMAGE:
      return { ...data_state, updateimageinfo: actions.payload };
    case SET_DATA:
      return { ...data_state, data: actions.payload };
    case UPDATE_INFO:
      return { ...data_state, updateinfo: actions.payload };
    case SET_USERNAME:
      return { ...data_state, username: actions.payload };
    case SET_FIRST_INFO:
      return { ...data_state, firstinfo: actions.payload };
    case SET_SECOND_INFO:
      return { ...data_state, secondinfo: actions.payload };
    case SET_THIRD_INFO:
      return { ...data_state, thirdinfo: actions.payload };
    case SET_LAST_INFO:
      return { ...data_state, lastinfo: actions.payload };
    default:
      return data_state;
  }
};
export default Login_Reducer;
