import React, {useEffect} from 'react';
import {View, SafeAreaView, Dimensions} from 'react-native';
import Consult_table from './Consult_table';
import {consultation_table} from '../../../Services/Actions/Clinic_actions';
import {useDispatch, useSelector} from 'react-redux';
import Consult_Header from './Consult_Header';
const Main_consult = () => {
  const Screenwidth = Dimensions.get('window').width;
  const Screenheight = Dimensions.get('window').height;
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const consultation_table_offset = useSelector(
    (state) => state.Clinic_Reducers.consultation_table_offset,
  );
  const consult_status = useSelector(
    (state) => state.Clinic_Reducers.consult_status,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const generatetable = () => {
      dispatch(
        consultation_table(
          users_reducers?.prem_id,
          consult_status,
          consultation_table_offset,
        ),
      );
    };
    mounted && generatetable();
    return () => {
      mounted = false;
    };
  }, [dispatch, consult_status, consultation_table_offset]);
  return (
    <SafeAreaView style={{marginBottom: 80, height: Screenheight,backgroundColor:"white"}}>
      <Consult_Header />
      <Consult_table />
    </SafeAreaView>
  );
};
export default Main_consult;
