import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTwoButtonAlert } from "../../commons/Alert"
import { API_URL, HOST } from "@env"
import { ScrollView } from 'react-native-gesture-handler';

export default function Login({ navigation }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [foundToken, setFoundToken] = useState()



    const handleLogin = async () => {
        let data = {
            email: email,
            password: password,
        }
        let config = {
            headers: {
                Origin: HOST,
            }
        }

        axios.post(API_URL + `auth/login`, data, config)
            .then(async (res) => {
                const data = JSON.stringify(res.data.data.user)
                const token = JSON.stringify(res.data.data.access_token)
                const firstPair = ["token", token]
                const secondPair = ["user", data]

                await AsyncStorage.multiSet([firstPair, secondPair])

                if (res.data.message == "login success") {
                    Alert.alert(
                        "",
                        "Login Berhasil",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                    navigation.navigate("ProductList");
                }
                console.log(res.data.message);
            })
            .catch(function (error) {
                console.log(error);
                Alert.alert(
                    "",
                    "Masukkan Email & Password yang benar",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )

            })
    }


    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF", }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                width: "100%"
            }}>
                <Text style={styles.title}>Masuk Ke Akun Anda</Text>
                <Text style={{ fontSize: 16, color: "black", marginLeft: 20 }}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setEmail(e))}
                    value={email}
                    placeholder="Masukkan Email"
                />
                <Text style={{ fontSize: 16, color: "black", marginLeft: 20 }}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setPassword(e))}
                    value={password}
                    placeholder="Masukkan Password"
                    secureTextEntry={true}
                />
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#F18910",
                        height: 40,
                        borderRadius: 50,
                        width: "90%"

                    }}
                        onPress={handleLogin}
                    >
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#FFF" }}>Masuk</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginTop: 15, justifyContent: "center" }}>
                    <Text style={{ color: "black", fontSize: 16 }}>
                        Belum Punya Akun ?
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={{ marginLeft: 10, color: "#F18910", fontSize: 16 }}>
                            Daftar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        // marginLeft: 20,
        width: "100%",
    },
    input: {
        paddingHorizontal: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#F18910",
        height: 50,
        borderRadius: 10,
        width: "90%",
        color: "black",
        alignSelf: "center",
        // alignItems: "center",
    },
    title: {
        color: "#F18910",
        fontSize: 24,
        letterSpacing: 2,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center"
    },
})