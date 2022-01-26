import React from 'react';
import {View, Text, ActivityIndicator, Dimensions} from 'react-native';
import {Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import styles from '../style';

const ServiceinfoCard = ({img, title, description}) => {
  const maxHeight = Dimensions.get('screen').height; // or something else
  const maxWidth = Dimensions.get('window').width;
  return (
    <Card style={{flex: 1, borderRadius: 15}}>
      <Card.Content>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, padding: 10, marginTop: 10}}>
            <FastImage style={{flex: 1}} source={{uri: img}} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.infotitle}>{title}</Text>
            <Text style={styles.infodescription}>{description}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
export default ServiceinfoCard;
