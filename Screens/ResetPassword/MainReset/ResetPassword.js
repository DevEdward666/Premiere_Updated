import React, { useCallback, useState, useEffect } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput, HelperText } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnackbar";
import { action_UPDATE_password } from "../../../Services/Actions/Users_Actions";
import styles from "./style";
function ResetPassword(props) {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const request_callback = useSelector(
    (state) => state.Default_Reducers.request_callback
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [getspinner, setspinner] = useState(false);
  const [getcallbackshow, setcallbackshow] = useState(false);
  const [getcallbackmessage, setcallbackmessage] = useState("");
  const [passworderrormessage, setpassworderrormessage] = useState("");
  const [showpass, setshowpass] = useState(true);
  const [iconpass, seticonpass] = useState(false);
  const [showconfirmpass, setshowconfirmpass] = useState(true);
  const [iconconfirmpass, seticonconfirmpass] = useState(false);
  const Submit = useCallback(() => {
    dispatch(action_UPDATE_password(users_reducers?.username, password));
    setspinner(true);
  }, [dispatch, users_reducers, password]);
  const handlePassword = (password) => {
    setPassword(password);
    if (password != confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage("Password Mismatch");
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        setpassworderrormessage(
          "Must be 8 characters long 1 UPPERCASE 1 Numeric"
        );
      } else {
        setErrorMessage(false);
      }
    }
  };
  useEffect(() => {
    let mounted = true;
    const getcallback = () => {
      if (request_callback?.success) {
        setspinner(false);
        setcallbackshow(true);
        setcallbackmessage(request_callback?.message);
        setTimeout(() => {
          Actions.index();
        }, 3000);
      } else {
        setspinner(false);
        setcallbackshow(true);
        setcallbackmessage(request_callback?.message);
      }
    };
    mounted && getcallback();

    return () => {
      mounted = false;
    };
  }, [request_callback]);
  const showpassword = useCallback(() => {
    if (showpass == true) {
      setshowpass(false);
      seticonpass(true);
    } else {
      setshowpass(true);
      seticonpass(false);
    }
  }, [showpass, iconpass]);
  const showconfirmpassword = useCallback(() => {
    if (showconfirmpass == true) {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    } else {
      setshowconfirmpass(true);
      seticonconfirmpass(false);
    }
  }, [showconfirmpass, iconconfirmpass]);
  const handleConfirmPassword = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
    if (password != confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage("Password Mismatch");
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        setpassworderrormessage(
          "Must be 8 characters long 1 UPPERCASE 1 Numeric"
        );
      } else {
        setErrorMessage(false);
      }
    }
  };
  return (
    <>
      {getspinner ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}
      <View style={styles.Inputcontainer}>
        <View style={styles.cardContainer}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
              }}
            >
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: "#3eb2fa",
                    background: "white",
                    underlineColor: "transparent",
                  },
                }}
                mode="flat"
                label="Password"
                secureTextEntry={showpass}
                error={errorMessage}
                onChangeText={(text) => handlePassword(text)}
                value={password}
                right={<TextInput.Icon name="eye" onPress={showpassword} />}
              />
              <HelperText type="error" visible={errorMessage}>
                {passworderrormessage}
              </HelperText>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
              }}
            >
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: "#3eb2fa",
                    background: "white",
                    underlineColor: "transparent",
                  },
                }}
                mode="flat"
                label="Confirm Password"
                secureTextEntry={showpass}
                error={errorMessage}
                secureTextEntry={showconfirmpass}
                onChangeText={(text) => handleConfirmPassword(text)}
                value={confirmpassword}
                right={
                  <TextInput.Icon name="eye" onPress={showconfirmpassword} />
                }
              />

              <HelperText type="error" visible={errorMessage}>
                {passworderrormessage}
              </HelperText>
            </View>
          </View>
        </View>
        <TouchableHighlight
          style={styles.login}
          underlayColor="rgba(62, 178, 250, 0.5)"
          onPress={() => Submit()}
        >
          <Text style={styles.submitText}>Reset</Text>
        </TouchableHighlight>
      </View>
      {getcallbackshow ? (
        <CustomSnackBar open={true} message={getcallbackmessage} />
      ) : null}
    </>
  );
}

export default ResetPassword;
