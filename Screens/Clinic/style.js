import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  searchcontainer: {
    flex: 1,
    width: '100%',
  },
  cardContainer: {
    marginTop: 10,
    width: '100%',
  },

  SearchInputcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor:"#FFF"
  },
  container: {
    flex:1,
  },
  text: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    backgroundColor: 'white',
    marginBottom:5,
  },
  ImageContainer: {
    width: '100%',
    height: '20%',
  },
  ImageSize: {
    flex: 1,
    alignSelf: 'center',
  },
  plate: {
    backgroundColor: 'white',
    borderWidth: 0.1,
    elevation: 20,
    borderRadius: 10,
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
  login: {
    marginTop: 10,
    paddingTop: 10,
    width: '40%',
    alignSelf: 'flex-end',
    paddingBottom: 20,
    height: 50,
    backgroundColor: '#0084FF',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#0084FF',
  },
  maincontainer: {
    flex: 1,
    backgroundColor:"#FFF",

  },
  avatar: {
    width: 180,
    height: 180,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  PickerContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 12,
    marginRight: 12,
  },
  Inputcontainer: {
    width: '100%',
    marginTop: 10,
    padding: 10,
  },

  imagecontainer: {
    flex: 1,
    padding: 30,
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistcontainer: {
    paddingTop: 22,
  },
  flatlistitem: {
    padding: 10,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
    height: 80,
  },
  flatlistitemsecond: {
    padding: 10,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
    height: 80,
  },
});

export default styles;
