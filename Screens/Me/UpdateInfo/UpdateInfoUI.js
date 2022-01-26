import React, {useCallback} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './style';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {action_imagepickeroptions} from '../../../Services/Actions/Default_Actions';
import {useDispatch, useSelector} from 'react-redux';
export default function UpdateInfoUI() {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  const HandleUpdateInfo = useCallback(() => {
    // dispatch(action_imagepickeroptions(''));

    if (
      users_reducers?.passbase_id !== null &&
      users_reducers?.passbase_status !== null
    ) {
      Actions.update_address();
    } else {
      Actions.update_image();
    }
  }, [users_reducers?.passbase_id,users_reducers?.passbase_status]);
  return (
    <SafeAreaView style={styles.MainContainer}>
      <Text style={styles.TextHeader}>
        You'll need to update your info to access the full capability of this
        applicaiton
      </Text>
      <Text style={styles.TextSubtitle}>
        You can link your medical records,create a request for consultation as
        well as laboratory and your personal QR for easy access about your basic
        information to hospital and more.
      </Text>
      <Button
        style={styles.updateButton}
        mode="contained"
        onPress={() => HandleUpdateInfo()}>
        Update Info
      </Button>
      <Button
        style={styles.cancelButton}
        color="#0084FF"
        mode="text"
        onPress={() => console.log('Pressed')}>
        Maybe Later
      </Button>
    </SafeAreaView>
  );
}
