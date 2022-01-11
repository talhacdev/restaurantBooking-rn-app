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
import MyBookingsScreen from '../screens/MyBookingsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';

import {connect} from 'react-redux';
import {Login} from '../redux/actions/AuthActions';

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
      name="MyBookings"
      component={MyBookingsScreen}
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
    <Stack.Screen
      name="OnboardingScreen"
      component={OnboardingScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: payload => dispatch(Login(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountNavigator);
