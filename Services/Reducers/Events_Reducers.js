import {SET_EVENTS_DATA} from '../Types/Events_Types';

const events = {
  eventsdata: [],
};
const Events_Reducers = (data_state = events, actions) => {
  switch (actions.type) {
    case SET_EVENTS_DATA:
      return {...data_state, eventsdata: actions.payload};
    default:
      return data_state;
  }
};
export default Events_Reducers;
