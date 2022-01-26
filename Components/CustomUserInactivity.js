import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import UserInactivity from 'react-native-user-inactivity';
import {Actions} from 'react-native-router-flux';
const CustomUserInactivity = () => {
  const [active, setActive] = useState(true);
  const [timer, setTimer] = useState(2000);
  useEffect(() => {
    console.log(active);
  }, [timer]);
  return (
    <View>
      <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={(isActive) => {
          setActive(isActive);
        }}></UserInactivity>
    </View>
  );
};

export default CustomUserInactivity;
