import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/redux/Store';

import {navigationRef} from './app/navigation/rootNavigation';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          <AuthNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
