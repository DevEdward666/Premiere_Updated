import React from 'react';
import {ImageBackground, Text, Dimensions} from 'react-native';
import styles from './style';
const ServicesCard = ({img, title, description}) => {
  const maxHeight = Dimensions.get('window').height; // or something else
  const maxWidth = Dimensions.get('window').width;
  return (
    <ImageBackground
      style={{
        width: maxWidth,
        height: 300,
      }}
      resizeMode="contain"
      progressiveRenderingEnabled={true}
      source={{uri: img, scale: 5, width: maxWidth}}>
      <Text style={styles.carddesc}>
        <Text numberOfLines={3} style={styles.cardtitle}>
          {title}
        </Text>
        {'\n'}
        {description}
      </Text>
    </ImageBackground>
  );
};
export default ServicesCard;
