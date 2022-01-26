import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  announcement_image: {
    width: width,
    height: 250,
    resizeMode: 'contain',
    borderColor: 'white',
    alignSelf: 'center',
  },
  baseText: {
    textAlign: 'justify',
    padding: 15,
  },
  textTitle: {
    fontSize: 24,
    padding: 15,
    textAlign: 'justify',
    fontFamily: 'SFUIDisplay-Bold',
  },
  topicimage: {
    flex: 1,
    margin: 30,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    fontFamily: 'SFUIDisplay-Regular',
  },
});
export default styles;
