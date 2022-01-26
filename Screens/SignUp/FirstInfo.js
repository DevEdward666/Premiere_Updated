import React, {useCallback, useState} from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import styles from './style';
import {TextInput, HelperText} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {action_set_firstinfo} from '../../Services/Actions/SignUp_Actions';
import {Actions} from 'react-native-router-flux';
export default function FirstInfo() {
  const dispatch = useDispatch();
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [firstnameErrorMessage, setfirstnameErrorMessage] = useState(false);
  const [lastnameErrorMessage, setlastnameErrorMessage] = useState(false);
  const NextStep = useCallback(() => {
    if (firstname === '') {
      setfirstnameErrorMessage(true);
    } else if (lastname === '') {
      setlastnameErrorMessage(true);
    } else {
      dispatch(action_set_firstinfo(firstname, middlename, lastname, true));
      Actions.signup_birthdate();
    }
  }, [dispatch, firstname, lastname]);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.Inputcontainer}>
          <View style={styles.cardContainer}>
            <Text
              style={{
                width: '100%',
                color: 'black',
                textAlign: 'center',
                fontSize: 16,
                marginBottom: 30,

                fontFamily: 'SFUIDisplay-Bold',
              }}>
              Whats your name?
            </Text>
            <TextInput
              style={styles.text}
              dense
              theme={{
                colors: {
                  primary: '#3eb2fa',
                  background: 'white',
                  underlineColor: 'transparent',
                },
              }}
              mode="flat"
              label="First name"
              onChangeText={(text) => setfirstname(text)}
              value={firstname}
            />
            <HelperText type="error" visible={firstnameErrorMessage}>
              Please Fill First name
            </HelperText>
          </View>
          <View style={styles.cardContainer}>
            <TextInput
              style={styles.text}
              dense
              theme={{
                colors: {
                  primary: '#3eb2fa',
                  background: 'white',
                  underlineColor: 'transparent',
                },
              }}
              mode="flat"
              label="Middle name"
              onChangeText={(text) => setmiddlename(text)}
              value={middlename}
            />
            <HelperText type="error" visible={false}>
              Please Fill Middle name
            </HelperText>
          </View>
          <View style={styles.cardContainer}>
            <TextInput
              style={styles.text}
              dense
              theme={{
                colors: {
                  primary: '#3eb2fa',
                  background: 'white',
                  underlineColor: 'transparent',
                },
              }}
              mode="flat"
              label="Last name"
              onChangeText={(text) => setlastname(text)}
              value={lastname}
            />
            <HelperText type="error" visible={lastnameErrorMessage}>
              Please Fill Last name
            </HelperText>
          </View>
          <TouchableHighlight
            style={styles.login}
            underlayColor="rgba(62, 178, 250, 0.5)"
            onPress={() => NextStep()}>
            <Text style={styles.submitText}>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
