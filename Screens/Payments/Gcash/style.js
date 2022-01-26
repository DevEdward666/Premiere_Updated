import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: 'white',
  },
  cardContainer: {
    margin: 10,
    borderRadius: 10,
  },
  Inputcontainer: {
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  mainContainer: {
  
    marginTop: 10,
    width: '100%',
  },
  btncancel: {
    backgroundColor: '#32cd32',
    borderRadius: 25,
    width: '90%',
    alignSelf: 'center',
    marginLeft: 20,
    height: 50,
  },
  btnpay: {
    backgroundColor: '#0084FF',
    borderRadius: 25,
    width: '90%',
    marginRight: 20,
    alignSelf: 'center',
    height: 50,
  },
});

export default styles;
