import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Card, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomListFooter from "../../../Components/CustomProcedureFooter/CustomListFooter";
import CustomList from "../../../Components/CustomProcedureList/CustomList";
import DocumentPicker, { isInProgress } from "react-native-document-picker";
import {
  action_alerted,
  action_diagnostic_callback_reset,
  action_GET_barangay,
  action_GET_city,
  action_GET_civilstatus,
  action_GET_nationality,
  action_GET_procedure,
  action_GET_province,
  action_GET_region,
  action_GET_religion,
  ACTION_SPINNER_ALERT,
} from "../../../Services/Actions/Default_Actions";
import FilePickerManager from "react-native-file-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { action_POST_appointment } from "../../../Services/Actions/Diagnostic_Actions";
import styles from "../styles";
import DoneOverlay from "../../../Components/CustomOverlay/DoneOverlay";
import { Actions } from "react-native-router-flux";
function UsePersonalUI(props) {
  const [spinner, setSpinner] = useState(false);
  const [selectedprocedure, setselectedprocedure] = useState([]);
  const [selectedprocedurecode, setselectedprocedurecode] = useState([]);
  const [selectedprocedurecost, setselectedprocedurecost] = useState([]);
  const [procedure, setprocedure] = useState("");
  const [reasons, setreasons] = useState("");
  const [subtotal, setsubtotal] = useState(0);
  const [totalrequest, settotalrequest] = useState(0);
  const [itemState, setitemState] = useState([]);
  const [selecteddocs, setselecteddocs] = useState([]);
  const [overlayvisible, setoverlayvisible] = useState(false);
  const [erroroverlayvisible, seterroroverlayvisible] = useState(false);
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const appointment_message = useSelector(
    (state) => state.Diagnostic_Reducers.appointment_message
  );
  const procedure_reducers = useSelector(
    (state) => state.Default_Reducers.procedures
  );

  const docPicker = async () => {
    // FilePickerManager.showFilePicker(null, (response) => {
    //   console.log("Response = ", response);

    //   if (response.didCancel) {
    //     console.log("User cancelled file picker");
    //   } else if (response.error) {
    //     console.log("FilePickerManager Error: ", response.error);
    //   } else {
    //     setselecteddocs(response);
    //   }
    // });

    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setselecteddocs(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };
  const handleSubmitAppointment = useCallback(async () => {
    await setSpinner(true);
    
    dispatch(
      action_POST_appointment(
        users_reducers?.prem_id,
        reasons,
        totalrequest.toFixed(2),
        selectedprocedurecode,
        selecteddocs
      )
    );
  }, [dispatch, users_reducers?.prem_id, selectedprocedurecode, selecteddocs]);
  useEffect(() => {
    let mounted = true;
    const settotal = async () => {
      await setsubtotal(0);
      itemState?.map(async (item) => {
        await setsubtotal((prev) => prev + item?.price);
      });
    };
    mounted && settotal();
    return () => {
      mounted = false;
    };
  }, [itemState]);
  const handleSearchProcedure = useCallback(
    async (text) => {
      dispatch(action_GET_procedure(text));
      await setprocedure(text);
    },
    [dispatch]
  );
  const handleProcedureChange = useCallback(
    (pickprocedure) => {
      let found = false;
      {
        selectedprocedurecode.map((item) => {
          if (item.proccode === pickprocedure?.proccode.toString()) {
            found = true;
          }
        });
      }
      if (!found) {
        setselectedprocedure((prev) => [
          ...prev,
          { desc: pickprocedure.procdesc, price: pickprocedure.regprice },
        ]);
        settotalrequest((prev) => prev + parseInt(pickprocedure.regprice));
        setitemState((prev) => [
          ...prev,
          { desc: pickprocedure.procdesc, price: pickprocedure.regprice },
        ]);
        setselectedprocedurecode((prev) => [
          ...prev,
          {
            proccode: pickprocedure?.proccode,
            procdesc: pickprocedure?.procdesc,
            proccost: pickprocedure?.regprice,
          },
        ]);
        setselectedprocedurecost([{ price: pickprocedure.regprice }]);
        dispatch(action_GET_procedure(""));
        setprocedure("");
      } else {
        alert("Item Already in List");
      }
    },
    [selectedprocedurecode, dispatch]
  );
  const handleDeletedItems = useCallback(
    async (index) => {
      const _itemState = itemState.filter((_item, _index) => _index !== index);
      const _selectedprocedure = selectedprocedure.filter(
        (_item, _index) => _index !== index
      );
      const _selectedprocedurecode = selectedprocedurecode.filter(
        (_item, _index) => _index !== index
      );
      await setselectedprocedurecode(_selectedprocedurecode);
      await setselectedprocedure(_selectedprocedure);
      await setitemState(_itemState);
    },

    [itemState, selectedprocedure, selectedprocedurecode]
  );
  useEffect(() => {
    let mounted = true;
    const getcallback = async () => {
      if (mounted) {
        if (appointment_message?.success === true) {
          setSpinner(false);
          if (appointment_message?.message.includes("error")) {
            await seterroroverlayvisible(true);
          } else {
            await setoverlayvisible(true);
          }
        }
        if (appointment_message?.message.includes("error")) {
          setSpinner(false);
          await seterroroverlayvisible(true);
        }
        setSpinner(false);
        console.log(appointment_message);
      }
    };
    mounted && getcallback();
    return () => {
      mounted = false;
    };
  }, [appointment_message?.success, appointment_message?.message]);
  const handleDone = useCallback(async () => {
    // dispatch(action_alerted(false));
    dispatch(action_diagnostic_callback_reset());
    await setoverlayvisible(false);
    await Actions.diagnostics();
  }, [dispatch]);
  const handleDoneError = useCallback(async () => {
    // dispatch(action_alerted(false));
    await seterroroverlayvisible(false);
    dispatch(action_diagnostic_callback_reset());
  }, [dispatch]);
  return (
    <>
      {spinner ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}
        {erroroverlayvisible ? (
          <ErrorOverlay
            visible={true}
            message={appointment_message?.message}
            UI={
              <Button
                onPress={() => handleDoneError()}
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

        {overlayvisible ? (
          <DoneOverlay
            visible={true}
            message={appointment_message?.message}
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

    <View style={styles.maincontainer}>
      <FlatList
        style={styles.Inputcontainer}
        data={selecteddocs}
        keyExtractor={(item, index) => item?.name}
        renderItem={({ item, index }) => (
          <Card key={item?.name}>
            <Text key={index}>{item?.name}</Text>
          </Card>
        )}
        ListHeaderComponent={
          <View>
            <SafeAreaView>
              <Spinner
                visible={spinner}
                textContent={"Loading..."}
                textStyle={styles.spinnerTextStyle}
              />
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: "#3eb2fa",
                    background: "white",
                    underlineColor: "transparent",
                  },
                }}
                mode="flat"
                label="Search Procedure"
                onChangeText={(text) => handleSearchProcedure(text)}
                value={procedure}
              />
              <View>
                <FlatList
                  style={{ flex: 1 }}
                  data={procedure_reducers}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleProcedureChange(item)}
                    >
                      <Card key={index}>
                        <Text style={{ fontSize: 10 }}>{item?.procdesc}</Text>
                      </Card>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <FlatList
                style={{ flex: 1 }}
                data={itemState}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    onLongPress={() => {
                      handleDeletedItems(index);
                    }}
                  >
                    <CustomList price={item?.price} desc={item?.desc} />
                  </TouchableOpacity>
                )}
              />
              <CustomListFooter customsubtotal={subtotal} />
            </SafeAreaView>
          </View>
        }
        ListFooterComponent={
          <View style={{ width: "100%", marginBottom: 100 }}>
            <View
              style={{
                width: "50%",

                alignSelf: "center",
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
            <TextInput
              style={styles.text}
              multiline
              numberOfLines={5}
              maxLength={100}
              theme={{
                colors: {
                  primary: "#3eb2fa",
                  background: "white",
                  underlineColor: "transparent",
                },
              }}
              containerStyle={{ borderRadius: 15 }}
              style={{ padding: 10, marginBottom: 30, marginTop: 10 }}
              mode="flat"
              label="Reason for Requisition"
              onChangeText={(text) => setreasons(text)}
              value={reasons}
            />
            <Button
              buttonStyle={{
                backgroundColor: "#0084FF",
                borderRadius: 25,
                width: "70%",
                alignSelf: "center",
              }}
              onPress={() => handleSubmitAppointment()}
              title="Submit Appointment"
            />
          </View>
        }
      />
    </View>
    </>
  );
}

export default UsePersonalUI;
