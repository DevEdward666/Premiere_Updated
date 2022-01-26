import React, {useState, useRef, useCallback, useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {action_set_thirdinfo} from '../../Services/Actions/SignUp_Actions';
import {Actions} from 'react-native-router-flux';
export default function ThirdInfo() {
  const [email, setemail] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [mobileErrorMessage, setmobileErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const [mobile, setmobile] = useState('+63');
  const unmaskedmobile = useRef(null);
  const validate = (email) => {
    setemail(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setemailErrorMessage(true);
    } else {
      setemailErrorMessage(false);
      setemail(email);
    }
  };
  const Next = useCallback(() => {
    if (email === '') {
      setemailErrorMessage(true);
    } else if (mobile === '') {
      setmobileErrorMessage(true);
    } else {
      dispatch(action_set_thirdinfo(email, mobile, true));
      Actions.signup_credentials();
    }
  }, [dispatch, mobile, email]);
  return (
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
          Whats your email and mobile number?
        </Text>
        <TextInput
          style={styles.text}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
          label="Email"
          error={emailErrorMessage}
          onChangeText={(text) => validate(text)}
          value={email}
        />
        <HelperText type="error" visible={emailErrorMessage}>
          Email not valid
        </HelperText>
      </View>
      <View style={styles.cardContainer}>
        <TextInput
          style={styles.text}
          render={(props) => (
            <TextInputMask
              {...props}
              type={'cel-phone'}
              options={{
                maskType: 'INTERNATIONAL',
                dddMask: '(+63) ',
              }}
              
              value={mobile}
              onChangeText={(text) => setmobile(text)}
              ref={unmaskedmobile}
            />
          )}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
        <HelperText type="error" visible={mobileErrorMessage}>
          Please fill mobile
        </HelperText>
      </View>
      <TouchableHighlight
        style={styles.login}
        underlayColor="rgba(62, 178, 250, 0.5)"
        onPress={() => Next()}>
        <Text style={styles.submitText}>Next</Text>
      </TouchableHighlight>
    </View>
  );
}
