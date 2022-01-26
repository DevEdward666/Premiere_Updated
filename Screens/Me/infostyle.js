import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  header: {
    height: 100,
  },
  maincontainer: {
    marginTop: 10,
  },
  container: {
    marginTop: 5,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 10,
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
    marginTop: 80,
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
});

export default styles;
