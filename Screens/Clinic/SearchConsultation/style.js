import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 100,
    height: 100,
  },

  borderStyleHighLighted: {
    borderColor: 'black',
  },

  text: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: 'white',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    color: 'black',
    fontSize: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
});
export default styles;
