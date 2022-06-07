/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Membership from './src/membership/index';
import Headers from './src/commons/Headers.js';


function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle='light-content' backgroundColor="#ff6f00"></StatusBar>
      <ScrollView>
        <Headers />
        <Membership />
      </ScrollView>
    </SafeAreaView>
  );
}



export default App;
