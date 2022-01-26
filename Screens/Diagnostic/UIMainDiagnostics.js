import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-elements';
// import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './maindiagnostics';
const UIMainDiagnostics = () => {
  const gotodiagnostics = () => {
    Actions.diagnostics();
  };

  return (
    <ScrollView style={{backgroundScrollViewColor: 'white'}}>
      <View style={styles.container}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <TouchableHighlight
              onPress={() => gotodiagnostics()}
              underlayColor="white">
              <Card containerStyle={styles.plate}>
                <View style={styles.mainView}>
                  <View style={styles.secondView}>
                    <Text style={styles.txtTitle}>Create Request</Text>
                  </View>
                  <View style={styles.imageView}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../assets/icons/diagnostic.png')}
                    />
                  </View>
                </View>
              </Card>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UIMainDiagnostics;
