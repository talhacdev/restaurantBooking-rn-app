import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrderProductDetailScreen from '../screens/OrderProductDetailScreen';
import PromoAlertScreen from '../screens/PromoAlertScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OrderDetail"
      component={OrderDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OrderProductDetail"
      component={OrderProductDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PromoAlert"
      component={PromoAlertScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ContactUs"
      component={ContactUsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AboutUs"
      component={AboutUsScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
