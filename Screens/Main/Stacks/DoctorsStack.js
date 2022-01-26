import React from 'react';
import DoctorsScreen from '../../Doctors/DoctorsScreen'
import { createStackNavigator } from "@react-navigation/stack";
function DoctorsStack(props) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Screen_Doctors"
          component={DoctorsScreen}
          options={{ title: "Doctors" }}
        />
      </Stack.Navigator>
    );
}

export default DoctorsStack;