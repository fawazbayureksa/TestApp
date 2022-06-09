import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../reducers/auth/Login';
import Membership from '../membership/index';
import Register from "../reducers/auth/register"
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Membership" component={Membership} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
            {/* <Tab.Navigator>
                <Stack.Screen name="Membership" component={Membership} />
                <Stack.Screen name="Login" component={Login} />
                <Tab.Screen />
            </Tab.Navigator> */}
        </NavigationContainer>
    );
}