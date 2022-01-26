import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 30 + '%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Regular',
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'white',
  },

  //   textInput: {
  //     borderWidth: 1, // size/width of the border
  //     borderColor: 'lightgrey', // color of the border
  //     paddingLeft: 10,
  //     height: 75,
  //   },
  maincontainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor:"#FFF"
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
  PickerContainerSearchable: {
    padding: 10,
    marginBottom:10,
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 12,
    marginRight: 12,
  },
  PickerContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    height: 70,
  },
  Inputcontainer: {
    marginTop: 10,
    paddingBottom: 10,
    padding: 10,
    width: '100%',
  },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 10,
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
