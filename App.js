import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/redux/Store';

import {navigationRef} from './app/navigation/rootNavigation';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(async () => {
    const user = await getLoggedIn();
    console.log('user: ', user);
    if (user) {
      setLoggedIn(true);
    }
  });

  const getLoggedIn = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@loggedIn');
      return jsonValue;
    } catch (e) {
      console.log('ERROR: getLoggedIn: ', e);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {loggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
