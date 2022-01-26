import {StyleSheet, Dimensions} from 'react-native';
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },
  plate: {
    backgroundColor: 'white',
    borderColor: 'rgba(255,255,355,0.4)',
    elevation: 30,
    borderWidth: 0.1,
    borderRadius: 10,
  },
  mainView: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  secondView: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  txtTitle: {
    textAlign: 'left',
    marginStart: 10,
    fontSize: 14,
    alignContent: 'center',
  },
  imageView: {
    width: '10%',
    height: 50,
    justifyContent: 'center',
  },
  imageStyle: {
    height: 50,
    width: '100%',
    resizeMode: 'center',
    alignContent: 'flex-start',
  },
});

export default styles;
