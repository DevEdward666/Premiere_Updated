import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DoneOverlay from "../../../Components/CustomOverlay/DoneOverlay";
import CustomSnackbar from "../../../Components/CustomSnackBar/CustomSnackbar";
import { Button } from "react-native-elements";
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_province,
} from "../../../Services/Actions/Default_Actions";
import RNPickerDialog from "rn-modal-picker";
import { action_passbase_get_single_info } from "../../../Services/Actions/PassbaseActions";
import Spinner from "react-native-loading-spinner-overlay";
import { action_update_info } from "../../../Services/Actions/SignUp_Actions";
import { Actions } from "react-native-router-flux";
import styles from "./style";
import Styles from "./pickerstyle";
const UpdateAddressUI = () => {
  const dispatch = useDispatch();
  const region_reducers = useSelector((state) => state.Default_Reducers.region);

  const passbase_id = useSelector(
    (state) => state.PassbaseReducers.passbase_id
  );
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data
  );
  const barangay_reducers = useSelector(
    (state) => state.Default_Reducers.barangay
  );
  const province_reducers = useSelector(
    (state) => state.Default_Reducers.provinces
  );
  const religion_reducers = useSelector(
    (state) => state.Default_Reducers.religion
  );
  const civil_status_reducers = useSelector(
    (state) => state.Default_Reducers.civil_status
  );
  const city_reducers = useSelector((state) => state.Default_Reducers.city);

  const nationality_reducers = useSelector(
    (state) => state.Default_Reducers.nationality
  );
  const updateimageinfo = useSelector(
    (state) => state.SignUp_Reducers.updateimageinfo
  );
  const updateinfo = useSelector((state) => state.SignUp_Reducers.updateinfo);
  const tests = useSelector((state) => state.SignUp_Reducers);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const [spinner, setSpinner] = useState(false);
  const [imageresponse, setimageresponse] = useState(null);
  const [profileimageresponse, setprofileimageresponse] = useState(null);
  const [promptopen, setpromptopen] = useState(false);
  const [prmoptmessage, setprmoptmessage] = useState("");
  const [barangay, setbarangay] = useState("");
  const [barangaylabel, setbarangaylabel] = useState("");
  const [barangayvalue, setbarangayvalue] = useState("");
  const [nationality, setnationality] = useState("");
  const [city, setcity] = useState("");
  const [citylabel, setcitylabel] = useState("");
  const [cityvalue, setcityvalue] = useState("");
  const [psgc, setpsgc] = useState("");
  const [region, setregion] = useState("");
  const [regiondesc, setregiondesc] = useState("");
  const [province, setprovince] = useState("");
  const [provincelabel, setprovincelabel] = useState("");
  const [provincevalue, setprovincevalue] = useState("");
  const [fulladdress, setfulladdress] = useState("");
  const [getpickerregions, setpickerregions] = useState([]);
  const [getpickerbarangay, setpickerbarangay] = useState([]);
  const [getpickerprovince, setpickerprovince] = useState([]);
  const [getpickercity, setpickercity] = useState([]);
  const [getpickernationality, setpickernationality] = useState([]);
  const [getpickercivilstatus, setpickercivilstatus] = useState([]);
  const [getpickerreligion, setpickerreligion] = useState([]);
  const [civilstatus, setCivilStatus] = useState("");
  const [civilstatuslabel, setCivilStatuslabel] = useState("");
  const [civilstatusvalue, setCivilStatusvalue] = useState("");
  const [religion, setreligion] = useState("");
  const [overlayvisible, setoverlayvisible] = useState(false);
  console.log(tests?.updateinfo);
  useEffect(() => {
    let mounted = true;
    const dropdownitems = async () => {
      if (mounted) {
        await setpickerregions(
          region_reducers.map((item) => ({
            code: item.regioncode,
            desc: item.regiondesc,
            id: item.regioncode,
            name: item.regiondesc,
          }))
        );
        await setpickerbarangay(
          barangay_reducers.map((item) => ({
            code: item.barangaycode,
            desc: item.barangaydesc,
            id: item.barangaycode,
            name: item.barangaydesc,
          }))
        );
        await setpickerprovince(
          province_reducers.map((item) => ({
            code: item.provincecode,
            desc: item.provincedesc,
            id: item.provincecode,
            name: item.provincedesc,
          }))
        );
        await setpickercity(
          city_reducers.map((item) => ({
            code: item.citymuncode,
            desc: item.citymundesc,
            id: item.citymuncode,
            name: item.citymundesc,
          }))
        );
        await setpickernationality(
          nationality_reducers.map((item) => ({
            code: item.nationality,
            desc: item.nationality,
            id: item.nationality,
            name: item.nationality + "(" + item.country + ")",
          }))
        );
        await setpickercivilstatus(
          civil_status_reducers.map((item) => ({
            code: item.cskey,
            desc: item.csdesc.toString(),
            id: item.cskey,
            name: item.csdesc.toString(),
          }))
        );
        await setpickerreligion(
          religion_reducers.map((item) => ({
            code: item.religion,
            desc: item.description,
            id: item.religion,
            name: item.description + "(" + item.religion + ")",
          }))
        );
        // await setpickerregions(regions);
        // await setpickerbarangay(barangay);
        // await setpickerprovince(province);
        // await setpickercity(city);
        // await setpickernationality(nationalitypick);
        // await setpickercivilstatus(civilstatus);
        // await setpickerreligion(religion);
      }
    };

    mounted && dropdownitems();
    return () => {
      mounted = false;
    };
  }, [
    region_reducers,
    barangay_reducers,
    province_reducers,
    city_reducers,
    civil_status_reducers,
    religion_reducers,
    nationality_reducers,
  ]);
  const handleRegionChange = useCallback(
    (pickregion) => {
      setregion(pickregion?.code);
      setregiondesc(pickregion?.desc);
      setprovince("");
      setcity("");
      setbarangay("");
      dispatch(action_GET_province(pickregion?.code));
    },
    [dispatch]
  );

  const handleProvinceChange = useCallback(
    (pickprovince) => {
      setprovince(pickprovince?.code);
      setprovincelabel(pickprovince?.desc);
      setprovincevalue(pickprovince?.code);
      dispatch(action_GET_city(region, pickprovince?.code));
    },
    [dispatch, region]
  );
  const handleCityChange = useCallback(
    (pickcity) => {
      setcity(pickcity?.code);
      setcitylabel(pickcity?.desc);
      setcityvalue(pickcity?.code);
      dispatch(action_GET_barangay(region, provincevalue, pickcity?.code));
    },
    [dispatch, region, provincevalue]
  );
  const handleCivilStatus = async (pickstatus) => {
    await setCivilStatus(pickstatus?.code);
    await setCivilStatuslabel(pickstatus?.desc);
    await setCivilStatusvalue(pickstatus?.code);
  };

  const handleReligion = useCallback(async (pickreligion) => {
    setreligion(pickreligion?.code);
  }, []);
  const handleBarangayChange = useCallback(async (pickBarangay) => {
    setbarangay(pickBarangay?.code);
    setbarangaylabel(pickBarangay?.desc);
    setbarangayvalue(pickBarangay?.code);
    setpsgc(pickBarangay?.desc + "," + citylabel + "," + provincelabel);
  }, []);
  const handleNationality = useCallback(async (pickNationality) => {
    setnationality(pickNationality?.code);
  }, []);
  // useEffect(() => {
  //   let mounted = true;
  //   const getsinglepassbaseinfo = () => {
  //     if (mounted) {
  //       dispatch(action_passbase_get_single_info(passbase_id));
  //     }
  //   };
  //   mounted && getsinglepassbaseinfo();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [dispatch, passbase_id]);
  const NextStep = useCallback(() => {
    if (
      nationality == "" ||
      region == "" ||
      province == "" ||
      city == "" ||
      barangay == "" ||
      civilstatusvalue == ""
    ) {
      setprmoptmessage("Please fill all fields");
      setpromptopen(true);
    } else {
      setpromptopen(false);
      setSpinner(true);

      dispatch(
        action_update_info(
          users_reducers?.username,
          civilstatusvalue,
          region,
          religion,
          nationality,
          city,
          province,
          barangay,
          fulladdress,
          "true",
          passbase_id,
          passbase_data?.status
        )
      );
    }
  }, [
    dispatch,
    civilstatusvalue,
    region,
    city,
    province,
    barangay,
    religion,
    nationality,
    fulladdress,
    passbase_id,
    users_reducers?.username,
  ]);
  useEffect(() => {
    let mounted = true;
    const successfullyupdated = () => {
      if (mounted) {
        if (updateinfo?.success) {
          setSpinner(false);
          setoverlayvisible(true);
        } else {
          setSpinner(false);
        }
      }
    };
    mounted && successfullyupdated();
    return () => {
      mounted = false;
    };
  }, [updateinfo?.success, updateinfo?.message]);
  console.log(updateinfo);
  const handleDone = () => {
    Actions.index();
  };
  return (
    <>
      {overlayvisible ? (
        <DoneOverlay
          visible={true}
          message={`Account updated successfully!. Please be patience while our team validating your details sent to us. Thank You!`}
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
      {spinner ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}

      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <CustomSnackbar message={prmoptmessage} open={promptopen} />
        <Text style={styles.TextAddressSubtitle}>
          Update your contact address
        </Text>
        <ScrollView>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickercivilstatus}
              pickerTitle={"Civil Status"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={civilstatuslabel}
              placeHolderText={"Civil Status"}
              searchBarPlaceHolder={"Search....."}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleCivilStatus(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleCivilStatus(itemValue);
          }}
          placeholder="Civil Status"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickercivilstatus}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => handleCivilStatus(text),
          }}
          defaultIndex={2}
          resetValue={false}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickernationality}
              pickerTitle={"Nationality"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={nationality}
              placeHolderText={"Select Nationality"}
              searchBarPlaceHolder={"Select Nationality"}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleNationality(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleNationality(itemValue);
          }}
          label="Select Nationality"
          placeholder="Select Nationality"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickernationality}
          defaultIndex={0}
          resetValue={false}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            placeholder: "Select Nationality",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickerreligion}
              pickerTitle={"Religion"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={religion}
              placeHolderText={"Select Religion"}
              searchBarPlaceHolder={"Select Religion"}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleReligion(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleReligion(itemValue);
          }}
          label="Select Religion"
          placeholder="Select Religion"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickerreligion}
          defaultIndex={0}
          resetValue={false}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            placeholder: "Select Religion",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickerregions}
              pickerTitle={"Region"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={regiondesc}
              placeHolderText={"Select Region"}
              searchBarPlaceHolder={"Select Region"}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleRegionChange(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleRegionChange(itemValue);
          }}
          label="Select Region"
          placeholder="Select Region"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickerregions}
          defaultIndex={0}
          resetValue={false}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            placeholder: "Select Region",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickerprovince}
              pickerTitle={"Province"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={provincelabel}
              placeHolderText={"Select Province"}
              searchBarPlaceHolder={"Select Province"}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleProvinceChange(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleProvinceChange(itemValue);
          }}
          label="Select Province"
          placeholder="Select Province"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickerprovince}
          defaultIndex={0}
          resetValue={false}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            placeholder: "Select Province",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickercity}
              pickerTitle={"City"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={citylabel}
              placeHolderText={"Select City"}
              searchBarPlaceHolder={"Select City"}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleCityChange(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleCityChange(itemValue);
          }}
          label="Select City"
          placeholder="Select City"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickercity}
          defaultIndex={0}
          resetValue={false}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            placeholder: "Select City",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <RNPickerDialog
              data={getpickerbarangay}
              pickerTitle={"Barangay"}
              // labelText={'testss'}
              showSearchBar={true}
              showPickerTitle={true}
              listTextStyle={Styles.listTextStyle}
              pickerStyle={Styles.pickerStyle}
              selectedText={barangaylabel}
              placeHolderText={"Select Barangay"}
              searchBarPlaceHolder={"Select Barangay"}
              searchBarPlaceHolderColor={"#9d9d9d"}
              selectedTextStyle={Styles.selectedTextStyle}
              placeHolderTextColor={"gray"}
              dropDownIconStyle={Styles.dropDownIconStyle}
              searchBarStyle={Styles.searchBarStyle}
              //dropDownIcon={require('../assets/pin.png')}
              selectedValue={(index, item) => handleBarangayChange(item)}
            />
            {/* <SearchableDropdown
          onItemSelect={(itemValue) => {
            handleBarangayChange(itemValue);
          }}
          label="Select Barangay"
          placeholder="Select Barangay"
          itemTextStyle={{ color: "black" }}
          containerStyle={styles.PickerContainer}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={getpickerbarangay}
          defaultIndex={0}
          resetValue={false}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "white",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputProps={{
            placeholder: "Select Barangay",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            },
            // onTextChange: (text) => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        /> */}
          </View>
          <View style={styles.cardContainer}>
            <TextInput
              theme={{
                colors: {
                  primary: "#3eb2fa",
                  background: "white",
                  underlineColor: "transparent",
                },
              }}
              multiline={true}
              numberOfLines={5}
              maxLength={100}
              mode="flat"
              label="Street/Lot No./Blk/"
              onChangeText={(text) => setfulladdress(text)}
              value={fulladdress}
            />
          </View>
          <TouchableHighlight
            style={styles.login}
            underlayColor="rgba(62, 178, 250, 0.5)"
            onPress={() => NextStep()}
          >
            <Text style={styles.submitText}>Next</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </>
  );
};
export default UpdateAddressUI;
