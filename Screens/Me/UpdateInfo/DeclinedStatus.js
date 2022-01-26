import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './style';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {action_imagepickeroptions} from '../../../Services/Actions/Default_Actions';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {action_passbase_get_single_info} from '../../../Services/Actions/PassbaseActions';
import DeclinedMainUI from './DeclinedMainUI'
const WaitForStatusUpdate = () => {
  const dispatch = useDispatch();
 
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data,
  );

 

  return (
    <DeclinedMainUI/>
  );
};
export default WaitForStatusUpdate;
