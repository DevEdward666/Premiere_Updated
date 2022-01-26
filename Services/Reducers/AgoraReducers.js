import {APP_ID} from '../Types/AgoraType';

const agora = {
  appid: APP_ID,
};
const AgoraReducers = (data_state = agora, actions) => {
  switch (actions.type) {
    case APP_ID:
      return {...data_state, appid: actions.payload};

    default:
      return data_state;
  }
};
export default AgoraReducers;
