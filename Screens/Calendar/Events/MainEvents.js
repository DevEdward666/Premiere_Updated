import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EvetsListUI from './EvetsListUI';

import {action_GET_events} from '../../../Services/Actions/Events_Actions';
const MainEvents = () => {
  const events_reducers = useSelector(
    (state) => state.Events_Reducers.eventsdata,
  );
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const dispatch = useDispatch();



  return (
    <>
      <EvetsListUI />
    </>
  );
};
export default MainEvents;
