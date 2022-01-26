import {GET_MESSAGES, SET_MESSAGES} from '../Types/SignalRTypes';

const signalr = {
  messages: {data: [], loading: false},
  set_messages: [],
};
const SignalRReducers = (data_state = signalr, actions) => {
  switch (actions.type) {
    case GET_MESSAGES: {
      return {...data_state, messages: actions.payload};
    }
    case SET_MESSAGES: {
      return {...data_state, set_messages: actions.payload};
    }

    default:
      return data_state;
  }
};

export default SignalRReducers;
