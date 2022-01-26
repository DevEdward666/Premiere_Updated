import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackBar from "../../Components/CustomSnackBar/CustomSnackbar";
import { action_Login_user } from "../../Services/Actions/Login_Actions";
import styles from "./style";
const LoginScreen = (props) => {
  const registrationcomplete = useSelector(
    (state) => state.Default_Reducers.registrationcomplete
  );
  const request_callback = useSelector(
    (state) => state.Default_Reducers.request_callback
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getload, setload] = useState(false);
  const [geterror, seterror] = useState(false);
  const [alerted, setAlerted] = useState(false);

  const handleUsernameChange = useCallback(
    (value) => {
      let mounted = true;
      if (mounted) setUsername(value);
      return () => {
        mounted = false;
      };
    },
    [username]
  );
  const handlePasswordChange = useCallback(
    (value) => {
      let mounted = true;
      if (mounted) setPassword(value);
      return () => {
        mounted = false;
      };
    },
    [password]
  );
  const dispatch = useDispatch();
  const handleSubmit = useCallback(async () => {
    await setload(true);

    if (username === "") {
      await setload(false);
    } else {
      dispatch(action_Login_user(username, password));
      await seterror(false);
    }
  }, [username, password]);
  const goToSignup = () => {
    Actions.signup_name();
  };
  const gotopolicy = () => {
    Actions.pap();
  };
  const gototerms = () => {
    Actions.tac();
  };

  useEffect(() => {
    let mounted = true;
    const getregistrationcomplete = async () => {
      if (mounted) {
        if (registrationcomplete?.success) {
          if (alerted) {
            await setAlerted(true);
            await alert(registrationcomplete?.message);
          }
        }
      }
      mounted && getregistrationcomplete();
      return () => {
        mounted = false;
      };
    };
  }, [registrationcomplete?.message]);
  useEffect(() => {
    if (!request_callback?.success) {
      setload(false);
      seterror(true);
    }

    console.log(!request_callback?.success);
  }, [request_callback]);
  console.log(geterror);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../assets/icons/PremiereIcon2.png")}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.cardContainer}>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.text}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "#0084FF",
                  underlineColor: "transparent",
                  background: "white",
                  backgroundColor: "white",
                },
              }}
              mode="flat"
              label="Username"
              onChangeText={(text) => handleUsernameChange(text)}
              value={username}
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.text}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "#0084FF",
                  underlineColor: "transparent",
                  background: "white",
                  backgroundColor: "white",
                },
              }}
              mode="flat"
              label="Password"
              secureTextEntry={true}
              onChangeText={(text) => handlePasswordChange(text)}
              value={password}
            />
          </View>
          {getload ? (
            <ActivityIndicator
              color="#0084FF"
              size={"small"}
              style={styles.loader}
            />
          ) : (
            <TouchableHighlight
              style={styles.login}
              underlayColor="rgba(62, 178, 250, 0.5)"
              onPress={() => handleSubmit()}
            >
              <Text style={styles.submitText}>Login</Text>
            </TouchableHighlight>
          )}

          <View style={{ marginTop: 60 }}>
            <Text style={{ textAlign: "center" }}>
              Not Yet Registered?{" "}
              <Text onPress={() => goToSignup()} style={{ color: "blue" }}>
                Sign Up
              </Text>
            </Text>
            <Text style={styles.startTextFooter}>
              By signing up, I have read and agreed to Premiere{" "}
              <Text onPress={() => gototerms()} style={{ color: "blue" }}>
                Terms of Use{" "}
              </Text>
              and{" "}
              <Text onPress={() => gotopolicy()} style={{ color: "blue" }}>
                Privacy Policy
              </Text>
            </Text>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={styles.endFooter}>
                <Text style={styles.endTextFooter}>Powered by TUO @ 2021</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {geterror ? (
        <CustomSnackBar open={true} message={request_callback?.message} />
      ) : null}
      
    </>
  );
};

export default LoginScreen;
