import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  plate: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0.1,
    elevation: 5,
    borderRadius: 15,
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
  },

  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop:50,
    flexDirection: 'column',
    backgroundColor:"white"
  },
  bodybtns: {
    width: '100%',
  },
  bodyContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 16,
    color: '#696969',
    fontFamily: 'SFUIDisplay-Regular',
    textAlign: 'center',
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    color: '#0084FF',
    fontFamily: 'SFUIDisplay-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  infodesc: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'SFUIDisplay-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#1dc259',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

    margin: 20,
    width: '50%',
    borderRadius: 30,
    backgroundColor: '#0084FF',
  },
  btntext: {
    color: 'white',
  },
  viewstandard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    padding: 20,
  },
  viewdetails: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    padding: 20,
  },
});

export default styles;
