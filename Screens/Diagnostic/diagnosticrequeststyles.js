import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  plate: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 15,
    elevation: 15,

    height: Dimensions.height,
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    height: 30,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    height: 30,
  },
});

export default styles;
