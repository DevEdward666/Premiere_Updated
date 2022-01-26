// import {LinearGradient} from 'expo-linear-gradient';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Input} from 'react-native-elements';
// import CardView from 'react-native-rn-cardview';
import {Picker} from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_doctors,
  action_GET_doctorsbySpecialty,
  action_GET_doctors_byname,
  action_GET_doctorsSpecialty,
} from '../../Services/Actions/Doctors_Actions';
import {Appbar} from 'react-native-paper';
import {ActionSheetIOS} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './mainstyle'
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({images, scrollX}) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        keyExtractor={(item) => item.doccode + '-backdrop'}
        data={images.reverse}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.backdrop}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      {/* <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      /> */}
    </View>
  );
};

const DoctorScreen = () => {
  const [offset, setoffset] = useState(10);
  const [spinner, setSpinner] = useState(false);
  const doctors_reducer = useSelector((state) => state.Doctors_Reducers.data);
  const [reducers, setreducer] = useState();
  const [doctorsname, setdoctorsname] = useState();
  const doctors_sepcialty_reducer = useSelector(
    (state) => state.Doctors_Reducers.specialty,
  );
  const [specialty, setspecialty] = useState(0);
  var doctors_reducer_by_specialty = '';
  if (specialty == '0' && specialty != '000') {
    doctors_reducer_by_specialty = useSelector(
      (state) => state.Doctors_Reducers.data,
    );
  } else {
    doctors_reducer_by_specialty = useSelector(
      (state) => state.Doctors_Reducers.byspecialty,
    );
  }

  const dispatch = useDispatch();

  const handleSpecialtyChange = useCallback(
    (spclcode) => {
      let mounted = true;
      if (mounted) {
        setoffset(10);
        setspecialty(spclcode);
        dispatch(action_GET_doctorsbySpecialty(offset, spclcode));
        setreducer(doctors_reducer_by_specialty);
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch],
  );
  const handleNamechange = useCallback(
    async (name) => {
      let mounted = true;
      if (mounted) {
        await setdoctorsname(name);
        await dispatch(
          action_GET_doctors_byname(
            parseInt(offset),
            specialty.toString(),
            name.toString(),
          ),
        );
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch, offset, specialty, doctorsname],
  );
  useEffect(() => {
    let mounted = true;
    const getdoctorsspecialty = async () => {
      if (mounted) {
        dispatch(action_GET_doctors(offset));
        dispatch(action_GET_doctorsSpecialty());
      }
    };

    mounted && getdoctorsspecialty();
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  useEffect(() => {
    let mounted = true;
    const getdoctors = () => {
      if (mounted) {
        if (specialty === undefined) {
          dispatch(action_GET_doctors(offset));
          console.log('here');
        }
        // if ((prev) => prev != offset) {
        //   setSpinner(true);
        //   setInterval(() => {
        //     setSpinner(false);
        //   }, 1000);

        //   dispatch(action_GET_doctors(offset));
        // } else {
        //   setSpinner(true);
        //   setInterval(() => {
        //     setSpinner(false);
        //   }, 1000);

        //   dispatch(action_GET_doctors(offset));
        // }
      }
    };

    mounted && getdoctors();
    return () => {
      mounted = false;
    };
  }, [dispatch, offset, specialty]);
  const loadmore = () => {
    let mounted = true;
    if (mounted) {
      setoffset((prev) => prev + 10);
      dispatch(action_GET_doctorsSpecialty());

      if (specialty === undefined) {
        dispatch(action_GET_doctors(offset));
        console.log('here');
      } else {
        dispatch(action_GET_doctorsbySpecialty(offset, specialty));
      }
    }
    return () => {
      mounted = false;
    };
  };
  const getDoctorInfo = async (item) => {
    let mounted = true;
    if (mounted) {
      await AsyncStorage.setItem('doccodes', item.doccode);
      await Actions.doctorsinfo();
      dispatch(action_GET_doctors(offset));
    }
    return () => {
      mounted = false;
    };
  };



  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({name, email}, query) => {
    const {first, last} = name;

    if (
      first.includes(query) ||
      last.includes(query) ||
      email.includes(query)
    ) {
      return true;
    }

    return false;
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Backdrop
        images={require('../../assets/doctors/john.jpg')}
        scrollX={scrollX}
      />
      <Picker
        selectedValue={specialty}
        style={styles.PickerContainer}
        onValueChange={(itemValue, itemIndex) =>
          handleSpecialtyChange(itemValue)
        }>
        <Picker.Item label="Select Specialty" />
        {doctors_sepcialty_reducer?.map((card) => (
          <Picker.Item
            key={card.spclcode}
            value={card.spclcode}
            label={card.spcldesc}
          />
        ))}
      </Picker>
      <Input
        style={styles.textInput}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholder="Search Doctor"
        onChangeText={(text) => handleNamechange(text)}
        value={doctorsname}
      />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        data={
          specialty === undefined || specialty === 0
            ? doctors_reducer
            : doctors_reducer_by_specialty
        }
        horizontal
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
            extrapolate: 'clamp',
          });
          return (
            <TouchableHighlight
              key={index}
              underlayColor="#1C00ff00"
              onPress={() => getDoctorInfo(item)}>
              <View style={{width: ITEM_SIZE}} key={item.firstname}>
                <Animated.View
                  key={item.firstname}
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    elevation: 30,
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={require('../../assets/doctors/john.jpg')}
                    style={styles.posterImage}
                    key={item.firstname}></Image>
                  <Text
                    style={{fontSize: 18}}
                    numberOfLines={1}
                    key={item.lastname}>
                    {item.lastname + ',' + item.firstname}
                  </Text>
                </Animated.View>
              </View>
            </TouchableHighlight>
          );

          //<Text style={styles.item}>{item.title}</Text>
        }}
      />
    </View>
  );
};
DoctorScreen.propTypes = {};

export default DoctorScreen;
