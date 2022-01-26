import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import RNPickerDialog from "rn-modal-picker";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Button, Card } from "react-native-elements";
import DocumentPicker from "react-native-document-picker";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style";
import Styles from "../pickerstyle";
import Spinner from "react-native-loading-spinner-overlay";
import {
  action_POST_clinic_appointment,
  action_reset_submit,
} from "../../../Services/Actions/Clinic_actions";
import DoneOverlay from "../../../Components/CustomOverlay/DoneOverlay";
import { Actions } from "react-native-router-flux";
import { action_clinic_callback_reset } from "../../../Services/Actions/Default_Actions";
function UsePersonalUI(props) {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message
  );
  const departments = useSelector(
    (state) => state.Default_Reducers.departments
  );
  const dispatch = useDispatch();
  const [symptomps, setsymptomps] = useState("");
  const [complaint, setcomplaint] = useState("");
  const [remarks, setremarks] = useState("");
  const [getspinner, setSpinner] = useState(false);
  const [pickdepartmentindex, setpickdepartmentindex] = useState("");
  const [pickdepartment, setpickdepartment] = useState("");
  const [pickdepartmentcode, setpickdepartmentcode] = useState("");
  const [overlayvisible, setoverlayvisible] = useState(false);
  const [getdepartments, setdepartments] = useState([]);
  const [selecteddocs, setselecteddocs] = useState([]);
  useEffect(() => {
    let mounted = true;
    const dropdownitems = () => {
      if (mounted) {
        setdepartments(
          departments.map((item, index) => ({
            index: index,
            code: item.deptcode,
            desc: item?.deptname.toString(),
            id: item.dept_pk,
            name: item?.deptname.toString(),
          }))
        );
      }
    };

    mounted && dropdownitems();
    return () => {
      mounted = false;
    };
  }, [departments]);
  const docPicker = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setselecteddocs(results);
      console.log(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
      }
    }
  };
  const handleDepartment = (pickstatus) => {
    let mounted = true;
    if (mounted) {
      setpickdepartmentindex(pickstatus?.index);
      setpickdepartmentcode(pickstatus?.code);
      setpickdepartment(pickstatus?.desc);
    }
    return () => {
      mounted = false;
    };
  };
  const handleSubmitAppointment = useCallback(async () => {
    await setSpinner(true);
    dispatch(
      action_POST_clinic_appointment(
        users_reducers?.img,
        users_reducers?.prem_id,
        users_reducers?.prem_id,
        pickdepartmentcode,
        complaint,
        symptomps,
        remarks,
        selecteddocs
      )
    );
  }, [
    dispatch,
    pickdepartmentcode,
    users_reducers?.prem_id,
    complaint,
    symptomps,
    remarks,
    selecteddocs,
  ]);
  const handleDone = useCallback(async () => {
    setoverlayvisible(false);
    dispatch(action_reset_submit());
    dispatch(action_clinic_callback_reset());

    setTimeout(() => {
      Actions.consultlist();
    }, 500);
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getresponse = () => {
      if (mounted) {
        if (appointment_message?.success) {
          setSpinner(false);
          {
            setoverlayvisible(true);
          }
        } else {
          setSpinner(false);
          setoverlayvisible(false);
        }
      }
    };
    mounted && getresponse();
    return () => {
      mounted = false;
    };
  }, [appointment_message?.success]);
  return (
    <>
      {getspinner ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}

      <View style={styles.container}>
        {overlayvisible ? (
          <DoneOverlay
            visible={true}
            message={`Your consultation request has been created. We will keep in touch for further details.`}
            UI={
              <Button
                onPress={() => handleDone()}
                buttonStyle={{
                  backgroundColor: "#0084FF",
                  borderRadius: 10,
                  width: "70%",
                  marginBottom: 80,
                  alignSelf: "center",
                  height: 50,
                }}
                title="Done"
              />
            }
          />
        ) : null}

        <FlatList
          style={styles.Inputcontainer}
          data={selecteddocs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Card key={item?.name}>
              <Text>{item?.name}</Text>
            </Card>
          )}
          ListHeaderComponent={
            <View scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}>
              <RNPickerDialog
                data={getdepartments}
                pickerTitle={"Department"}
                // labelText={'testss'}
                showSearchBar={true}
                showPickerTitle={true}
                listTextStyle={Styles.listTextStyle}
                pickerStyle={Styles.pickerStyle}
                selectedText={pickdepartment}
                placeHolderText={"Department"}
                searchBarPlaceHolder={"Search....."}
                searchBarPlaceHolderColor={"#9d9d9d"}
                selectedTextStyle={Styles.selectedTextStyle}
                placeHolderTextColor={"gray"}
                dropDownIconStyle={Styles.dropDownIconStyle}
                searchBarStyle={Styles.searchBarStyle}
                //dropDownIcon={require('../assets/pin.png')}
                selectedValue={(index, item) => handleDepartment(item)}
              />
              <TextInput
                multiline
                style={styles.text}
                numberOfLines={5}
                maxLength={100}
                theme={{
                  colors: {
                    primary: "#3eb2fa",
                    background: "white",
                    underlineColor: "transparent",
                  },
                }}
                mode="flat"
                label="Chief Complaint*"
                onChangeText={(text) => setcomplaint(text)}
                value={complaint}
              />
              <TextInput
                multiline
                style={styles.text}
                numberOfLines={5}
                maxLength={100}
                theme={{
                  colors: {
                    primary: "#3eb2fa",
                    background: "white",
                    underlineColor: "transparent",
                  },
                }}
                mode="flat"
                label="Symptomps*"
                onChangeText={(text) => setsymptomps(text)}
                value={symptomps}
              />
              <TextInput
                multiline
                style={styles.text}
                numberOfLines={5}
                maxLength={100}
                theme={{
                  colors: {
                    primary: "#3eb2fa",
                    background: "white",
                    underlineColor: "transparent",
                  },
                }}
                mode="flat"
                label="Notes or Other Remarks"
                onChangeText={(text) => setremarks(text)}
                value={remarks}
              />
            </View>
          }
          ListFooterComponent={
            <View style={{ marginBottom: 50 }}>
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
              <View style={{ margin: 10 }}>
                <Button
                  buttonStyle={{
                    backgroundColor: "#0084FF",
                    borderRadius: 25,
                    bottom: 0,
                    marginTop: 50,
                    width: "70%",
                    alignSelf: "center",
                  }}
                  onPress={() => handleSubmitAppointment()}
                  title="Submit Appointment"
                />
              </View>
            </View>
          }
        />
      </View>
    </>
  );
}

export default UsePersonalUI;
