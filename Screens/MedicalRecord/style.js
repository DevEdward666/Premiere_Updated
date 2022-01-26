import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
const screenheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  surface: {
    height: 10,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  viewheader: {
    flex: 1,
  },
  iconstyle: {
    height: 50,
    width: '100%',
    resizeMode: 'center',
    alignContent: 'flex-start',
  },
  viewstyle: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  headerinfotext: {
    flex: 1,
    fontSize: 16,
    paddingStart: 10,
    fontFamily: 'SFUIDisplay-Bold',
    backgroundColor: 'white',
  },
  infotext: {
    flex: 1,
    paddingStart: 10,
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Bold',
    backgroundColor: 'white',
  },
  userplate: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 15,
  },
  text: {
    color: 'black',
    fontSize: 12,
    padding: 10,
    textAlign: 'left',
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: 'white',
  },
  patinfotext: {
    color: 'black',
    fontSize: 14,
    padding: 10,
    textAlign: 'left',
    fontFamily: 'SFUIDisplay-Bold',
    backgroundColor: 'white',
  },
  patinfoheadertext: {
    color: 'black',
    fontSize: 14,
    padding: 10,
    textAlign: 'left',
    fontFamily: 'SFUIDisplay-Bold',
    backgroundColor: 'white',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
    paddingTop: 10,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
  containerNOTIFICATION: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    maxHeight: 1000,
    alignItems: 'center',
  },
  containercomment: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
});
export default styles;
