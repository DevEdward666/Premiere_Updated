import {Dimensions, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  backgroundVideo: {
    flex: 1,
  },
});
export default styles;
