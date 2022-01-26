import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor:"white"
  },
  card: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fafafaa0',
  },
  cardContainer: {
    marginTop: 10,
    width: '100%',
  },
  login: {
    marginTop: 10,
    paddingTop: 10,
    width: '50%',
    alignSelf: 'flex-end',
    height: 50,
    backgroundColor: '#0084FF',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#0084FF',
  },

  submitText: {
    color: 'white',
    textAlign: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
    flex: 1,
  },
  PickerContainer: {
    backgroundColor: '#f5f5f5',
    color: 'black',
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: 'white',
  },
  Inputcontainer: {
    flex: 1,
    padding: 20,
  },
  imagecontainer: {
    flex: 1,
    padding: 30,
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
