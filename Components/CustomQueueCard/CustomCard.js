import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import styles from './cardstyle';
const CustomCard = ({counterno, countername}) => {
  return (
    <Card containerStyle={{borderRadius: 15, elevation: 50}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 5}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'SFUIDisplay-SemiBold',
              fontWeight: '900',
              textTransform: 'uppercase',
            }}>
            {countername}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'SFUIDisplay-SemiBold',
              fontWeight: '900',
              textTransform: 'uppercase',
            }}>
            {counterno}
          </Text>
        </View>
      </View>
    </Card>
  );
};
export default CustomCard;
