import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CartScreen from '../screens/CartScreen';
import CartProductDetailScreen from '../screens/CartProductDetailScreen';
import CheckoutScreen from '../screens/CheckOutScreen';
import PromoCodeScreen from '../screens/PromoCodeScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';

const Stack = createStackNavigator();

const CartNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="CartProductDetail"
      component={CartProductDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PromoCode"
      component={PromoCodeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PaymentMethod"
      component={PaymentMethodScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OrderSuccess"
      component={OrderSuccessScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default CartNavigator;
