import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, View, Button } from "react-native";
import { Text } from "react-native-elements";
import { action_update_user } from "../../Services/Actions/SignUp_Actions";
import {
  action_addotp_for_reset_password,
  action_add_OTP,
} from "../../Services/Actions/Login_Actions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";
import styles from "./style";
import { action_get_current_otp } from "../../Services/Actions/Users_Actions";
const ResetOTPScreen = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(300);
  const [otp, setotp] = useState(0);
  const [mobileno, setmobileno] = useState(300);

  const registrationcomplete = useSelector(
    (state) => state.Default_Reducers.registrationcomplete
  );
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

  const handleSubmit = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await AsyncStorage.getItem("username").then((item) => {
        if (item) {
          dispatch(action_get_current_otp(item, otp));
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, otp]);
  const handleResend = async () => {
    let mounted = true;
    if (mounted) {
      await AsyncStorage.getItem("username").then((item) => {
        if (item) {
          dispatch(action_addotp_for_reset_password(item));
        }
      });
    }
    return () => {
      mounted = false;
    };
  };
  AsyncStorage.getItem("mobileno").then((item) => {
    if (item) {
      setmobileno(item);
    }
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 60 }}>
        <Text h5 style={{ alignContent: "center", width: "100%" }}>
          Verify the Authentication
        </Text>
        <Text h6 style={{ alignContent: "center", width: "100%" }}>
          Sent to your email
        </Text>
        <OTPInputView
          style={{ width: "100%", height: 200 }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => setotp(code)}
        />
        <Text h6 style={{ alignContent: "center", width: "100%" }}>
          Authentication Code until {timer} seconds
        </Text>
        <View style={{ padding: 60, borderRadius: 20 }}>
          <Button
            style={{ color: "#0148a4" }}
            onPress={handleSubmit}
            title="Submit"
            color="#0148a4"
            accessibilityLabel="Submit"
          />
        </View>
        <View style={{ padding: 60, borderRadius: 20, marginTop: -90 }}>
          <Button
            style={{ color: "#0148a4" }}
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

export default ResetOTPScreen;
