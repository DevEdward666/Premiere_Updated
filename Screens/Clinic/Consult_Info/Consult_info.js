import React from "react";
import styles from "./style";
import { View, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { Button, Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";
const Consult_info = () => {
  const consult_info = useSelector(
    (state) => state.Clinic_Reducers.consult_info.data
  );
  const payNow = () => {
    Actions.mainpayment();
  };
  
console.log(consult_info)
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.Inputcontainer}>
        <Button
          onPress={() => handleDone()}
          buttonStyle={{
            backgroundColor: '#034c81',
            marginTop: 10,
            borderRadius: 10,
            width: '70%',
            marginBottom: 10,
            alignSelf: 'center',
            height: 50,
          }}
          title="View Medical Prescription"
        />
      </View>
      <View style={styles.Inputcontainer}>
        <Button
          onPress={() => handleDone()}
          buttonStyle={{
            backgroundColor: '#034c81',
            borderRadius: 10,
            width: '70%',
            marginBottom: 10,
            alignSelf: 'center',
            height: 50,
          }}
          title="View Medical Procedures"
        />
      </View>
      <View style={styles.Inputcontainer}>
        <Button
          onPress={() => handleDone()}
          buttonStyle={{
            backgroundColor: '#034c81',
            borderRadius: 10,
            width: '70%',
            marginBottom: 80,
            alignSelf: 'center',
            height: 50,
          }}
          title="View Medical Certificate"
        />
      </View> */}
      <View style={styles.Inputcontainer}>
        <Image
          source={require("../../../assets/icons/banner_consultation.jpg")}
          containerStyle={{ aspectRatio: 2, width: "100%", marginBottom: 10 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        {consult_info[0]?.sts_desc === "approved" ? (
          <Button
            title="PAY NOW"
            icon={{
              name: "money",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            titleStyle={{ fontWeight: "bold" }}
            buttonStyle={{
              backgroundColor: "#0084FF",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: "100%",
              paddingStart: 50,
              paddingEnd: 50,
              marginBottom: 10,
            }}
            onPress={() => payNow()}
          />
        ) : null}

        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "white",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Fullname"
          value={consult_info[0]?.first_name + " " + consult_info[0]?.last_name}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Phone No."
          value={consult_info[0]?.mob_no}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Email Address"
          value={consult_info[0]?.email}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Line1"
          value={consult_info[0]?.line1}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Line2"
          value={consult_info[0]?.line2}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="State"
          value={consult_info[0]?.provincedesc}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Postal Code"
          value={consult_info[0]?.zip_code}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="City"
          value={consult_info[0]?.citymun_desc}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Country"
          value={"PH"}
        />
      </View>
    </View>
  );
};
export default Consult_info;
