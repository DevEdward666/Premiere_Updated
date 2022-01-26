import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Button} from 'react-native';
import {Text} from 'react-native-elements';
import {action_update_user} from '../../Services/Actions/SignUp_Actions';
import {action_add_OTP} from '../../Services/Actions/Login_Actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
const OTPScreen = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(300);
  const [otp, setotp] = useState(0);
  const [mobileno, setmobileno] = useState(300);
  
  const registrationcomplete = useSelector((state) => state.Default_Reducers.registrationcomplete);
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
  useEffect(() => {
    let mounted = true;
    const getcallback = () => {
     if(registrationcomplete?.success){
      Actions.index()
     }
    };

    console.log(registrationcomplete)
    mounted && getcallback();
    return () => {
      mounted = false;
    };
  }, [registrationcomplete]);
  const handleSubmit = () => {
    let mounted = true;
    if (mounted) {
      AsyncStorage.getItem('username').then((item) => {
        if (item) {
          dispatch(action_update_user(item, otp));
        }
      });
    }
    return () => {
      mounted = false;
    };
  };
  const handleResend = () => {
    let mounted = true;
    if (mounted) {
      AsyncStorage.getItem('username').then((item) => {
        if (item) {
          dispatch(action_add_OTP(item));
        }
      });
    }
    return () => {
      mounted = false;
    };
  };
  AsyncStorage.getItem('mobileno').then((item) => {
    if (item) {
      setmobileno(item);
    }
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 60}}>
        <Text h5 style={{alignContent: 'center', width: '100%'}}>
          Verify the Authentication
        </Text>
        <Text h6 style={{alignContent: 'center', width: '100%'}}>
          Sent to {mobileno}
        </Text>
        <OTPInputView
          style={{width: '100%', height: 200}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
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
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 100,
    height: 100,
  },

  borderStyleHighLighted: {
    borderColor: 'black',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    color: 'black',
    fontSize: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
});
export default OTPScreen;
