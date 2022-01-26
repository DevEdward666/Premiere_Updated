import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Spinner from "react-native-loading-spinner-overlay";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import wait from "../../Components/waitinterval";
import Icons from "react-native-vector-icons/FontAwesome";
import {
  action_get_patient_files,
  action_get_files,
  action_set_patient_files,
} from "../../Services/Actions/MedicalRecords_Actions";
import { Text } from "react-native";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { getDeviceId, getUniqueId } from "react-native-device-info";
import { requestLocationPermission } from "../../Services/Actions/Default_Actions";
const UIListOfFile = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  let deviceStored = getDeviceId() + "-" + getUniqueId();
  const [filetype, setfiletype] = useState("");
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const data_patient_files = useSelector(
    (state) => state.FTP_Reducers.data_patient_files
  );
  const device = useSelector((state) => state.Default_Reducers.device);

  useEffect(() => {
    let mounted = true;
    const getasyncs = async () => {
      if (mounted) {
        try {
          await AsyncStorage.getItem("file_type").then((item) => {
            if (item === null) {
              Actions.file();
            } else {
              setfiletype(item);
            }
          });
        } catch (e) {
          alert("Failed to save the data to the storage");
        }
      }
    };
    mounted && getasyncs();
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    const index = async () => {
      dispatch(
        action_get_patient_files(
          filetype,
          users_reducers?.prem_id,
          deviceStored
        )
      );
    };
    mounted && index();
    return () => (mounted = false);
  }, [dispatch, filetype, users_reducers?.prem_id, deviceStored]);
  const getfile = useCallback(
    async (item) => {
      dispatch(requestLocationPermission());
      await AsyncStorage.setItem("mobile_pdf_filename", item?.filename);
      await Actions.pdfviewer();
    },
    [dispatch, filetype]
  );
  const syncfile = useCallback(async () => {
    await setSpinner(true);

    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random = ("" + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    await dispatch(
      action_get_files(
        `${filetype}`,
        `${filetype}_${users_reducers?.patno}${random_number}.pdf`
      )
    );
    await dispatch(
      action_set_patient_files(
        users_reducers?.prem_id,
        `${filetype}_${users_reducers.patno}${random_number}.pdf`,
        filetype,
        deviceStored
      )
    );
    await dispatch(
      action_get_patient_files(filetype, users_reducers?.prem_id, deviceStored)
    );
    setSpinner(false);
  }, [dispatch, filetype]);
  const onRefresh = React.useCallback(() => {
    setSpinner(true);

    wait(1000).then(() => {
      setSpinner(false);
      dispatch(
        action_get_patient_files(
          filetype,
          users_reducers?.prem_id,
          deviceStored
        )
      );
    });
  }, [dispatch, filetype]);
  const [gestureName, setgestureName] = useState("");
  const onSwipe = useCallback((gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    setgestureName({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setSpinner(true);

        wait(1000).then(() => {
          setSpinner(false);
          dispatch(
            action_get_patient_files(
              filetype,
              users_reducers?.prem_id,
              deviceStored
            )
          );
        });

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 1000,
  };
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      config={config}
    >
      <SafeAreaView
        refreshControl={
          <RefreshControl refreshing={spinner} onRefresh={onRefresh} />
        }
      >
        <Spinner
          visible={spinner}
          textContent={"Refreshing Files"}
          textStyle={styles.spinnerTextStyle}
        />

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={spinner} onRefresh={onRefresh} />
          }
        >
          <View
            style={{ alignItems: "flex-end", marginEnd: 30, paddingTop: 10 }}
          >
            <TouchableHighlight
              onPress={() => syncfile()}
              underlayColor="white"
            >
              <Text>
                <Icons name="refresh" size={15} color="grey" /> Sync
              </Text>
            </TouchableHighlight>
          </View>
          {data_patient_files?.map((item) => (
            <TouchableHighlight
              onPress={() => getfile(item)}
              underlayColor="white"
              key={item?.filename}
            >
              <Card styles={styles.container}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "stretch",
                    height: 5 + "%",
                  }}
                >
                  <View style={{ width: 15 + "%", height: 20 }}>
                    <Image
                      style={{
                        height: 20,
                        width: "100%",
                        resizeMode: "center",
                        alignContent: "flex-start",
                      }}
                      source={require("../../assets/icons/pdf-icon.png")}
                    />
                  </View>
                  <View style={{ width: 90 + "%", height: 20 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      {item?.filename}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
UIListOfFile.propTypes = {};

export default UIListOfFile;
