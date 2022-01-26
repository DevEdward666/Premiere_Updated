import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Text} from 'react-native-elements';
import {
  action_Link_OTP,
  action_InsertLink_OTP,
  action_reset_done_link,
} from '../../../Services/Actions/Clinic_actions';
import {action_add_OTP} from '../../../Services/Actions/Login_Actions';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import DoneOverlay from '../../../Components/CustomOverlay/DoneOverlay';
const OTP = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(300);
  const [overlayvisible, setoverlayvisible] = useState(false);
  const [otp, setotp] = useState(0);
  const link_consult_details = useSelector(
    (state) => state.Clinic_Reducers.link_consult_details,
  );
  const done_link_consult_message = useSelector(
    (state) => state.Clinic_Reducers.done_link_consult_message,
  );

  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  useEffect(() => {
    let mounted = true;
    const settimers = () => {
      if (timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
      } else {
        setTimer(0);
      }
    };

    mounted && settimers();
    return () => {
      mounted = false;
    };
  }, [timer]);
  const handleSubmit = () => {
    let mounted = true;
    if (mounted) {
      dispatch(
        action_Link_OTP(
          link_consult_details?.username,
          users_reducers?.prem_id,
          link_consult_details?.consult_req_pk,
          otp,
        ),
      );
    }
    return () => {
      mounted = false;
    };
  };
  const handleResend = () => {
    let mounted = true;
    if (mounted) {
      dispatch(
        action_InsertLink_OTP(
          link_consult_details?.username,
          link_consult_details?.fullname,
          link_consult_details?.email,
        ),
      );
    }
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    let mounted = true;
    const donelink = () => {
      if (mounted) {
        if (done_link_consult_message?.success) {
          setoverlayvisible(true);
        }
      }
    };

    mounted && donelink();
    return () => {
      mounted = false;
    };
  }, [done_link_consult_message?.success]);
  const handleDone = useCallback(() => {
    dispatch(action_reset_done_link());
    setoverlayvisible(false);
    Actions.consultlist();
  }, [dispatch]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <DoneOverlay
        visible={overlayvisible}
        message={done_link_consult_message?.message}
        UI={
          <Button
            onPress={() => handleDone()}
            buttonStyle={{
              backgroundColor: '#034c81',
              borderRadius: 10,
              width: '70%',
              marginBottom: 80,
              alignSelf: 'center',
              height: 50,
            }}
            title="Done"
          />
        }
      />
      <View style={{padding: 60}}>
        <Text h5 style={{alignContent: 'center', width: '100%'}}>
          Verify the Authentication
        </Text>
        <Text h6 style={{alignContent: 'center', width: '100%'}}>
          Sent via email {link_consult_details?.email}
        </Text>
        <OTPInputView
          style={{width: '100%', height: 200}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => setotp(code)}
        />
        <Text h6 style={{alignContent: 'center', width: '100%'}}>
          Authentication Code until {timer} seconds
        </Text>
        <View style={{padding: 60, borderRadius: 20}}>
          <Button
            style={{color: '#0148a4'}}
            onPress={handleSubmit}
            title="Submit"
            color="#0148a4"
            accessibilityLabel="Submit"
          />
        </View>
        <View style={{padding: 60, borderRadius: 20, marginTop: -90}}>
          <Button
            style={{color: '#0148a4'}}
            onPress={handleResend}
            title="Resend OTP"
            color="#0148a4"
            accessibilityLabel="Resend OTP"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OTP;
