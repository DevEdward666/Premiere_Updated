import {
  GET_GENERATOR_REGULAR,
  GET_COUNTER_QUEUE,
  SET_COUNTER,
  GET_WAITING_QUEUE,
  GET_USER_QUEUE_NUMBER,
  GET_GENERATED_NUMBER,
} from '../Types/QueueTypes';

const queue = {
  regular: [],
  counterlist: [],
  counter: '',
  waiting: {data: [], loaded: false},
  generatednumber: {data: [], message: ''},
  queueusernumber: {data: [], loaded: false},
};
const QueueReducers = (data_state = queue, actions) => {
  switch (actions.type) {
    case GET_GENERATED_NUMBER:
      return {...data_state, generatednumber: actions.payload};
    case GET_USER_QUEUE_NUMBER:
      return {...data_state, queueusernumber: actions.payload};
    case GET_WAITING_QUEUE:
      return {...data_state, waiting: actions.payload};
    case SET_COUNTER:
      return {...data_state, counter: actions.payload};
    case GET_GENERATOR_REGULAR:
      return {...data_state, regular: actions.payload};
    case GET_COUNTER_QUEUE:
      return {...data_state, counterlist: actions.payload};
    default:
      return data_state;
  }
};
export default QueueReducers;
