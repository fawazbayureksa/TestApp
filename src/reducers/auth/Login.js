import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTwoButtonAlert } from "../../commons/Alert"
export default function Login({ navigation }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [foundToken, setFoundToken] = useState()

    const baseUrl = `https://api-cms.degadai.id/api/`;


    const handleLogin = async () => {
        let data = {
            email: email,
            password: password,
        }
        let config = {
            headers: {
                Origin: "http://localhost:3002/",
            }
        }

        axios.post(baseUrl + `auth/login`, data, config)
            .then(async (res) => {
                const data = res.data.data.user
                const token = JSON.stringify(res.data.data.access_token)

                // const firstPair = ["token", token]
                // const secondPair = ["user", data]

                await AsyncStorage.setItem("token", token);

                // await AsyncStorage.multiSet([firstPair, secondPair])

                // await AsyncStorage.setItem("user", data)
                if (res.data.message == "login success") {
                    Alert.alert(
                        "",
                        "Login Berhasil",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    )
                    navigation.navigate("Account");
                }
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
        // <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFFF" }}>
            <View style={{ width: "80%" }}>
                <Text style={styles.title}>Masuk Ke Akun Anda</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setEmail(e))}
                    value={email}
                    placeholder="Masukkan Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setPassword(e))}
                    value={password}
                    placeholder="Masukkan Password"
                    secureTextEntry={true}
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", width: "40%" }}>
                <TouchableOpacity>
                    <Button
                        title="Masuk"
                        onPress={handleLogin}
                        color="#F18910"
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <Button
                        title="Kembali"
                        onPress={() => navigation.navigate('Membership')}
                        color="gray"
                    />
                </TouchableOpacity> */}
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
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
        // </View>
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
        color: "black"

    },
    title: {
        color: "#F18910",
        fontSize: 24,
        letterSpacing: 2,
        fontWeight: "700",
        marginBottom: 20
    },
})