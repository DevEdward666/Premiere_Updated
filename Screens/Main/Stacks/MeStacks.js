import React, { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "../../Login/LoginScreen";
import UpdateInfoUI from "../../Me/UpdateInfo/UpdateInfoUI";
import WaitForStatusUpdate from "../../Me/UpdateInfo/WaitForStatusUpdate";
import DeclinedMainUI from "../../Me/UpdateInfo/DeclinedMainUI";
import MeScreen from "../../Me/MeApps/MeAppsUI";
function MeStacks(props) {
  const Stack = createStackNavigator();
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data
  );
  const token = useSelector((state) => state.Default_Reducers.gettoken);
  const [updated, setupdated] = useState(false);
  const [inprocess, setprocessing] = useState(false);
  const [isdeclined, setdeclined] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const loadeds = async () => {
      if (mounted) {
        if (user_details !== null) {
          if (token !== "") {
            await setloggedin(true);
            if (!user_details?.active) {
              await setprocessing(false);
              await setupdated(false);
            } else {
              if (passbase_data?.status !== undefined) {
                if (user_details?.passbase_status === "processing") {
                  await setprocessing(true);
                  await setupdated(false);
                } else if (user_details?.passbase_status === "pending") {
                  await setprocessing(true);
                  await setupdated(false);
                  await setdeclined(false);
                } else if (user_details?.passbase_status === "approved") {
                  await setprocessing(false);
                  await setdeclined(false);
                  await setupdated(true);
                } else if (user_details?.passbase_status === "declined") {
                  await setprocessing(false);
                  await setupdated(false);
                  await setdeclined(true);
                }
              } else {
                await setprocessing(false);
                await setupdated(false);
              }
            }
          } else {
            await setloggedin(false);
          }
        }
      }
    };
    mounted && loadeds();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    user_details,
    token,
    passbase_data?.status,
    user_details?.active,
    user_details?.passbase_id,
  ]);
  return (
    <Stack.Navigator
      initialRouteName="Me"
      screenOptions={{
        headerShown: false,
        headerLeft: null,
      }}
    >
      {loggedin ? (
        user_details?.active === "false" ? (
          <Stack.Screen name="Update Info" component={UpdateInfoUI} />
        ) : inprocess ? (
          <Stack.Screen name="Waiting" component={WaitForStatusUpdate} />
        ) : isdeclined ? (
          <Stack.Screen name="Declined" component={DeclinedMainUI} />
        ) : updated ? (
          <Stack.Screen name="Screen_Me" component={MeScreen} />
        ) : (
          <Stack.Screen name="Update Info" component={UpdateInfoUI} />
        )
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default MeStacks;
