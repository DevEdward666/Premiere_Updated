import React, { useCallback, useState } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import { ActionsetStatus } from "../../../Services/Actions/Clinic_actions";
import { useDispatch } from "react-redux";
import { Card } from "react-native-elements";
import { Actions } from "react-native-router-flux";
const Consult_Header = () => {
  const dispatch = useDispatch();
  const [status, setstatusstate] = useState("");
  const setstatus = useCallback(
    (itemValue) => {
      console.log(itemValue);
      dispatch(ActionsetStatus(itemValue));
      setstatusstate(itemValue);
    },
    [dispatch]
  );
  const gotofindmyconsultation = () => {
    Actions.searchconsult();
  };
  return (
    <View style={styles.ViewPickerContainer}>
      <Picker
        mode={"dropdown"}
        selectedValue={status}
        style={styles.PickerContainer}
        onValueChange={(itemValue, itemIndex) => setstatus(itemValue)}
      >
        <Picker.Item label="Status" />
        <Picker.Item label="For Approval" value="for approval" />
        <Picker.Item label="Approved" value="approved" />
        <Picker.Item label="Paid" value="paid" />
        <Picker.Item label="Declined" value="declined" />
      </Picker>
      <TouchableHighlight
        style={styles.userplate}
        onPress={() => gotofindmyconsultation()}
        underlayColor="#f7f7f7"
      >
        <Card containerStyle={styles.userplate}>
          <View
            style={{
              flexDirection: "row",
              height: 70,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "15%",
                height: 30,
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.iconstyle}
                source={require("../../../assets/icons/link.jpg")}
              />
            </View>
            <View
              style={{
                width: "85%",
                height: 50,
                justifyContent: "center",
              }}
            >
              <Text style={styles.textstyle}> Link my consultation</Text>
            </View>
          </View>
        </Card>
      </TouchableHighlight>
    </View>
  );
};
export default Consult_Header;
