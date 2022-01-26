import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1dc259',
  },
  datetext: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  headtitle: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Open-Sans',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontFamily: 'SFUIDisplay-Regular',
    fontWeight: 'bold',
  },
  eventtitle: {
    fontSize: 18,
    padding: 2,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'SFUIDisplay-Medium',
  },
  eventdate: {
    fontSize: 12,
    padding: 2,
    textAlign: 'right',
    fontFamily: 'SFUIDisplay-Regular',
  },
  ELMain: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ELSecondView: {
    width: '80%',
    alignItems: 'flex-start',
  },
  EventListTitle: {
    fontFamily: 'SFUIDisplay-Medium',
  },
  EventDate: {
    fontFamily: 'SFUIDisplay-Regular',
  },
  ELImage: {
    width: 50,
    height: 50,
    borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 3,
  },
  eventenddate: {
    fontSize: 12,
    padding: 2,
    textAlign: 'right',
    fontFamily: 'SFUIDisplay-Regular',
  },

  eventdesc: {
    fontSize: 24,
    padding: 2,
    marginTop: 10,
    fontFamily: 'SFUIDisplay-Medium',
  },
  dateplate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  plate: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 15,
  },
  titleplate: {
    flex: 1,
    height: '10%',
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 30,
  },
});
export default styles;
