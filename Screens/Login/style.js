import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  endFooter: {
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  startTextFooter: {
    textAlign: 'center',
    padding: 10,
    marginStart: 30,
    marginEnd: 30,
    color: '#c4c0c0',
  },
  endTextFooter: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 50,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#c4c0c0',
  },
  login: {
    marginTop: 50,
    paddingTop: 10,
    width: '50%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#0084FF',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#0084FF',
  },
  loader: {
    marginTop: 50,
    paddingTop: 10,
    width: '50%',
    alignSelf: 'center',
    height: 50,

  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
  InputContainer: {
    width: '100%',
    height: 50,
    padding: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    width: Dimensions.width,
    maxHeight: Dimensions.height,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,355,0.4)',
    width: '100%',
    height: '100%',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  mainContainer: {
    flex: 1,
    width: Dimensions.width,
    maxHeight: Dimensions.height,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    width: '100%',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    marginEnd: 30,
    width: '100%',
  },

  inputText: {
    color: 'black',
    fontWeight: 'normal',
    fontFamily: 'SFUIDisplay-Regular',
    marginLeft: 5,
  },
  image: {
    marginTop: 50,
    width: '100%',
    maxHeight: 250,
  },
  textTitle: {
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: 72,
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'SFUIDisplay-Regular',
    fontSize: 30,
  },
});

export default styles;
