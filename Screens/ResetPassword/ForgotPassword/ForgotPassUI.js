import React, { useCallback, useState, useEffect } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput, HelperText } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnackbar";
import {
  action_send_otp_for_reset,
  action_UPDATE_password,
} from "../../../Services/Actions/Users_Actions";
import styles from "./style";
function ForgotPassUI(props) {
  const dispatch = useDispatch();
  const request_otp_callback = useSelector(
    (state) => state.Default_Reducers.request_otp_callback
  );
  const [username, setUsername] = useState("");
  const [getspinner, setspinner] = useState(false);
  const [getcallbackshow, setcallbackshow] = useState(false);
  const [getcallbackmessage, setcallbackmessage] = useState("");
  const Submit = useCallback(() => {
    dispatch(action_send_otp_for_reset(username));
    setspinner(true);
  }, [dispatch, username]);

  useEffect(() => {
    let mounted = true;
    const getcallback = async () => {
      if(mounted){
        if (request_otp_callback?.success) {
          setspinner(false);
          setcallbackshow(true);
          setcallbackmessage(request_otp_callback?.message);
          // setTimeout(() => {
          //   Actions.reset_password();
          // }, 3000);
        } else {
          if(request_otp_callback?.message!==" " && !request_otp_callback?.message.includes("External") &&  !request_otp_callback?.message.includes("No tokens")){
            await setspinner(false);
            await setcallbackshow(true);
            await setcallbackmessage(request_otp_callback?.message);
          }
      
        }
      }
    
    };
    mounted && getcallback();

    return () => {
      mounted = false;
    };
  }, [request_otp_callback]);
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
                label="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
            </View>
          </View>
        </View>

        <TouchableHighlight
          style={styles.login}
          underlayColor="rgba(62, 178, 250, 0.5)"
          onPress={() => Submit()}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
      {getcallbackshow ? (
        <CustomSnackBar open={true} message={getcallbackmessage} />
      ) : null}
    </>
  );
}

export default ForgotPassUI;
