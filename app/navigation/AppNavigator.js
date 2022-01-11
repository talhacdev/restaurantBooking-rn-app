import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import hardcodeCart from '../hardcode/hardcodeCart';

import FeedNavigator from './FeedNavigator';
import CartNavigator from './CartNavigator';
import AccountNavigator from './AccountNavigator';
import CameraNavigator from './CameraNavigator';
import routes from './routes';
import ChatNavigator from './ChatNavigator';
import colors from '../config/colors';

import {connect} from 'react-redux';
import {UpdateCart} from '../redux/actions/AuthActions';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator initialRouteName={routes.HOME}>
      <Tab.Screen
        name="Home"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="QR Code"
        component={CameraNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="camera" size={size} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <Icon name="camera" size={size} color={color} />
          ),
        })}
      /> */}

      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{flexDirection: 'row'}}>
              <Icon name="cart" color={color} size={size} />
              {props.cart.length > 0 ? (
                <View
                  style={{
                    backgroundColor: colors.buttonColor,
                    width: 25,
                    borderRadius: 25 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: colors.buttonTextColor}}>
                    {props.cart.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ),
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.auth.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
