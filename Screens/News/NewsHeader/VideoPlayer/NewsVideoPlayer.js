import React from 'react';
import {AppRegistry, StyleSheet, View, Dimensions} from 'react-native';
// import Video from 'react-native-video';
import styles from './style';
import {useSelector} from 'react-redux';
import {Video,AVPlaybackStatus } from "expo-av"

const NewsVideoPlayer = ({url}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  console.log(url)
  
  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        useNativeControls
        rate={1.0}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
};
export default NewsVideoPlayer;
