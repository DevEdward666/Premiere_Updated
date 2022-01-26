import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";

import wait from "../../Components/waitinterval";
import Spinner from "react-native-loading-spinner-overlay";
import { Card, HelperText, Paragraph, Title } from "react-native-paper";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import {
  action_GET_diagnostics_request,
  action_GET_diagnostics_request_finished,
} from "../../Services/Actions/Diagnostic_Actions";
import { RefreshControl } from "react-native";
import styles from "./diagnosticrequeststyles";
const UIDiagnosticsRequestList = () => {
  const dispatch = useDispatch();
  const diagnostics_reducers = useSelector(
    (state) => state.Diagnostic_Reducers.data_diagnostic
  );
  const diagnostics_finished_reducers = useSelector(
    (state) => state.Diagnostic_Reducers.data_finished
  );
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const [premid, setpremid] = useState("");
  const [offset, setoffset] = useState(10);
  const [refreshing, setrefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const onRefresh = useCallback(() => {
    let mounted = true;
    if (mounted) {
      setrefreshing(true);
      wait(200).then(() => {
        setrefreshing(false);
      });
      dispatch(action_GET_diagnostics_request(premid, offset));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, premid, offset]);
  useEffect(() => {
    let mounted = true;
    const getpremids = () => {
      if (mounted) {
        setpremid(users_reducers?.prem_id);

        dispatch(
          action_GET_diagnostics_request(users_reducers?.prem_id, offset)
        );

        dispatch(
          action_GET_diagnostics_request_finished(
            users_reducers?.prem_id,
            offset
          )
        );
      }
    };

    mounted && getpremids();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers?.prem_id, offset]);

  const loadmore = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(action_GET_diagnostics_request(users_reducers?.prem_id, offset));
      setoffset((prev) => prev + 10);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers?.prem_id, offset]);
  const loadmorefinished = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        action_GET_diagnostics_request_finished(users_reducers?.prem_id, offset)
      );
      setoffset((prev) => prev + 10);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers?.prem_id, offset]);

  const { height } = Dimensions.get("window");

  const FirstRoute = () =>
    diagnostics_reducers.length > 0 ? (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={diagnostics_reducers}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={offset}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd >= 0) {
              loadmore;
            }
          }}
          onEndReachedThreshold={0.1}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 2,
              }}
            >
              <Card containerStyle={styles.plate}>
                <View style={{ width: 500, height: 80 }}>
                  <Text style={styles.flatlistitemappointmentno}>
                    #{item.appointmentno}
                  </Text>
                  <Text numberOfLines={6} style={styles.flatlistitem}>
                    Name: {item.fullname}
                  </Text>
                  <Text numberOfLines={6} style={styles.flatlistitem}>
                    Status: {item.STATUS}
                  </Text>
                </View>

                {/* <Text style={styles.flatlistitem}>{card.fullname}</Text> */}
              </Card>
            </View>
            // </TouchableOpacity>
          )}
        />
      </View>
    ) : (
      <Card containerStyle={{ backgroundColor: "white" }}>
        <Image
          style={{
            resizeMode: "center",
            height: Dimensions.get("screen").width,
            width: "100%",
          }}
          source={require("../../assets/icons/no_data_found.jpg")}
        />
        <Card.Content>
          <Title style={{ textAlign: "center" }}>No Data Found</Title>
        </Card.Content>
      </Card>
    );

  const SecondRoute = () =>
    diagnostics_finished_reducers.length > 0 ? (
      <FlatList
        style={styles.container}
        data={diagnostics_finished_reducers}
        keyExtractor={(item, index) => index}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) {
            return;
          } else {
            return { loadmorefinished };
          }
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.flatlistcontainer}
            // onLongPress={() => {
            //   // Note that here you can use any function to remove the element at index from the itemState list
            //   const _itemState = itemState.filter(
            //     (_item, _index) => _index !== index,
            //   );
            //   setitemState(_itemState);
            //   setselectedprocedure(_itemState);
            // }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 2,
              }}
            >
              <Card containerStyle={styles.plate}>
                <View style={{ width: 500, height: 100, padding: 10 }}>
                  <Text style={styles.flatlistitemappointmentno}>
                    #{item.appointmentno}
                  </Text>
                  <Text style={styles.flatlistitem}>Name: {item.fullname}</Text>
                  <Text style={styles.flatlistitem}>Status: {item.STATUS}</Text>
                </View>

                {/* <Text style={styles.flatlistitem}>{card.fullname}</Text> */}
              </Card>
            </View>
          </TouchableOpacity>
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
          source={require("../../assets/icons/no_data_found.jpg")}
        />
        <Card.Content>
          <Title style={{ textAlign: "center" }}>No Data Found</Title>
        </Card.Content>
      </Card>
    );

  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Finished" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />

      <TabView
        style={styles.maincontainer}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar {...props} style={{ backgroundColor: "#0084FF" }} />
        )}
      />
    </SafeAreaView>
  );
};

export default UIDiagnosticsRequestList;
