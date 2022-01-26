import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import ServicesDesc from './ServicesDesc';
import {action_GET_Services_Desc} from '../../Services/Actions/Services_Actions';
const ServicesMain = () => {
  const dispatch = useDispatch();
  const setservicesid = useSelector(
    (state) => state.Services_Reducers.setservicesid,
  );
  useEffect(() => {
    let mounted = true;
    const getservicedesc = () => {
      dispatch(action_GET_Services_Desc(setservicesid));
    };
    mounted && getservicedesc();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return <ServicesDesc />;
};
export default ServicesMain;
