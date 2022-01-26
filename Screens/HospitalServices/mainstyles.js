import {StyleSheet, Dimensions,Platform} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const mainstyles = StyleSheet.create({
loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  Maincontainer: {
    flex: 1,
    marginTop: 50,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default mainstyles;