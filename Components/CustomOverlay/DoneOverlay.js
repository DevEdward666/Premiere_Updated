import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {Card} from 'react-native-paper';

const DoneOverlay = ({visible, message, UI}) => {
  const [visibles, setVisibles] = useState(false);
  const toggleOverlay = () => {
    setVisibles(!visible);
  };
  useEffect(() => {
    let mounted = true;
    const gomount = () => {
      if(visible!==undefined){

        setVisibles(visible);
      }
    };
    mounted && gomount();
    return () => {
      mounted = false;
    };
  }, [visible]);
  return (
    <SafeAreaView>
      <Overlay
        isVisible={visibles}
        onBackdropPress={toggleOverlay}
        
        overlayStyle={{borderRadius: 15}}>
        <SafeAreaView style={{width: '90%', height: '40%'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '100%', height: 400, padding: 30}}>
              <Image
                style={{width: '100%', height: 100}}
                source={require('../../assets/icons/test.gif')}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: 20,
                }}>
                {message}
              </Text>
              {UI}
            </View>
          </View>
        </SafeAreaView>
      </Overlay>
    </SafeAreaView>
  );
};
export default DoneOverlay;
