import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import FormClinic from './FormClinic';
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_civilstatus,
  action_GET_nationality,
  action_GET_procedure,
  action_GET_province,
  action_GET_region,
  action_GET_religion,
  action_GET_department
} from '../../Services/Actions/Default_Actions';
import {useDispatch} from 'react-redux';
const MainClinic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getdefaults = () => {
      dispatch(action_GET_region());
      dispatch(action_GET_nationality());
      dispatch(action_GET_civilstatus());
      dispatch(action_GET_religion());
      dispatch(action_GET_procedure());
      dispatch(action_GET_department());
    };

    mounted && getdefaults();
    return () => (mounted = false);
  }, [dispatch]);
  return <FormClinic />;
};
export default MainClinic;
