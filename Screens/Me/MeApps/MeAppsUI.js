import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import styles from '../style';
import {Actions} from 'react-native-router-flux';
import {useSelector} from 'react-redux';
const MeAppsUI = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const gotodiagnostics = () => {
    Actions.diagnostics();
  };
  const gotoclinic = () => {
    Actions.mainclicnic();
  };
  const gotoqueue = async () => {
    //  await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.indexqueue();
  };
  const gotoqr = async () => {
    let mounted = true;
    if (mounted) {
      await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
      Actions.qrscreen();
    }
    return () => {
      mounted = false;
    };
  };
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, borderRadius: 15, margin: 30}}>
          <Text style={styles.appstextstyleheader}>Apps</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          style={{flex: 1}}
          onPress={() => gotoclinic()}
          underlayColor="#f7f7f7">
          <Card containerStyle={styles.appcardplate}>
            <Image
              style={styles.appiconstyle}
              source={require('../../../assets/icons/clinicrequest.png')}
            />
            <Text style={styles.appstextstyle}>Consultation Request</Text>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          style={{flex: 1}}
          onPress={() => gotodiagnostics()}
          underlayColor="#f7f7f7">
          <Card containerStyle={styles.appcardplate}>
            <Image
              style={styles.appiconstyle}
              source={require('../../../assets/icons/diagnosticrequest.png')}
            />
            <Text style={styles.appstextstyle}>Diagnostic Request</Text>
          </Card>
        </TouchableHighlight>
      </View>

      <View style={{flexDirection: 'row'}}>
        {/* <TouchableHighlight
          style={{flex: 1}}
          onPress={() => gotoqr()}
          underlayColor="#f7f7f7">
          <Card containerStyle={styles.appcardplate}>
            <Image
              style={styles.appiconstyle}
              source={require('../../../assets/icons/ic_my_qr_prem-playstore.png')}
            />
            <Text style={styles.appstextstyle}>My QR</Text>
          </Card>
        </TouchableHighlight> */}
        {/* <TouchableHighlight
          style={{flex: 1}}
          onPress={() => gotoqueue()}
          underlayColor="#f7f7f7">
          <Card containerStyle={styles.appcardplate}>
            <Image
              style={styles.appiconstyle}
              source={require('../../../assets/icons/queueicon.png')}
            />
            <Text style={styles.appstextstyle}>Queue</Text>
          </Card>
        </TouchableHighlight> */}
      </View>
    </SafeAreaView>
  );
};

export default MeAppsUI;
