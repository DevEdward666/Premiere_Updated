import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import SplashScreen from "react-native-splash-screen";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
function MainDrawer(props) {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const user_qr = useSelector((state) => state.User_Reducers.user_qr);
  const token = useSelector((state) => state.Default_Reducers.gettoken);
  const [qrvalue, setQrvalue] = useState("");
  useEffect(() => {
    let mounted = true;
    const getprem_image = async () => {
      if (mounted) {
        if (token !== "") {
          if (user_qr?.qrbase64 !== "") {
            await setQrvalue("data:image/png;base64," + user_qr?.qrbase64);
          }
        }
        SplashScreen.hide();
      }
    };
    mounted && getprem_image();
    return () => {
      mounted = false;
    };
  }, [user_qr]);
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then(
        async (keys) => await AsyncStorage.multiRemove(keys)
      );
      await Actions.home();
    } catch (e) {
      // remove error
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View containerStyle={styles.userplate}>
        {users_reducers !== null ? (
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ width: "30%", height: 100 }}>
              {qrvalue !== "" ? (
                <Image
                  style={{
                    marginTop: 10,
                    marginStart: 10,
                    flex: 5,
                  }}
                  source={{ uri: qrvalue, scale: 1 }}
                />
              ) : null}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 14,
                }}
              >
                {users_reducers?.lastname + "," + users_reducers?.firstname}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 14,
                }}
              >
                Premiere ID: {users_reducers?.prem_id}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row", width: "100%" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                }}
              >
                Guest
              </Text>
            </View>
          </View>
        )}
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => removeValue()} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

export default MainDrawer;
