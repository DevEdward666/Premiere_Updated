import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ImageBackground,
} from "react-native";
import { Card, makeStyles } from "react-native-elements";
// import CardView from "react-native-rn-cardview";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import {
  action_GET_Docs,
  action_GET_Profileimage,
  action_GET_userdetails,
} from "../../Services/Actions/Users_Actions";
import wait from "../../Components/waitinterval";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
import styles from "./style";
import MeHeader from "./MeHeader";
import MeBody from "./MeBody";
import Skeleton from "./SkeletonMe/SkeletonMe";
import { SafeAreaView } from "react-native";
const MeScreen = () => {
  const currentyear = new Date();
  const thisyear = currentyear.getFullYear();
  const [username, setUsername] = useState("");
  const users_image = useSelector((state) => state.User_Reducers.image);
  const [loading, setLoading] = useState(1);
  const [value, setValue] = useState(false);
  const mountedRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  const [img, setimg] = useState("");
  const [doc, setdoc] = useState("");

  useEffect(() => {
    let mounted = true;
    const getasyncs = async () => {
      if (mounted) {
        try {
          await AsyncStorage.getItem("username").then((item) => {
            if (item === null) {
              Actions.home();
            } else {
              setUsername(item);
              setValue(false);
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
  const onRefresh = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      if (users_reducers?.img === "") {
        dispatch(action_GET_Profileimage(users_reducers?.img));
        dispatch(action_GET_Docs(users_reducers?.doc));
      }

      await setRefreshing(false);

      await setimg(users_reducers?.img);
      await setdoc(users_reducers?.doc);

      dispatch(action_GET_Profileimage(img));
      dispatch(action_GET_Docs(users_reducers?.doc));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, doc, users_reducers]);
  useEffect(() => {
    let mounted = true;
    const getprofileimageanddocs = async () => {
      if (mounted) {
        if (users_reducers?.img === "") {
          dispatch(action_GET_Profileimage(users_reducers?.img));
          dispatch(action_GET_Docs(users_reducers?.doc));
        }

        await setRefreshing(false);



        dispatch(action_GET_Profileimage(users_reducers?.img));
        dispatch(action_GET_Docs(users_reducers?.doc));
      }
    };

    mounted && getprofileimageanddocs();
    return () => {
      mounted = false;
    };
  }, [dispatch, img, doc]);

  const getMeInfo = async () => {
    let mounted = true;
    if (mounted) {
      await Actions.profile();
    }
    return () => {
      mounted = false;
    };
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        {users_reducers ? (
          <TouchableHighlight onPress={() => getMeInfo()} underlayColor="white">
            <MeHeader />
          </TouchableHighlight>
        ) : (
          <Skeleton />
        )}

        <MeBody />
        <View style={{ flexDirection: "row", height: 50 }}>
          <View style={{ width: "100%", height: 50, justifyContent: "center" }}>
            <Text style={styles.footertext}>Powered by TUO @ {thisyear}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

MeScreen.propTypes = {};

export default MeScreen;
