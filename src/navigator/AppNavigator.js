import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../reducers/auth/Login';
import Membership from '../pages/membership/index';
import Register from "../reducers/auth/register";
import Email from "../reducers/auth/email";
import Account from "../pages/membership/account";
import ProductList from "../pages/products/ProductList";
import DetailProduct from '../pages/products/DetailProduct';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigator({ navigation }) {



    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ProductList" component={ProductList} />
                <Stack.Screen name="DetailProduct" component={DetailProduct} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Email" component={Email} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Membership" component={Membership} />
            </Stack.Navigator>
            {/* <Tab.Navigator>
                <Stack.Screen name="Membership" component={Membership} />
                <Stack.Screen name="Login" component={Login} />
                <Tab.Screen />
            </Tab.Navigator> */}
        </NavigationContainer>
    );
}