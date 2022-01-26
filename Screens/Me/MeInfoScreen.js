import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
  Platform,
  RefreshControl,
} from "react-native";
import { action_GET_doctors_info } from "../../Services/Actions/Doctors_Actions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  action_GET_userdetails,
  action_GET_Docs,
} from "../../Services/Actions/Users_Actions";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./infostyle";
import { Card, Badge, Icon } from "react-native-elements";
import moment from "moment";
import { SafeAreaView } from "react-native";
import ImageView from "react-native-image-viewing";
import { TextInput } from "react-native-paper";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from "react-native-image-crop-picker";
import {
  UploadFile,
  UploadProfile,
  reset_update_profile_callback,
} from "../../Services/Actions/SignUp_Actions";
import CustomSnackBar from "../../Components/CustomSnackBar/CustomSnackbar";
const MeInfo = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const users_image = useSelector((state) => state.User_Reducers.image);
  const docs_image = useSelector((state) => state.User_Reducers.docimage);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const updated_profile = useSelector(
    (state) => state.SignUp_Reducers.updated_profile
  );
  const [username, setusername] = useState("");
  const [docname, setdocname] = useState("");
  const [getuserimage, setuserimage] = useState("");
  const [getdocimage, setdocimage] = useState("");
  const [getcallbackmessage, setcallbackmessage] = useState("");
  const [getcallbackshow, setcallbackshow] = useState(false);
  const [selecteddocs, setselecteddocs] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [Docsvisible, setDocsIsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let mounted = true;
    const getuserdocs = async () => {
      if (mounted) {
        if (users_image == "")
          await AsyncStorage.getItem("username").then((item) => {
            setusername(item);
          });
        setcallbackmessage("");
        setcallbackshow(false);
      }
    };

    mounted && getuserdocs();
    return () => {
      mounted = false;
    };
  }, [dispatch, username]);

  useEffect(() => {
    let mounted = true;
    const getuserdocs = async () => {
      if (mounted) {
        await setcallbackmessage("");
        await setcallbackshow(false);
        await setuserimage(users_image);
        await setdocimage(docs_image);
        dispatch(reset_update_profile_callback());
        await setRefreshing(false);
      }
    };

    mounted && getuserdocs();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_image, docs_image]);
  const FirstRoute = () => (
    <SafeAreaView style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TextInput
          label="First Name"
          value={users_reducers?.firstname}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: "#3eb2fa",
              background: "white",
              backgroundColor: "white",
              underlineColor: "transparent",
            },
          }}
          mode="flat"
        />
        <TextInput
          label="Middle Name"
          value={users_reducers?.middlename}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: "#3eb2fa",
              background: "white",
              backgroundColor: "white",
              underlineColor: "transparent",
            },
          }}
          mode="flat"
        />
        <TextInput
          label="Last Name"
          value={users_reducers?.lastname}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: "#3eb2fa",
              background: "white",
              backgroundColor: "white",
              underlineColor: "transparent",
            },
          }}
          mode="flat"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TextInput
          label="Mobile No"
          value={users_reducers?.mobileno}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: "#3eb2fa",
              background: "white",
              backgroundColor: "white",
              underlineColor: "transparent",
            },
          }}
          mode="flat"
        />
        <TextInput
          label="Email"
          value={users_reducers?.email}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: "#3eb2fa",
              background: "white",
              backgroundColor: "white",
              underlineColor: "transparent",
            },
          }}
          mode="flat"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TextInput
          label="Birthdate"
          value={moment(users_reducers?.birthdate).format("MMMM D, YYYY")}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: "#3eb2fa",
              background: "white",
              backgroundColor: "white",
              underlineColor: "transparent",
            },
          }}
          mode="flat"
        />
      </View>
    </SafeAreaView>
  );
  const docPicker = useCallback(async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setselecteddocs(results);
      dispatch(UploadFile(results));
      setdocimage(results?.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
      }
    }
  }, [dispatch]);
  const SecondRoute = () => {
    if (getdocimage.includes("Error")) {
      return (
        <View style={{ marginTop: 50 }}>
          <View
            style={{
              width: "30%",
              // top: moderateScale(8),
              alignSelf: "center",
              // borderRadius: moderateScale(10),
            }}
          >
            <TouchableOpacity
              style={{ borderRadius: 10, alignSelf: "center" }}
              onPress={() => docPicker()}
            >
              <Text style={{ fontSize: 18 }}>Upload Files</Text>
              <Icon
                style={{ alignSelf: "center" }}
                name="cloud-upload"
                size={50}
                color="#0084FF"
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <>
          <ImageView
            images={Docsimages}
            imageIndex={0}
            visible={Docsvisible}
            onRequestClose={() => setDocsIsVisible(false)}
          />
          <TouchableHighlight
            onPress={() => setDocsIsVisible(true)}
            underlayColor={"white"}
          >
            <Image style={styles.docs} source={{ uri: getdocimage }} />
          </TouchableHighlight>
        </>
      );
    }
  };
  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Information" },
    { key: "second", title: "Docs" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const Profileimages = [
    {
      uri: getuserimage,
    },
  ];
  const Docsimages = [
    {
      uri: getdocimage,
    },
  ];
  const profilepicker = useCallback(async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((results) => {
        let file = {
          uri: Platform.OS === "ios" ? `file:///${results.path}` : results.path,
          type: results?.mime,
          name: results?.path.split("/").pop(),
          size: results?.size,
        };
        dispatch(UploadProfile(file));
        setuserimage(results?.path);
        ImagePicker.clean()
          .then(() => {
            console.log("removed all tmp images from tmp directory");
          })
          .catch((e) => {
            alert(e);
          });
      });
    } catch (err) {
      if (ImagePicker.isCancel(err)) {
        console.log(err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
      }
    }
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getcallback = async () => {
      if (mounted) {
        if (updated_profile?.message !== "") {
          await setcallbackmessage(updated_profile?.message);
          await setcallbackshow(true);
          dispatch(action_GET_userdetails());
          dispatch(reset_update_profile_callback());
        }
      }
    };
    mounted && getcallback();
    return () => {
      mounted = false;
    };
  }, [dispatch, updated_profile]);
  const onRefresh = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setRefreshing(true);
      dispatch(action_GET_userdetails());
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <SafeAreaView>
      <ImageView
        images={Profileimages}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card containerStyle={styles.userplate}>
          <View>
            <View style={styles.header}>
              <TouchableHighlight
                style={styles.avatar}
                onPress={() => setIsVisible(true)}
              >
                <Image
                  style={styles.avatar}
                  source={{
                    uri: getuserimage,
                    scale: 1,
                  }}
                />
              </TouchableHighlight>
              <View style={{ flex: 1 }}>
                <Icon
                  containerStyle={{
                    position: "absolute",
                    top: 120,
                    right: 80,
                  }}
                  raised
                  name="plus"
                  type="font-awesome"
                  color="#0084FF"
                  onPress={() => profilepicker()}
                />
              </View>
            </View>
          </View>
          <View style={styles.body2}>
            <View style={styles.bodyContent2}>
              <Text style={styles.name}>
                {users_reducers?.lastname}, {users_reducers?.firstname}{" "}
                {users_reducers?.middlename}
              </Text>

              <Text style={styles.info}>{users_reducers?.prem_id}</Text>
            </View>
          </View>
        </Card>
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
      </ScrollView>
      {getcallbackshow ? (
        <CustomSnackBar open={true} message={getcallbackmessage} />
      ) : null}
    </SafeAreaView>
  );
};
export default MeInfo;
