import {StyleSheet, Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  header: {
    height: height,
  },
  maincontainer: {
    height: height,
    width: width,
    backgroundColor: 'white',
    marginBottom: 30,
  },
  container: {
    flex: 1,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 120,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
  },
  qrimage: {
    width: 180,
    height: 180,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
  },
  docs: {
    margin: 10,
    width: '80%',
    height: 500,
    //borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
    // position: 'absolute',
  },

  body: {
    padding: 10,
  },
  bodyContent: {
    width: '70%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bodyTitle: {
    width: '30%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mainbody: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  body2: {
    flex: 1,
    paddingStart: 10,
    paddingTop: 10,
  },
  bodyContent1: {
    flex: 1,
    alignItems: 'flex-start',
    paddingStart: 10,
  },
  bodyContent2: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 16,
    fontFamily: 'SFUIDisplay-Bold',
    color: 'black',
  },
  info: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    textAlign: 'center',
  },
  details: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Medium',
    color: 'black',
    flex: 1,
    padding: 3,
    textAlign: 'justify',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  userplate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  infotext: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'SFUIDisplay-Bold',
    backgroundColor: 'white',
  },

  
  flatlistcontainer: {
    // backgroundColor: 'white',

    height:height,
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
    marginBottom: 150,
  },
});

export default styles;
