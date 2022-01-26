import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
 
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
  },
  cardviewimage: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 40,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    textAlign: 'left',
    backgroundColor: '#000000c0',
  },
  cardtitle: {
    marginBottom: 10,
    padding: 10,
    color: 'white',
    fontSize: 14,
    textTransform: 'uppercase',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    fontFamily: 'SFUIDisplay-Bold',
  },

  infotitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginTop: 10,
    fontFamily: 'SFUIDisplay-Bold',
  },
  infodescription: {
    fontSize: 10,
    fontFamily: 'SFUIDisplay-Regular',
  },
  carddesc: {
    marginBottom: 10,
    padding: 10,
    color: 'white',
    fontSize: 12,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: '#000000c0',
  },
  cardviewimagesecond: {
    width: '10%',
    marginBottom: -20,
    marginStart: 20,
    justifyContent: 'center',
  },
  // cardtitle: {
  //   width: '50%',
  //   marginBottom: -20,
  //   alignItems: 'flex-start',
  //   fontFamily: 'SFUIDisplay-Bold',
  // },
  cardmain: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',

    // backgroundColor:"white",

    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 180 / 2,
    overflow: 'hidden',
    borderWidth: 3,
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
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'SFUIDisplay-Regular',
    height: 20,
  },

  containerNOTIFICATION: {
    width: '100%',
    height: 50,
    paddingLeft: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containerComment: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containercomment: {
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-start',
  },
  contentNOTIFICATION: {
    flex: 1,
    fontFamily: 'SFUIDisplay-Regular',
    marginStart: 20,
  },
});

export default styles;
