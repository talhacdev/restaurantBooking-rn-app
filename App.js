import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './app/navigation/AuthNavigator';
import {navigationRef} from './app/navigation/rootNavigation';
import navigationTheme from './app/navigation/navigationTheme';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
