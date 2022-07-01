import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Pressable, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { API_URL, HOST } from "@env"


export default function Account({ navigation }) {
    const [data, setData] = useState()
    const [name, setName] = useState()
    const [search, setSearch] = useState()
    useEffect(() => {
        getData();
        getName();
    }, []);


    const getData = async () => {

        await axios.get(API_URL + `membership/getLevelAndPoint`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
                }
            }
        )
            .then(response => {
                setData(response.data.data)
            }).catch(error => {
                console.log(error)
            })
    }


    const handleLogout = async () => {
        const keys = ['token', 'user']
        try {
            await AsyncStorage.multiRemove(keys);
        }
        catch (e) {
            console.log(e)
        }

        navigation.navigate("Login")
        Alert.alert(
            "",
            "Berhasil Logout",
            [

                { text: "OK" }
            ]
        )
        console.log("Berhasil Logout")
    }

    const onChangeText = (e) => {
        setText(e)
    }

    const getName = async () => {
        const jsonValue = await AsyncStorage.getItem('user')
        const value = jsonValue != null ? JSON.parse(jsonValue) : null
        setName({
            name: value.name,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, color: "black" }}>Search</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={search}
                placeholder="Cari produk/toko"
            />
            <Text style={{ fontSize: 24, color: "black", fontWeight: "600" }}>Hi , {name?.name}!</Text>
            <View style={styles.section3}>

                <TouchableOpacity onPress={() => navigation.navigate("Membership")} disabled={data ? false : true}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View>
                                <Image
                                    style={styles.profil}
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                    }}
                                />

                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
                                    {data?.levelName}
                                </Text>
                                {data ?
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                    >
                                        {`(${data?.currentLoyaltyPoint} Poin)`}
                                    </Text>
                                    :
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                    >
                                        0 Point
                                    </Text>
                                }
                            </View>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 40, color: "black" }}>
                                <Icon size={24} color="#000" name="arrow-forward-ios" />
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
            <View style={styles.section3}>

                <TouchableOpacity onPress={() => navigation.navigate("TransactionList")}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>My Orders</Text>
                        </View>

                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 40, color: "black" }}>
                                <Icon size={24} color="#000" name="arrow-forward-ios" />
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
            <View style={{}}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "red",
                        height: 40,
                        borderRadius: 50,
                        marginTop: "80%",
                    }}
                    onPress={handleLogout}
                >
                    <Text style={{ color: "#FFF", fontWeight: "600", textAlign: "center", fontSize: 24 }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
        marginTop: 0,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F18910",
        height: 40,
        borderRadius: 10,
        width: "100%",
        color: "black"

    },
    container: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: "90%",
        height: 125,
        borderRadius: 10,
        resizeMode: "cover",
    },
    imageVoucher: {
        width: "30%",
        height: "auto",
        borderRadius: 10,
        resizeMode: "cover",
    },
    section1: {
        padding: 20,
        marginTop: 5,
        backgroundColor: "#F18910",
        height: "auto",
        width: "90%",
        borderRadius: 10,
    },
    section3: {
        padding: 20,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "100%",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

    },
    section4: {
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "90%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#F18910",
        display: "flex",
        flexDirection: "row",


    },
    section2: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    profil: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    description: {
        color: "#333333",
        fontSize: 16,
        fontWeight: "400"
    },

})