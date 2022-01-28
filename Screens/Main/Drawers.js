import React, { useCallback, useEffect, useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ExploreStack from "./Stacks/ExploreStack";
import DoctorsStack from "./Stacks/DoctorsStack";
import ServiceStack from "./Stacks/ServiceStack";
import MeStacks from "./Stacks/MeStacks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";
import {
  action_set_device_token,
  action_set_token,
} from "../../Services/Actions/Default_Actions";
import { useDispatch, useSelector } from "react-redux";
import MainDrawer from "./MainDrawer";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { action_passbase_get_single_info } from "../../Services/Actions/PassbaseActions";
import {
  action_GET_Docs,
  action_GET_Profileimage,
  action_setqr,
} from "../../Services/Actions/Users_Actions";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import DeviceInfo from "react-native-device-info";
import notif_icon from "../../assets/icons/tugegarao.png";
function Drawers(props) {
  const Drawer = createDrawerNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: "#0084FF",
      background: "#ffffff",

      card: "white",
      text: "#0084FF",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };
  const token = useSelector((state) => state.Default_Reducers.gettoken);
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data
  );
  const dispatch = useDispatch();
  const [fcmtoken, setfcmtoken] = React.useState("");
  const [getdeviceid, setdeviceid] = React.useState("");
  useEffect(() => {
    let mounted = true;
    const getnotications = async () => {
      if (mounted) {
        if (token !== "") {
          if (user_details !== null) {
            dispatch(
              action_passbase_get_single_info(user_details?.passbase_id)
            );
          }
        }
      }
    };
    mounted && getnotications();
    return () => {
      mounted = false;
    };
  }, [dispatch, user_details?.passbase_id]);
  useEffect(() => {
    let mounted = true;
    const getdefaults = async () => {
      if (mounted) {
        if (token !== "") {
          dispatch(action_setqr());
          dispatch(action_GET_Profileimage(user_details?.img));
          dispatch(action_GET_Docs(user_details?.docs));
        }
      }
    };
    mounted && getdefaults();
    return () => {
      mounted = false;
    };
  }, [dispatch, user_details]);
  useEffect(() => {
    let mounted = true;
    const getasyncs = async () => {
      if (mounted) {
        if (token === "") {
          try {
            await AsyncStorage.getItem("tokenizer").then((item) => {
              if (item === null) {
                Actions.home();
              } else {
                dispatch(action_set_token(item));
              }
            });
          } catch (e) {
            alert("Failed to save the data to the storage");
          }
        }
      }
    };
    mounted && getasyncs();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handleProfileClick = useCallback(() => {
    if (token !== "") {
      if (
        user_details?.passbase_status === "processing" ||
        user_details?.passbase_status === "pending"
      ) {
        Actions.waiting();
      } else if (user_details?.passbase_status === "declined") {
        Actions.declined_info();
      } else if (user_details?.passbase_status === "approved") {
        Actions.me();
      } else {
        Actions.update_info();
      }
    } else {
      Actions.home();
    }
  }, [
    token,
    passbase_data?.status,
    user_details?.passbase_id,
    user_details?.passbase_status,
    dispatch,
  ]);

  const handleNotifClick = useCallback(() => {
    if (token !== "") {
      if (
        user_details?.passbase_status === "processing" ||
        user_details?.passbase_status === "pending"
      ) {
        Actions.waiting();
      } else if (user_details?.passbase_status === "declined") {
        Actions.declined_info();
      } else if (user_details?.passbase_status === "approved") {
        Actions.notif();
      } else {
        Actions.update_info();
      }
    } else {
      Actions.home();
    }
  }, [token, user_details]);
  React.useEffect(() => {
    let mounted = true;
    const getnotification = () => {
      if (mounted) {
        PushNotification.createChannel(
          {
            channelId: "premiere_client", // (required)
            channelName: "Premiere_Client", // (required)
            // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.configure({
          onRegister: function (token) {
            setdeviceid(DeviceInfo.getDeviceId());
            setfcmtoken(token);
          },
          onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            if (notification.foreground) {
              PushNotification.localNotification({
                channelId: "premiere_client",
                title: notification.title,
                message: notification.message,
                priority: "high",
                ignoreInForeground: false,
                visibility: "public",
                largeIcon: notif_icon,
                showWhen: true,
                allowWhileIdle: true,
              });
            }

            notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          onAction: function (notification) {
            // console.log("ACTION:", notification.action);
            // console.log("NOTIFICATION:", notification);
          },
          onRegistrationError: function (err) {
            console.error(err.message, err);
          },
          permissions: {
            alert: true,
            badge: true,
            sound: true,
          },
          popInitialNotification: true,
          requestPermissions: true,
        });
      }
    };
    mounted && getnotification();
    return () => {
      mounted = false;
    };
  }, []);
  React.useEffect(() => {
    let mounted = true;
    const insertdevicetoken = () => {
      if (mounted) {
        if (token !== "") {
          if (user_details?.prem_id !== "" && fcmtoken?.token !== undefined) {
            dispatch(
              action_set_device_token(
                user_details?.prem_id?.toString(),
                fcmtoken?.token,
                getdeviceid
              )
            );
          }
        }
      }
    };

    mounted && insertdevicetoken();
    return () => {
      mounted = false;
    };
  }, [dispatch, user_details?.prem_id, fcmtoken?.token, getdeviceid]);

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        shifting={true}
        initialRouteName="Menu"
        screenOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 5 },
          headerTintColor: "#0084FF",
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon="bell"
                color={"#0084FF"}
                size={30}
                onPress={() => handleNotifClick()}
              />
              <IconButton
                icon="account-circle"
                color={"#0084FF"}
                size={30}
                onPress={() => handleProfileClick()}
              />
            </View>
          ),
        }}
        drawerContent={(props) => <MainDrawer {...props} />}
      >
        <Drawer.Screen
          name="Premiere"
          component={ExploreStack}
          headerShown={false}
        />
        <Drawer.Screen name="Doctors" component={DoctorsStack} />
        <Drawer.Screen name="Services" component={ServiceStack} />
        <Drawer.Screen name="Me" component={MeStacks} />
        {/* <Drawer.Screen name="Logout" onPress={()=>removeValue()} component={}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Drawers;
