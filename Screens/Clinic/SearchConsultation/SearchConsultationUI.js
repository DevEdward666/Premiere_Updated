import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  Text,
  View,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from '../style';
import {
  action_Link_Consultation,
  action_link_details,
  action_reset_link,
} from '../../../Services/Actions/Clinic_actions';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import DoneOverlay from '../../../Components/CustomOverlay/DoneOverlay';
import {Actions} from 'react-native-router-flux';
const SearchConsultationUI = () => {
  const [fullname, setfullname] = useState('');
  const [consultationid, setconsultationid] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [overlayvisible, setoverlayvisible] = useState(false);
  const [email, setemail] = useState('');
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const link_consult_message = useSelector(
    (state) => state.Clinic_Reducers.link_consult_message,
  );
  const dispatch = useDispatch();
  const validate = (email) => {
    let mounted = true;
    if (mounted) {
      setemail(email);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setemailErrorMessage(true);
      } else {
        setemailErrorMessage(false);
        setemail(email);
      }
    }
    return () => {
      mounted = false;
    };
  };
  const hadleSubmitLinkRequest = useCallback(() => {
    dispatch(
      action_Link_Consultation(
        users_reducers?.username,
        fullname,
        email,
        consultationid,
      ),
    );
    dispatch(
      action_link_details(
        fullname,
        email,
        users_reducers?.username,
        consultationid,
      ),
    );
  }, [dispatch, users_reducers?.username, fullname, email, consultationid]);
  useEffect(() => {
    let mounted = true;
    const done = () => {
      if (mounted) {
        if (link_consult_message?.success) {
          setoverlayvisible(true);
        }
      }
    };
    mounted && done();
    return () => {
      mounted = false;
    };
  }, [link_consult_message]);
  const handleDone = useCallback(() => {
    dispatch(action_reset_link());
    setoverlayvisible(false);
    Actions.otpconsult();
  }, [dispatch]);
  return (
    <View style={{flex: 1}}>
      <DoneOverlay
        visible={overlayvisible}
        message={link_consult_message?.message}
        UI={
          <Button
            onPress={() => handleDone()}
            buttonStyle={{
              backgroundColor: '#034c81',
              borderRadius: 10,
              width: '70%',
              marginBottom: 80,
              alignSelf: 'center',
              height: 50,
            }}
            title="Done"
          />
        }
      />

      <View style={styles.SearchInputcontainer}>
        <View style={styles.ImageContainer}>
          <Image
            style={styles.ImageSize}
            resizeMode="contain"
            source={require('../../../assets/icons/Find.png')}
          />
        </View>
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
            label="Fullname"
            onChangeText={(text) => setfullname(text)}
            value={fullname}
          />
        </View>
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
            label="Consultation ID"
            onChangeText={(text) => setconsultationid(text)}
            value={consultationid}
          />
        </View>
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
            error={emailErrorMessage}
            onChangeText={(text) => validate(text)}
            label="Email"
            value={email}
          />
        </View>

        <TouchableHighlight
          style={styles.login}
          underlayColor="rgba(62, 178, 250, 0.5)"
          onPress={() => hadleSubmitLinkRequest()}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default SearchConsultationUI;
