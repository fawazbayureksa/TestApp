/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text,
  Button,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Membership from './src/membership/index';
import Headers from './src/commons/Headers.js';



function App() {
  return (
    <NavigationContainer>
      <Headers />
      <Membership />
    </NavigationContainer>
  );
}



export default App;
