import React,{useCallback,useEffect} from 'react';
import {SafeAreaView,RefreshControl} from 'react-native';
import CardHeader from './CardHeader';
import {useDispatch, useSelector} from 'react-redux';
import CardBody from './Cardbody';
import {ScrollView} from 'react-native';
import CardFooter from './CardFooter';
import { action_refresh } from "../../../Services/Actions/Default_Actions";
const MainCardUI = () => {
  const appointment_message = useSelector(
    (state) => state.PaymentReducers.appointment_message,
  );
  const refresh_payment = useSelector(
    (state) => state.Default_Reducers.refresh_payment
  );

  const dispatch = useDispatch();
  const onRefresh = useCallback(() => {

    dispatch(action_refresh(true));
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const refresh_payments = () => {
      if (mounted) {
        if (refresh_payment) {
          dispatch(action_refresh(false));
        }
      }
    };
    mounted && refresh_payments();
  }, [dispatch, refresh_payment]);
  return (
    <ScrollView    refreshControl={
        <RefreshControl refreshing={refresh_payment} onRefresh={onRefresh} />
      }>
      <CardHeader />
      <CardFooter/>
      <CardBody/>
    </ScrollView>
  );
};

export default MainCardUI;
