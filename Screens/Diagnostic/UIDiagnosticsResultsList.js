import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Card, HelperText, Paragraph, Title } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import { action_GET_diagnostics_resultlist } from "../../Services/Actions/Diagnostic_Actions";
import { action_get_diagnostics_results } from "../../Services/Actions/MedicalRecords_Actions";
import styles from "./diagnosticresultstyles";
const UIDiagnosticsRequestList = () => {
  const [premid, setpremid] = useState("");
  const [offset, setoffset] = useState(0);
  const [resulturl, setresulturl] = useState("");
  const dispatch = useDispatch();
  const diagnostics_result_reducers = useSelector(
    (state) => state.FTP_Reducers.ftp_results
  );
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  const getprem_id = async () => {
    let mounted = true;
    if (mounted) {
      try {
        if (users_reducers?.patno) {
          await dispatch(action_get_diagnostics_results(users_reducers?.patno));
        }
      } catch (e) {
        alert("Failed to fetch the data from storage");
      }
    }
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    let mounted = true;
    const getpremidandoffset = () => {
      if (mounted) {
        getprem_id();
        setoffset(10);
      }
    };

    mounted && getpremidandoffset();
    return () => {
      mounted = false;
    };
  }, [dispatch, premid]);
  // const loadmore = async () => {
  //   let mounted = true;
  //   if (mounted) {
  //     setoffset((prev) => prev + 10);
  //     await dispatch(action_get_diagnostics_results(premid, offset));
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  // };
  const gotoresult = async (item) => {
    let mounted = true;
    if (mounted) {
      await setresulturl(item.file_path);
      await AsyncStorage.setItem("resurl", item.file_path);

      await Actions.diagnosticsresults();
    }
    return () => {
      mounted = false;
    };
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      {diagnostics_result_reducers?.data.length > 0 ? (
        <FlatList
          style={styles.container}
          data={diagnostics_result_reducers?.data}
          keyExtractor={(item, index) => index.toString()}
          // onEndReached={loadmore}
          // onEndReachedThreshold={0.1}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              onPress={() => gotoresult(item)}
              underlayColor="white"
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 2,
                }}
              >
                <Card containerStyle={styles.cardresultlist}>
                  <Text style={styles.flatlistitemappointmentno}>
                    {item.file_name}
                  </Text>
                  <Text style={styles.textfinishedat}>
                    #{item.modified_time}
                  </Text>
                </Card>
              </View>
            </TouchableHighlight>
          )}
        />
      ) : (
        <Card containerStyle={{ backgroundColor: "white" }}>
          <Image
            style={{
              resizeMode: "center",
              height: Dimensions.get("screen").width,
              width: "100%",
            }}
            source={require("../../assets/icons/nodatafound.jpg")}
          />
          <Card.Content>
            <Title style={{ textAlign: "center" }}>No Data Found</Title>
          </Card.Content>
        </Card>
      )}
    </SafeAreaView>
  );
};

export default UIDiagnosticsRequestList;
