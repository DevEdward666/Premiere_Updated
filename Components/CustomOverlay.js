import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {Card} from 'react-native-paper';

const CustomOverlay = ({Visible, message}) => {
  const [visible, setVisible] = useState(Visible);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <SafeAreaView style={{width: 300, height: 20 + '%'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 95 + '%', height: 20}}>
              <Image
                style={{width: 95 + '%', height: 100}}
                source={require('../assets/icons/test.gif')}
              />
              <Text
                style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>
                {message}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Overlay>
    </View>
  );
};
export default CustomOverlay;
