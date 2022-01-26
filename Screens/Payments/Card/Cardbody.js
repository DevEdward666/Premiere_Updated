import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { useDispatch ,useSelector} from "react-redux";
import { set_card_body } from "../../../Services/Actions/PaymentsActions";
import styles from "./style";
const CardBody = () => {
  const consult_info = useSelector(
    (state) => state.Clinic_Reducers.consult_info
  );
  const dispatch = useDispatch();
  const [name, setname] = useState(`${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `);
  const [mobile, setmobile] = useState(consult_info?.data[0]?.mob_no);
  const [email, setemail] = useState(consult_info?.data[0]?.email);
  const [line1, setline1] = useState(consult_info?.data[0]?.line1);
  const [line2, setline2] = useState(consult_info?.data[0]?.line2);
  const [state, setstate] = useState(consult_info?.data[0]?.regiondesc);
  const [postal, setpostal] = useState(consult_info?.data[0]?.zipcode);
  const [city, setcity] = useState(consult_info?.data[0]?.citymundesc);
  const [country, setcountry] = useState("PH");
  useEffect(() => {
    let mounted = true;
    const getdetails = () => {
      if (mounted) {
        dispatch(
          set_card_body(
            name,
            mobile,
            email,
            line1,
            line2,
            state,
            postal,
            city,
            country
          )
        );
      }
    };
    mounted && getdetails();
    return () => {
      mounted = false;
    };
  }, [name, mobile, email, line1, line2, state, postal, city, country]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          require={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Fullname"
          onChangeText={(e) => setname(e)}
          value={name}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          require={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Phone No."
          onChangeText={(e) => setmobile(e)}
          value={mobile}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          require={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          label="Email Address"
          onChangeText={(e) => setemail(e)}
          value={email}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          require={true}
          theme={{
            colors: {
              primary: "#3eb2fa",
              backgroundColor: "rgba(255,255,355,0.1)",
              underlineColor: "rgba(255,255,355,0.1)",
            },
          }}
          mode="flat"
          onChangeText={(e) => setline1(e)}
          label="Line1"
          value={line1}
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
          onChangeText={(e) => setline2(e)}
          value={line2}
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
          onChangeText={(e) => setstate(e)}
          value={state}
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
          onChangeText={(e) => setpostal(e)}
          value={postal}
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
          require={true}
          onChangeText={(e) => setcity(e)}
          value={city}
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
          value={country}
        />
      </View>
    </View>
  );
};

export default CardBody;
