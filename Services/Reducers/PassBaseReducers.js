import {
  PASSBASE_PUBLIC_KEY,
  PASSBASE_SECRET_KEY,
  PASSBASE_SINGLE_DATA,
  PASSBASE_ID,
} from '../Types/PassbaseTypes';

const passbase = {
  passbase_public_key:
    'g0Zvr2EObXJ8aSxDhGGOGLWdUKUWfRHevhSjfSmmQbntXRYuPUsr1rkQplUdDb83',
  passbase_secret_key:
    'EzJ7wYC7D9FmRdHqZPgf4gpwGqSgfSdymxdbW3VIc1NpAxc9XurJTKYMLr7TBHTXTZAkETnb6JNWwHiYxwWc0owXwbchqzqutvMkeLFDfkhQSwQbJR1KhPEPtTteHlVj',
  passbase_data: [],
  passbase_id: '',
};
const PassbaseReducers = (data_state = passbase, actions) => {
  switch (actions.type) {
    case PASSBASE_PUBLIC_KEY:
      return {...data_state, passbase_public_key: actions.payload};
    case PASSBASE_SECRET_KEY:
      return {...data_state, passbase_secret_key: actions.payload};
    case PASSBASE_SINGLE_DATA:
      return {...data_state, passbase_data: actions.payload};
    case PASSBASE_ID:
      return {...data_state, passbase_id: actions.payload};

    default:
      return data_state;
  }
};
export default PassbaseReducers;
