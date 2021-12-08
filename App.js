import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './app/navigation/AuthNavigator';
import {navigationRef} from './app/navigation/rootNavigation';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@LoginResponse');
      return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log('\nError Getting Data\n', e);
    }
  };

  useEffect(() => {
    getData();
    console.log('USER: ', user);
  }, []);

  if (!user) {
    return (
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
