import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AuthNavigator from './app/navigation/AuthNavigator';
import {navigationRef} from './app/navigation/rootNavigation';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      {/* <AppNavigator /> */}
      <AuthNavigator />
    </NavigationContainer>
  );
}
