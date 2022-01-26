import React from 'react';
import {View} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import styles from './style';
const PayMayaBody = ({
  name,
  mobile,
  email,
  line1,
  line2,
  state,
  postal,
  city,
  country,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Fullname"
          value={name}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Phone No."
          value={mobile}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Email Address"
          value={email}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
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
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Line2"
          value={line2}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="State"
          value={state}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Postal Code"
          value={postal}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="City"
          value={city}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
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

export default PayMayaBody;
