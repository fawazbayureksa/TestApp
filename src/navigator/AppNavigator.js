import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, Image, Pressable, DrawerLayoutAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../reducers/auth/Login';
import Membership from '../pages/membership/index';
import Register from "../reducers/auth/register";
import Email from "../reducers/auth/email";
import Account from "../pages/membership/account";
import ProductList from "../pages/products/ProductList";
import DetailProduct from '../pages/products/DetailProduct';
import ProductCard from '../pages/products/ProductCard';
import { navigationRef } from './RootNavigation';
import Filter from '../pages/products/Filter';
import Cart from "../pages/products/Cart"
import Address from "../pages/products/Address"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-paper';
import Checkout from '../pages/products/Checkout';
import CheckoutPay from '../pages/products/CheckoutPay';
// import { TouchableOpacity } from 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();




function LogoTitle() {


    return (
        <Image
            style={{ width: 100, height: 50, resizeMode: "contain" }}
            source={{
                uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314043918_Logo%20Tokodapur%20Hi-Res%20Web%20Orange%20Small.png'
            }}
        />
    );
}


export default function AppNavigator() {
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("right");

    return (

        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={200}
            drawerPosition={drawerPosition}
            renderNavigationView={Filter}
        >
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen
                        name="ProductList"
                        component={ProductList}
                        options={{
                            headerBackVisible: false,
                            headerTitle: props => <LogoTitle {...props} />,
                            headerRight: () => (
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => alert('This is Chat!')}
                                        >
                                            <View style={{ marginRight: 10 }}>
                                                <Badge style={{ marginBottom: -12, zIndex: 2, marginLeft: 15, backgroundColor: "red" }}>0</Badge>
                                                <Icon size={28} color="#F18910" name="mail" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => alert('This is Notification!')}
                                        >
                                            <View style={{ marginRight: 10 }}>
                                                <Badge style={{ marginBottom: -12, zIndex: 2, marginLeft: 15, backgroundColor: "red" }}>0</Badge>
                                                <Icon size={28} color="#F18910" name="notifications" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => navigationRef.navigate("Cart")}
                                        >
                                            <View style={{ marginRight: 10 }}>
                                                <Badge style={{ marginBottom: -12, zIndex: 2, marginLeft: 15, backgroundColor: "red" }}>1</Badge>
                                                <Icon size={28} color="#F18910" name="shopping-cart" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => navigationRef.navigate("Account")}
                                        >
                                            <Text style={{ fontSize: 18, marginRight: 10, color: "#000", marginTop: 8 }}>
                                                <Icon size={32} color="#A6A6A6" name="person" />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ),
                        }}
                    />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Address" component={Address}
                        options={{
                            headerTitle: "Pilih Alamat"
                        }}
                    />
                    <Stack.Screen name="Checkout" component={Checkout} />
                    <Stack.Screen name="CheckoutPay" component={CheckoutPay}
                        options={{
                            headerTitle: "Metode Pembayaran"
                        }}
                    />
                    <Stack.Screen name="DetailProduct" component={DetailProduct} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Email" component={Email} />
                    <Stack.Screen name="Account" component={Account} />
                    <Stack.Screen name="Membership" component={Membership} />
                </Stack.Navigator>
            </NavigationContainer >
        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    }
});
