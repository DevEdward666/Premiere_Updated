import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, StyleSheet, Image, SafeAreaView, View } from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import CustomBottomSheet from "../../Components/CustomeBottomSheet";
import CustomTermsAndConditions from "../../Components/CustomTermsAndConditions";
import CustomPrivacyandPolicy from "../../Components/CustomPrivacyandPolicy";
import CustomGestureHandler from "../../Components/CustomGestureHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  action_get_link_request,
  action_SET_LinkRequest,
  action_update_link_request,
} from "../../Services/Actions/Users_Actions";
import CustomOverlay from "../../Components/CustomOverlay";
import styles from "./linkstyles";
import DoneOverlay from "../../Components/CustomOverlay/DoneOverlay";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Action_Send_Notification_To_Admin,
  reset_link_message,
  reset_request_callback,
} from "../../Services/Actions/Default_Actions";
import { Caption, Headline, Subheading, Title } from "react-native-paper";
import moment from "moment";
const LinkMedicalRecords = () => {
  const dispatch = useDispatch();
  const linkmessage = useSelector((state) => state.User_Reducers.link_message);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const link_data = useSelector((state) => state.User_Reducers.link_data);
  const [agreechecked, setagreechecked] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isVisiblepap, setisVisiblepap] = useState(false);
  const [buttondisabled, setbuttondisabled] = useState(true);
  const [checkboxdisabled, setcheckboxdisabled] = useState(true);
  const [patient_no, setpatient_no] = useState("");
  const [prem_id, setprem_id] = useState("");
  const [messagevisible, setmessagevisible] = useState(false);
  const [getspinner, setspinner] = useState(false);
  const handleagreechecked = useCallback(() => {
    if (agreechecked) {
      setagreechecked(false);
      setbuttondisabled(true);
    } else {
      setagreechecked(true);
      setbuttondisabled(false);
      setisVisible(true);
    }
  }, [agreechecked]);
  const handleGestureDown = useCallback(async () => {
    await setisVisible(false);
    await setisVisiblepap(true);
  }, [isVisible]);
  const handleGestureUp = useCallback(async () => {
    await setisVisible(false);
    await setisVisiblepap(false);
  }, [isVisible]);
  const handleOnchangePatientNo = useCallback(
    async (text) => {
      await setpatient_no(text);
      if (text !== " ") {
        await setcheckboxdisabled(false);
      }
    },
    [patient_no]
  );
  const handleCancelLink = useCallback(() => {
    dispatch(action_update_link_request(users_reducers?.prem_id?.toString()));
  }, [dispatch, users_reducers]);
  const handleLinkMedical = useCallback(async () => {
    await setspinner(true);
    dispatch(
      action_SET_LinkRequest(
        patient_no.toString(),
        users_reducers?.prem_id?.toString(),
        "pending"
      )
    );
    dispatch(
      Action_Send_Notification_To_Admin(
        `Requesting for linking medical records`,
        `User ${users_reducers?.prem_id} is Requesting for medical records linking`
      )
    );
  }, [dispatch, patient_no, users_reducers?.prem_id]);
  useEffect(() => {
    let mounted = true;
    const setstates = () => {
      if (patient_no !== "") {
        setcheckboxdisabled(false);
      } else {
        setcheckboxdisabled(true);
        setagreechecked(false);
        setbuttondisabled(true);
      }
    };

    mounted && setstates();
    return () => {
      mounted = false;
    };
  }, [patient_no]);
  useEffect(() => {
    let mounted = true;
    const getcallback = () => {
      if (mounted) {
        if (linkmessage !== "") {
          setmessagevisible(true);
          setspinner(false);
          dispatch(action_get_link_request(users_reducers?.prem_id));
        }
      }
    };
    mounted && getcallback();
    return () => {
      mounted = false;
    };
  }, [linkmessage, dispatch, users_reducers]);
  const handleDone = useCallback(() => {
    setmessagevisible(false);
    dispatch(reset_link_message());
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getlinkrequest = () => {
      if (mounted) {
        dispatch(action_get_link_request(users_reducers?.prem_id));
      }
    };
    mounted && getlinkrequest();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers]);
  return (
    <>
      {getspinner ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}
      {messagevisible ? (
        <DoneOverlay
          visible={true}
          message={linkmessage}
          UI={
            <Button
              onPress={() => handleDone()}
              buttonStyle={{
                backgroundColor: "#0084FF",
                borderRadius: 10,
                width: "70%",
                marginBottom: 80,
                alignSelf: "center",
                height: 50,
              }}
              title="Done"
            />
          }
        />
      ) : null}
      {link_data?.data?.length <= 0 ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.ImageContainer}>
            <Image
              style={styles.ImageSize}
              resizeMode="contain"
              source={require("../../assets/icons/record.png")}
            />
          </View>
          <View style={styles.TextContainer}>
            <Text style={styles.Title}>Link Medical Records</Text>
            <View style={styles.InputContainer}>
              <Input
                onChangeText={(text) => handleOnchangePatientNo(text)}
                leftIcon={{ type: "font-awesome", name: "th" }}
                placeholder="Patient No"
                value={patient_no}
              />
            </View>
            <CheckBox
              disabled={checkboxdisabled}
              style={styles.Title}
              center
              title="I agree to the terms and conditions"
              checked={agreechecked}
              onPress={() => handleagreechecked()}
            />
            <View style={styles.ButtonContainer}>
              <Button
                disabled={buttondisabled}
                raised
                onPress={() => handleLinkMedical()}
                title="Link Now"
                type="outlined"
              />
            </View>
          </View>
          <CustomGestureHandler
            down={() => handleGestureDown()}
            UI={
              <CustomBottomSheet
                isVisible={isVisible}
                color="white"
                UI={<CustomTermsAndConditions />}
              />
            }
          />
          <CustomGestureHandler
            down={() => handleGestureUp()}
            UI={
              <CustomBottomSheet
                isVisible={isVisiblepap}
                color="white"
                UI={<CustomPrivacyandPolicy />}
              />
            }
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.ButtonContainer}>
            <Title style={styles.Title}>
              Your link request No.# {link_data?.data[0]?.linkreq}
            </Title>
            <Subheading style={styles.Subtitle}>
              Patient No.: {link_data?.data[0]?.patno}
            </Subheading>
            <Subheading style={styles.Subtitle}>
              Requested At.:
              {moment(link_data?.data[0]?.requested_date).format("MMM Do YYYY")}
            </Subheading>
            <Subheading style={styles.Subtitle}>
              Status: {link_data?.data[0]?.status}
            </Subheading>
            <Button
              containerStyle={{ marginTop: 30 }}
              raised
              onPress={() => handleCancelLink()}
              title="Cancel Link"
              type="outlined"
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default LinkMedicalRecords;
