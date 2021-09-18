import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductScreen from '../screens/ProductScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import BookNowScreen from '../screens/BookNowScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Product"
      component={ProductScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="RestaurantDetail"
      component={RestaurantDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="BookNow"
      component={BookNowScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="BookingSuccess"
      component={BookingSuccessScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
