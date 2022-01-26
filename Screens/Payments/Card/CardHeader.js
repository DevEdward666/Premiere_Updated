import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
// import CardType from "../../../Hooks/CardType/CardType";
import { set_card_header } from "../../../Services/Actions/PaymentsActions";
import { useDispatch } from "react-redux";
const CardHeader = () => {
  const dispatch = useDispatch();
  const [cardNumber, setcardNumber] = useState();
  const [showMode, setshowMode] = useState(false);
  const [mode, setMode] = useState(false);
  const [cardmonth, setcardmonth] = useState("");
  const [cardyear, setcardyear] = useState("");
  const [cardcvc, setcvc] = useState("");
  const [date, setDate] = useState(new Date());
  const [cardmonthyear, setcardmonthyear] = useState("");
  useEffect(() => {
    let mounted = true;
    const getdetails = () => {
      if (mounted) {
        dispatch(set_card_header(cardNumber, cardmonth, cardyear, cardcvc));
      }
    };
    mounted && getdetails();
    return () => {
      mounted = false;
    };
  }, [dispatch, cardNumber, cardmonth, cardyear, cardcvc]);
  const _handlingCardNumber = (number) => {
    // if (number.charAt(0) === '5') {
    //   setcardtype('MasterCard');
    // } else if (number.charAt(0) === '4') {
    //   setcardtype('Visa');
    // }

    setcardNumber(
      number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );
  };
  const _handlingCVCNumber = (number) => {
    // if (number.charAt(0) === '5') {
    //   setcardtype('MasterCard');
    // } else if (number.charAt(0) === '4') {
    //   setcardtype('Visa');
    // }

    setcvc(
      number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );
  };
  const ChooseMonthYear = (currentMode) => {
    setshowMode(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    ChooseMonthYear("date");
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setshowMode(Platform.OS === "ios");
    setDate(currentDate);
    var today = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setcardmonth(month);
    setcardyear(year);
    if (month <= 9)
      setcardmonthyear("0" + month + "/" + year.toString().substr(-2));
  };
  console.log(cardmonthyear);
  return (
    <>
      <Card
        containerStyle={{
          borderRadius: 25,
          height: 250,
          backgroundColor: "#034c81",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3 }}></View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Image
              style={{
                height: 100,
                width: "100%",
                resizeMode: "center",
                alignContent: "flex-start",
              }}
              source={require("../../../assets/icons/mastercard.png")}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3 }}>
            <Text style={{ color: "white" }}>Account Number</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white" }}>Expiry date</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 4 }}>
            <TextInput
              require={true}
              style={{ color: "white" }}
              placeholderTextColor="white"
              onChangeText={(text) => _handlingCardNumber(text)}
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => showDatepicker()}>
              <TextInput
                require={true}
                style={{ color: "white" }}
                editable={false}
                placeholderTextColor="white"
                placeholder="MM/YY"
                value={cardmonthyear}
              />
            </TouchableOpacity>
            {showMode && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3 }}>
            <Text style={{ color: "white" }}>CVC</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <View style={{ flex: 4 }}>
            <TextInput
              require={true}
              style={{ color: "white" }}
              placeholderTextColor="white"
              onChangeText={(text) => _handlingCVCNumber(text)}
              placeholder="000"
              value={cardcvc}
            />
          </View>
        </View>
      </Card>
    </>
  );
};
export default CardHeader;
