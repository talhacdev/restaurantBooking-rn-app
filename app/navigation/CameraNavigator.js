import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

const CartNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default CartNavigator;
