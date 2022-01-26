import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  maincontainer: {
    flex: 1,
    marginTop: 50,
  },
  viewstyle: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  userplate: {
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 10,
    height: 90,
  },
  textstyle: {
    textAlign: 'left',
    marginStart: 10,
    fontSize: 14,
    alignContent: 'center',
  },
  iconstyle: {
    height: 30,
    width: '100%',
    resizeMode: 'center',
    alignContent: 'flex-start',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  PickerContainer: {
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: '50%',
  },
  ViewPickerContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  flatlistitem: {
    flex: 1,
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    borderRadius: 25,
  },
  plate: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0.1,
    elevation: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  platetext: {
    width: 150,
    height: 50,
  },
  flatlistitemappointmentno: {
    flex: 1,
    marginStart: 30,
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Regular',
  },
  textfinishedat: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
  cardresultlist: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 30,
  },
});

export default styles;
