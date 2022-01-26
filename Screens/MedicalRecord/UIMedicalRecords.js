import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ImageBackground} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_single_medical_records} from '../../Services/Actions/MedicalRecords_Actions';
import ListMedical from '../MedicalRecord/ListMedical';
import Information from '../MedicalRecord/Information';
import styles from './style';
const UIMedicalRecords = () => {
  const dispatch = useDispatch();

  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  const [spinner, setspinner] = useState(false);

  const list_medical_records = useSelector(
    (state) => state.MedicalRecords_Reducers.list_medical_records,
  );
  useEffect(() => {
    let mounted = true;
    const listmedicalrecords = () => {
      setspinner(true);
      if (list_medical_records?.loading) {
        setspinner(false);
        dispatch(action_get_single_medical_records(users_reducers?.patno));
      }
      dispatch(action_get_single_medical_records(users_reducers?.patno));
    };
    mounted && listmedicalrecords();
    return () => (mounted = false);
  }, [dispatch, list_medical_records?.loading, users_reducers?.patno]);

  const gotorecord = useCallback(async (item) => {}, []);

  return (
    <SafeAreaView>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ListMedical />
      <Information />
    </SafeAreaView>
  );
};

export default UIMedicalRecords;
