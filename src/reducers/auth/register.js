import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

export default function Login({ navigation }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [date, setDate] = useState()



    const handleLogin = () => {

    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFFF" }}>
            <View style={{ width: "80%" }}>
                <Text style={styles.title}>Daftar Di Tokodapur</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setEmail(e))}
                    value={email}
                    placeholder="Masukkan Nama"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setEmail(e))}
                    value={email}
                    placeholder="Masukkan Email"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setEmail(e))}
                    value={email}
                    autoComplete="tel-device"
                    placeholder="No telepon"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setPassword(e))}
                    value={password}
                    placeholder="Masukkan Kata Sandi"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setPassword(e))}
                    value={password}
                    placeholder="Konfirmasi Kata Sandi"
                    secureTextEntry={true}
                />
            </View>
            <Text style={{ textAlign: "center", marginHorizontal: 50, marginBottom: 15 }}>
                Dengan klik Daftar, Maka anda telah menyetujui
                Syarat dan Ketentuan
            </Text>
            <View style={{ flexDirection: "row" }}>
                <Button
                    title="Daftar"
                    onPress={handleLogin}
                    color="#F18910"
                />
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
                <Text style={{ color: "black", fontSize: 16 }}>
                    Sudah Terdaftar ?
                </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{ marginLeft: 10, color: "#F18910", fontSize: 16 }}>
                        Masuk
                    </Text>
                </Pressable>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({

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