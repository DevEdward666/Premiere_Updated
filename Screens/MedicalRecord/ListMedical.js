import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  RefreshControl,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import CardView from 'react-native-rn-cardview';
import { ButtonGroup, Card } from "react-native-elements";
import Icons from "react-native-vector-icons/FontAwesome";
import { action_get_info } from "../../Services/Actions/MedicalRecords_Actions";
import wait from "../../Components/waitinterval";
import styles from "./style";
import { Actions } from "react-native-router-flux";
import { _ScrollView } from "react-native";
import { Dimensions } from "react-native";
const ListMedical = () => {
  const list_medical_records = useSelector(
    (state) => state.MedicalRecords_Reducers.list_medical_records
  );

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_single_medical_records(users_reducers?.patno));
    });
  }, [dispatch]);
  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="info-circle" size={15} color="grey" /> Information
        </Text>
      </>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icons name="file" size={15} color="grey" /> Files
      </Text>
    );
  };
  const buttons = [{ element: component1 }, { element: component2 }];

  const updateIndex = useCallback(
    async (item, index) => {
      if (index !== 0) {
        Actions.files();
      } else {
        await dispatch(action_get_info(item, true));
        await Actions.patientmedicalinfo();
      }
    },
    [dispatch]
  );
  return (
    <ScrollView
      style={{
        backgroundColor: "#f5f5f5",
        height: Dimensions.get("screen").height,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.viewheader}>
        {list_medical_records?.data?.map((item, index) => (
          <SafeAreaView key={index}>
            <Card containerStyle={styles.userplate}>
              <View
                style={{
                  flexDirection: "row",
                  height: 100,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text numberOfLines={6} style={styles.patinfoheadertext}>
                    Patient No.{" "}
                    <Text numberOfLines={6} style={styles.patinfotext}>
                      {" "}
                      {item?.patno}
                    </Text>
                  </Text>
                  <Text numberOfLines={6} style={styles.patinfoheadertext}>
                    Patient Name:{" "}
                    <Text numberOfLines={6} style={styles.patinfotext}>
                      {item?.patientname}
                    </Text>
                  </Text>
                </View>
              </View>
              <ButtonGroup
                onPress={(index) => updateIndex(item, index)}
                buttons={buttons}
                containerStyle={{ height: 35, marginBottom: 15 }}
              />
            </Card>
          </SafeAreaView>
        ))}
      </View>
    </ScrollView>
  );
};

ListMedical.propTypes = {};

export default ListMedical;
