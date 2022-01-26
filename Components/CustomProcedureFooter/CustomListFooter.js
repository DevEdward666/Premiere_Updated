import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import styles from '../../Screens/Diagnostic/styles';
const CustomListFooter = ({customsubtotal}) => {
  return (
    <View style={{marginBottom: 50}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            padding: 10,
          },
        ]}>
        <View style={{flex: 5}}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <View style={{flex: 5}}>
              <Text style={{fontSize: 16, fontFamily: 'SFUIDisplay-Light'}}>
                Total
              </Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={{fontSize: 16, fontFamily: 'SFUIDisplay-Light'}}>
                Php: {customsubtotal}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CustomListFooter;
