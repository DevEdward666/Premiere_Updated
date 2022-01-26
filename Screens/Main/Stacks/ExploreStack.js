import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import NewsMain from '../../News/NewsMain';
function ExploreStack(props) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: false,
          headerLeft: null,
        }}
     
      >
        <Stack.Screen
          name="Screen_Premiere"
          component={NewsMain}
          options={{
            title: "Premiere",
          
          }}
        />
      </Stack.Navigator>
    );
}

export default ExploreStack;