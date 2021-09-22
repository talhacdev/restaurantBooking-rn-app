import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import BookNowScreen from '../screens/BookNowScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';

const Stack = createStackNavigator();

const SearchNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
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

export default SearchNavigator;
