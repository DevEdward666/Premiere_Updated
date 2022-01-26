import {CREATE_SOURCE,RETRIEVE_SOURCE, PAYMENT_DONE, PAID_SOURCE,PAYMENT_METHOD_CALLBACK,PAYMENT_INTENT_CALLBACK,ATTACH_INTENT_CALLBACK,CARD_BODY,CARD_HEADER} from '../Types/PaymentTypes';
const diagnostic = {
  sourcedata: {source: '', status: ''},
  retrievesource: {source: '', status: ''},
  paymentdone: '',
  paidsource:{data:[],success:false},
  payment_intent_callback:[],
  payment_method_callback:[],
  attach_intent_callback:[],
  card_body:{name:"",mobile:"",email:"",line1:"",line2:"",state:"",postal:"",city:"",country:""},
  card_header:{card_number:"",exp_month:"",exp_year:"",cvc:""}
};
const PaymentReducers = (data_state = diagnostic, actions) => {
  switch (actions.type) {
    case CARD_HEADER:
      return {...data_state, card_header: actions.payload};
    case CARD_BODY:
      return {...data_state, card_body: actions.payload};
    case ATTACH_INTENT_CALLBACK:
      return {...data_state, attach_intent_callback: actions.payload};
    case PAYMENT_METHOD_CALLBACK:
      return {...data_state, payment_method_callback: actions.payload};
    case PAYMENT_INTENT_CALLBACK:
      return {...data_state, payment_intent_callback: actions.payload};
    case PAID_SOURCE:
      return {...data_state, paidsource: actions.payload};
    case PAYMENT_DONE:
      return {...data_state, paymentdone: actions.payload};
    case CREATE_SOURCE:
      return {...data_state, sourcedata: actions.payload};
    case RETRIEVE_SOURCE:
      return {...data_state, retrievesource: actions.payload};

    default:
      return data_state;
  }
};
export default PaymentReducers;
