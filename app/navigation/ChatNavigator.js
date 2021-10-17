import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default ChatNavigator;
