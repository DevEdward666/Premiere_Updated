import React from 'react';
import ServicesScreen from '../../HospitalServices/ServicesScreen'
import { createStackNavigator } from "@react-navigation/stack";
function ServiceStack(props) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        initialRouteName="Services"
        screenOptions={{ headerShown: false, headerLeft: null }}
      >
        <Stack.Screen
          name="Screen_Services"
          component={ServicesScreen}
          options={{ title: "Services" }}
        />
      </Stack.Navigator>
    );
}

export default ServiceStack;