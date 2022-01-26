import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Components/waitinterval';
import styles from './style';
const UIPatientFiles = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const ftp_reducers = useSelector((state) => state.FTP_Reducers.filename);
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const [gestureName, setgestureName] = useState('');
  const [nameofFile, setnameofFile] = useState('');
  const [fullpathoffile, setfullpathoffile] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [resurls, setresurls] = useState('');

  const getpdffile = useCallback(
    async (value) => {
      await AsyncStorage.setItem('file_type', `${value}`);
      var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      var random = ('' + Math.random()).substring(2, 8);
      var random_number = timestamp + random;
      await setnameofFile(value);
      // await dispatch(
      //   action_set_patient_files(
      //     users_reducers?.prem_id,
      //     `${value}_${users_reducers.patno}${random_number}.pdf`,
      //     value,
      //   ),
      // );
      // await dispatch(
      //   action_get_files(
      //     `${value}`,
      //     `${value}_${users_reducers.patno}${random_number}.pdf`,
      //   ),
      // );

      await setfullpathoffile(
        `${value}_${users_reducers.patno}${random_number}`,
      );

      setSpinner(true);
      wait(1000).then(() => {
        setSpinner(false);
        Actions.listoffile();
      });
    },
    [resurls],
  );

  return (
    <SafeAreaView>
      <Spinner
        visible={spinner}
        textContent={'Syncing Files...'}
        textStyle={{color: '#FFF'}}
      />

      <ScrollView
        style={{
          backgroundColor: '#f5f5f5',
          height: Dimensions.get('screen').height,
        }}>
        <TouchableHighlight
          onPress={() => getpdffile('SOA')}
          underlayColor="white">
          <Card containerStyle={styles.userplate}>
            <Text>Statement of Account</Text>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => getpdffile('DTR')}
          underlayColor="white">
          <Card containerStyle={styles.userplate}>
            <Text>Diagnostic Test Result</Text>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => getpdffile('CA')}
          underlayColor="white">
          <Card containerStyle={styles.userplate}>
            <Text>Clinical Abstract</Text>
          </Card>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};

UIPatientFiles.propTypes = {};

export default UIPatientFiles;
