import React from 'react';
import {View, TouchableHighlight, Text, Image} from 'react-native';
import {Card} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import styles from './style';
const gotorequest = () => {
  Actions.mainclicnic();
};

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column'}}>
        <TouchableHighlight onPress={() => gotorequest()} underlayColor="white">
          <Card containerStyle={styles.plate}>
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '10%',
                  height: 50,
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: 50,
                    width: '100%',
                    resizeMode: 'center',
                    alignContent: 'flex-start',
                  }}
                  source={require('../../assets/icons/diagnostic.png')}
                />
              </View>
              <View
                style={{
                  width: '80%',
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    marginStart: 10,
                    fontSize: 14,
                    alignContent: 'center',
                  }}>
                  Request
                </Text>
              </View>
            </View>
          </Card>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default Index;
