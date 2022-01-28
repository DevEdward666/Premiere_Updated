import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
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
import {
  action_get_current_otp,
  reset_otp_callback,
  reset__get_otp_callback,
} from "../../Services/Actions/Users_Actions";
const ResetOTPScreen = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(300);
  const [otp, setotp] = useState(0);
  const [mobileno, setmobileno] = useState(300);

  const request_get_otp_callback = useSelector(
    (state) => state.Default_Reducers.request_get_otp_callback
  );

  useEffect(() => {
    let mounted = true;
    const settimers = () => {
      if (mounted) {
        if (timer > 0) {
          setTimeout(() => setTimer(timer - 1), 1000);
        } else {
          setTimer(0);
        }
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
      if (mounted) {
        if (request_get_otp_callback?.success) {
          setTimeout(() => {
            Actions.reset_password();
            dispatch(reset__get_otp_callback());
          }, 3000);
        }
      }
    };

    mounted && getcallback();
    return () => {
      mounted = false;
    };
  }, [request_get_otp_callback?.success, dispatch]);
  useEffect(() => {
    let mounted = true;
    const resetotpcallback = () => {
      if (mounted) {
        dispatch(reset_otp_callback());
      }
    };

    mounted && resetotpcallback();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handleSubmit = useCallback(async () => {
    await AsyncStorage.getItem("username").then((item) => {
      if (item) {
        if (otp !== 0) {
          dispatch(action_get_current_otp(item, otp));
        }
      }
    });
  }, [dispatch, otp]);
  const handleResend = useCallback(async () => {
    await AsyncStorage.getItem("username").then((item) => {
      if (item) {
        dispatch(action_addotp_for_reset_password(item));
      }
    });
  }, [dispatch]);
  // AsyncStorage.getItem("mobileno").then((item) => {
  //   if (item) {
  //     setmobileno(item);
  //   }
  // });
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

        <TouchableHighlight
          style={styles.btn}
          underlayColor="rgba(62, 178, 250, 0.5)"
          onPress={() => handleSubmit()}
        >
          <Text style={styles.submitText}>Submit OTP</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn}
          underlayColor="rgba(62, 178, 250, 0.5)"
          onPress={() => handleResend()}
        >
          <Text style={styles.submitText}>Resend OTP</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default ResetOTPScreen;
