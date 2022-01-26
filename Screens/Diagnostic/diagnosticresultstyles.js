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
    backgroundColor:"white"
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
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
