import {
  SET_SERVICES,
  SET_IMAGE_SERVICES,
  GET_SERVICES_DESC,
  GET_SERVICES_INFO,
  GET_SERVICE_INFO_ID,
  GET_SERVICE_ID,
} from '../Types/Services_Types';

const services = {
  data: [],
  images: '',
  loading: false,
  servicedesc: [],
  servicesinfo: [],
  setservicesid: '',
  setservicesinfoid: '',
};
const Services_Reducers = (data_state = services, actions) => {
  switch (actions.type) {
    case GET_SERVICE_ID:
      return {...data_state, setservicesid: actions.payload};
    case GET_SERVICE_INFO_ID:
      return {...data_state, setservicesinfoid: actions.payload};
    case GET_SERVICES_DESC:
      return {...data_state, servicedesc: actions.payload};
    case GET_SERVICES_INFO:
      return {...data_state, servicesinfo: actions.payload};
    case SET_SERVICES:
      return {...data_state, data: actions.payload};
    case SET_IMAGE_SERVICES:
      return {...data_state, images: actions.payload};

    default:
      return data_state;
  }
};
export default Services_Reducers;
