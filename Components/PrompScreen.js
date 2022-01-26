import React, {useEffect} from 'react';
import {Button} from 'react-native';
import {Animated, Easing, StyleSheet, View, Text, Image} from 'react-native';
const PrompScreen = () => {
  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];
  useEffect(() => {
    animate(Easing.elastic(4));
  }, []);
  return (
    <View style={styles.boxContainer}>
      <Animated.View style={animatedStyles}>
        <Image
          source={require('../assets/icons/ic_care_prem-playstore.png')}
          resizeMode="center"
          style={styles.image}
        />
      </Animated.View>
      <Animated.View>
        <Text style={styles.title}>
          Your laboratory requisition has been sent successfully. Please wait
          for email and sms notification once your request is approved.
        </Text>
        <Button
          style={{padding: 50, justifyContent: 'center', borderRadius: 150}}
          title="OK"
        />
      </Animated.View>
    </View>
  );
};

PrompScreen.propTypes = {};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    padding: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    // backgroundColor: '#61dafb',
    backgroundColor: '#ffffff',
  },
});
export default PrompScreen;
