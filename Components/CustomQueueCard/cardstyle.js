import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    width: '100%',
  },
  containerlogcard: {
    width: '100%',
  },
  cardviewimage: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  carddesc: {
    marginBottom: 10,
    padding: 10,
    fontFamily: 'SFUIDisplay-Light',
  },
  cardviewimagesecond: {
    width: '30%',
    marginBottom: -20,
    justifyContent: 'center',
  },
  cardtitle: {
    width: '50%',
    marginBottom: -20,
    alignItems: 'flex-start',
    fontFamily: 'SFUIDisplay-Bold',
  },
  cardmain: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',

    // backgroundColor:"white",

    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  image: {
    width: '75%',
    height: 100,
    borderWidth: 3,
    alignSelf: 'center',
    resizeMode: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    backgroundColor: '#000000a0',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
    paddingTop: 10,
    marginTop: 10,
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
    width: '100%',
    height: 50,
    paddingRight: 20,
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containercomment: {
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-start',
  },
});

export default styles;
