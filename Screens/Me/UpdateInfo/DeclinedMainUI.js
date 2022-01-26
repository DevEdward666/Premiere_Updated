import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './style';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {action_imagepickeroptions} from '../../../Services/Actions/Default_Actions';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {action_passbase_get_single_info} from '../../../Services/Actions/PassbaseActions';
export default function DeclinedMainUI() {
     const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data,
  ); 
  const [spinner, setSpinner] = useState(false);
    const handleback = useCallback(() => {
    Actions.home();
  }, []);
  const Resubmit = useCallback(() => {
    Actions.update_image();
  }, []);
    return (
  <SafeAreaView style={styles.MainContainer}>
      {/* <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      /> */}
      <Text style={styles.TextHeader}>
        Sorry to inform you that the validation is declined. Please try again.
      </Text>
      <Text style={styles.TextSubtitle}>
        Status : <Text style={styles.TextStatus}>{passbase_data?.status}</Text>
      </Text>
      <Text style={styles.TextSubtitle}>
        Please make sure that your document matches to the type of document type
        you selected. and make sure that it's not dark when you're taking the
        validation. Thank You!
      </Text>
      <Button
        style={styles.updateButton}
        mode="contained"
        onPress={() => Resubmit()}>
        Resubmit
      </Button>
      <Button
        style={styles.cancelButton}
        mode="contained"
        color="#0084FF"
        mode="text"
        onPress={() => handleback()}>
        Back
      </Button>
    </SafeAreaView>
    )
}
