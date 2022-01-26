import React, {useEffect} from 'react';
import ServiceinfoUI from './ServiceinfoUI';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_Services_Info} from '../../../Services/Actions/Services_Actions';
const ServiceInfoMain = () => {
  const setservicesinfoid = useSelector(
    (state) => state.Services_Reducers.setservicesinfoid,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getserviceinfo = () => {
      if (mounted) {
        dispatch(action_GET_Services_Info(setservicesinfoid));
      }
    };
    mounted && getserviceinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return <ServiceinfoUI />;
};
export default ServiceInfoMain;
