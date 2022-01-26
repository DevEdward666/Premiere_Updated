import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './style';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {action_imagepickeroptions} from '../../../Services/Actions/Default_Actions';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {action_passbase_get_single_info} from '../../../Services/Actions/PassbaseActions';
const WaitForStatusUpdate = () => {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data,
  );
  useEffect(() => {
    let mounted = true;
    const getstatus = () => {
      if (mounted) {
        setSpinner(true);
        dispatch(action_passbase_get_single_info(users_reducers?.passbase_id));
      }
    };
    mounted && getstatus();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const loadstatus = () => {
      if (mounted) {
        if (passbase_data !== null) {
          setSpinner(false);
        }
      }
    };
    mounted && loadstatus();
    return () => {
      mounted = false;
    };
  }, [passbase_data]);
  const handleback = useCallback(() => {
    // dispatch(action_imagepickeroptions(''));

    Actions.home();
  }, []);
  return (
    <SafeAreaView style={styles.MainContainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.TextHeader}>
        Information updated successfully. Our team still validating your
        identity, Thank you for your patience.
      </Text>
      <Text style={styles.TextSubtitle}>Status : {passbase_data?.status}</Text>
      <Text style={styles.TextSubtitle}>
        Please allow an hour or a day for validation of the documents you sent
        to us. Thank You.
      </Text>
      {/* <Button
        style={styles.updateButton}
        mode="contained"
        onPress={() => showinfo()}>
        See Info
      </Button> */}
      <Button
        style={styles.cancelButton}
        color="#0084FF"
        mode="text"
        onPress={() => handleback()}>
        Back
      </Button>
    </SafeAreaView>
  );
};
export default WaitForStatusUpdate;
