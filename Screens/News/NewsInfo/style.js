import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  cardmain: {
    flex: 1,
    backgroundColor: 'white',

    // backgroundColor:"white",

    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  baseText: {
    textAlign: 'justify',
    padding: 15,
  },
  textTitle: {
    fontSize: 24,
    padding: 15,
    textAlign: 'left',
    fontFamily: 'SFUIDisplay-Bold',
  },
  topicimage: {
    flex: 1,
    margin: 30,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    fontFamily: 'SFUIDisplay-Regular',
  },
  flatlistcontainer: {
    flex: 1,
  },
  contentNOTIFICATION: {
    width: '100%',
    marginStart: 10,
    flexDirection: 'row',
  },
  containerNOTIFICATION: {
    width: '100%',
    height: 30,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
});
export default styles;
