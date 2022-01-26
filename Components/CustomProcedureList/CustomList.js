import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../Screens/Diagnostic/styles';
export default function CustomList({price, desc}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingStart:20,
        paddingEnd:20,
      }}>
      <View style={{flex: 5}}>
        <Text style={styles.flatlistitem}>{desc} :</Text>
      </View>
      <View style={{flex: 5}}>
        <Text style={styles.flatlistitemsecond}>Php {price}</Text>
      </View>
    </View>
  );
}
