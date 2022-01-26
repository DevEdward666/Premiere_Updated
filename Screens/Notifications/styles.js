import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: width,
  },
  cardresultlist: {
    width: width - 20,
    padding: 10,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  author: {
    marginStart: 15,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'SFUIDisplay-Light',
    textAlign: 'right',
  },
  title: {
    marginStart: 15,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'SFUIDisplay-Light',
  },
  body: {
    marginStart: 15,
    fontSize: 15,
    fontFamily: 'SFUIDisplay-Regular',
    maxHeight: height,
  },
});
export default styles;
