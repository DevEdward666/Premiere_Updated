import React, {useCallback, useState, useEffect} from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {TextInputMask} from 'react-native-masked-text';
import styles from './style';
import {
  action_GET_usernameExist,
  action_set_lastinfo,
  action_SignUp_user,
} from '../../Services/Actions/SignUp_Actions';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
export default function LastInfo() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [errorUsernameMessage, setErrorMessageUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [passworderrormessage, setpassworderrormessage] = useState('');
  const SignUp_Reducers = useSelector((state) => state.SignUp_Reducers);

  const [showpass, setshowpass] = useState(true);
  const [iconpass, seticonpass] = useState(false);
  const [showconfirmpass, setshowconfirmpass] = useState(true);
  const [iconconfirmpass, seticonconfirmpass] = useState(false);
  const handleUsernameExist = useCallback(
    async (usernames) => {
      setUsername(usernames);
      dispatch(action_GET_usernameExist(usernames));
    },
    [dispatch],
  );

  const handlePassword = (password) => {
    setPassword(password);
    if (password != confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage('Password Mismatch');
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        setpassworderrormessage(
          'Must be 8 characters long 1 UPPERCASE 1 Numeric',
        );
      } else {
        setErrorMessage(false);
      }
    }
  };
  const showpassword = useCallback(() => {
    if (showpass == true) {
      setshowpass(false);
      seticonpass(true);
    } else {
      setshowpass(true);
      seticonpass(false);
    }
  }, [showpass, iconpass]);
  const showconfirmpassword = useCallback(() => {
    if (showconfirmpass == true) {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    } else {
      setshowconfirmpass(true);
      seticonconfirmpass(false);
    }
  }, [showconfirmpass, iconconfirmpass]);
  const handleConfirmPassword = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
    if (password != confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage('Password Mismatch');
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        setpassworderrormessage(
          'Must be 8 characters long 1 UPPERCASE 1 Numeric',
        );
      } else {
        setErrorMessage(false);
      }
    }
  };
  useEffect(() => {
    let mounted = true;
    const geterrors = () => {
      if (SignUp_Reducers?.username?.username == username) {
        setErrorMessageUsername(true);
      } else {
        setErrorMessageUsername(false);
      }
    };
    mounted && geterrors();
    return () => {
      mounted = false;
    };
  }, [username, SignUp_Reducers]);
  const Submit = useCallback(() => {
    if (username === '') {
      setErrorMessageUsername(true);
    } else if (password === '') {
      setErrorMessage(true);
      setpassworderrormessage(
        'Must be 8 characters long 1 UPPERCASE 1 Numeric',
      );
    } else if (password !== confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage('Password Mismatch');
    } else {
      if(!errorUsernameMessage || errorMessage){
        dispatch(action_set_lastinfo(username, password, true));
        Actions.tac();
      }
    
    }
  }, [dispatch, username, password]);
  return (
    <View style={styles.Inputcontainer}>
      <View style={styles.cardContainer}>
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
          label="Username"
          error={errorUsernameMessage}
          onChangeText={(text) => handleUsernameExist(text)}
          value={username}
        />
        <HelperText type="error" visible={errorUsernameMessage}>
          Username already exist
        </HelperText>
      </View>
      <View style={styles.cardContainer}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View
            style={{
              width: '100%',
            }}>
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
              label="Password"
              secureTextEntry={showpass}
              error={errorMessage}
              onChangeText={(text) => handlePassword(text)}
              value={password}
              right={<TextInput.Icon name="eye" onPress={showpassword} />}
            />
            <HelperText type="error" visible={errorMessage}>
              {passworderrormessage}
            </HelperText>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View
            style={{
              width: '100%',
            }}>
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
              label="Confirm Password"
              secureTextEntry={showpass}
              error={errorMessage}
              secureTextEntry={showconfirmpass}
              onChangeText={(text) => handleConfirmPassword(text)}
              value={confirmpassword}
              right={
                <TextInput.Icon name="eye" onPress={showconfirmpassword} />
              }
            />

            <HelperText type="error" visible={errorMessage}>
              {passworderrormessage}
            </HelperText>
          </View>
        </View>
      </View>
      <TouchableHighlight
        style={styles.login}
        underlayColor="rgba(62, 178, 250, 0.5)"
        onPress={() => Submit()}>
        <Text style={styles.submitText}>Done</Text>
      </TouchableHighlight>
    </View>
  );
}
