import React, {useCallback, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from './style';
import {useDispatch} from 'react-redux';
import {HelperText} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {action_set_secondinfo} from '../../Services/Actions/SignUp_Actions';
import {Actions} from 'react-native-router-flux';
export default function SecondInfo() {
  const [date, setDate] = useState(new Date());
  const [getdate, setdate] = useState(new Date());
  const [gender, setgender] = useState('');
  const [ageerrormessage, setageerrormessage] = useState(false);
  const [age_now, setage_now] = useState(0);

  const [gendererrormessage, setgendererrormessage] = useState(false);
  const dispatch = useDispatch();
  const NextStep = useCallback(() => {
    if (gender === '') {
      setgendererrormessage(true);
    } else if (age_now < 13) {
      setageerrormessage(true);
    } else {
      setageerrormessage(false);
      setgendererrormessage(false);
      dispatch(action_set_secondinfo(getdate, gender, true));
      Actions.signup_email();
    }
  }, [dispatch, gender, getdate]);
  const genderchange = useCallback((itemValue) => {
    setgender(itemValue);
    setgendererrormessage(false);
  }, []);
  const onDateChange = useCallback(
    async (selectedDate) => {
      const currentDate = selectedDate || date;
      var today = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      await setage_now(today.getFullYear() - currentDate.getFullYear());
      var getage = today.getFullYear() - currentDate.getFullYear();
      if (getage < '13') {
        await setageerrormessage(true);
      } else {
        if (month <= 9 && day <= 9) {
          await setdate(year + '-0' + month + '-0' + day);
        } else if (month <= 9) {
          await setdate(year + '-0' + month + '-' + day);
        } else if (day <= 9) {
          await setdate(year + '-' + month + '-0' + day);
        } else {
          await setdate(year + '-' + month + '-' + day);
        }
        await setageerrormessage(false);
      }
    },
    [age_now],
  );
  return (
    <View
      style={{backgroundScrollViewColor: 'white', flex: 1}}
      scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.Inputcontainer}>
            <View style={styles.Inputcontainer}>
              <View style={styles.cardContainer}>
                <Text
                  style={{
                    width: '100%',
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 16,
                    marginBottom: 30,
                    fontFamily: 'SFUIDisplay-Bold',
                  }}>
                  Whats your birthdate and gender?
                </Text>
                <DatePicker
                  date={date}
                  onDateChange={(e) => onDateChange(e)}
                  mode="date"
                />
                <Text
                  style={{
                    width: '100%',
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 30,
                    fontFamily: 'SFUIDisplay-Bold',
                  }}>
                  Age: {age_now}
                </Text>
                <HelperText type="error" visible={ageerrormessage}>
                  Age below 13 are not allowed to use this application
                </HelperText>
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Picker
                    selectedValue={gender}
                    style={styles.PickerContainer}
                    onValueChange={(itemValue, itemIndex) =>
                      genderchange(itemValue)
                    }>
                    <Picker.Item label="Gender" />
                    <Picker.Item label="Male" value="M" />
                    <Picker.Item label="Female" value="F" />
                  </Picker>
                  <HelperText type="error" visible={gendererrormessage}>
                    Please fill gender
                  </HelperText>
                </View>
              </View>
              <TouchableHighlight
                style={styles.login}
                underlayColor="rgba(62, 178, 250, 0.5)"
                onPress={() => NextStep()}>
                <Text style={styles.submitText}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
