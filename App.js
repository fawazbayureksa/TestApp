/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from 'react-navigation/native';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#F18910',
  },
};


function App() {
  // const navigation = useNavigation();
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}



export default App;

