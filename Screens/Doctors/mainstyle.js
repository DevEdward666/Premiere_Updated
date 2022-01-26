import {StyleSheet,Platform,Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pickcontainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
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
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    spinnerTextStyle: {
      color: '#FFF',

      fontFamily: 'SFUIDisplay-Regular',
    },
    PickerContainer: {
      backgroundColor: 'white',

      borderRadius: 15,
      margin: 10,
    },
    textInput: {
      backgroundColor: '#ffffff',
      flex: 1,
      borderRadius: 15,
      margin: 10,
      overflow: 'hidden',
      padding: 10,
      width: '80%',
    },
    inputContainer: {
      borderBottomWidth: 0,
      overflow: 'hidden',
      elevation: 25,
    },
    inputText: {
      color: 'black',
      fontWeight: 'normal',
      fontFamily: 'SFUIDisplay-Regular',
      marginLeft: 5,
    },
  });


  export default styles;