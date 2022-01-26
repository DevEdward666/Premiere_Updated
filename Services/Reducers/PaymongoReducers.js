import {CREATE_PAYMENT_CARD} from '../Types/PaymongoTypes';

const paymongo = {
  createpaymentmethod: {data: [], loaded: false},
};
const PaymongoReducers = (data_state = paymongo, actions) => {
  switch (actions.type) {
    case CREATE_PAYMENT_CARD:
      return {...data_state, generatednumber: actions.payload};
    default:
      return data_state;
  }
};
export default PaymongoReducers;
