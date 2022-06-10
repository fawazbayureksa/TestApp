import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';

export default function Login({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [dateBirthday, setDateBirtday] = useState();
    const baseUrl = `https://api-cms.degadai.id/api/`;
    const [companyName, setCompanyName] = useState()

    useEffect(() => {
        getMasterDataRegister();
        verifyEmail()
    }, []);


    const onChangePass = (e) => {
        setPassword(e)
    }



    const getMasterDataRegister = async () => {
        await axios.get(baseUrl + `auth/getMasterDataRegister`, {
            headers: {
                "Origin": "http://localhost:3002/",
            }
        }).then(res => {
            let data = res.data.data;
            setCompanyName(data.company_name)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleDaftar = () => {
        let data = {
            name: name,
            email: email,
            date_of_birth: dateBirthday,
            phone_number: phone,
            password: password
        }

        axios.post(baseUrl + `auth/register`, data, {
            headers: {
                "Origin": "http://localhost:3002/",
            }
        }).then(async (res) => {
            // if (res.data.message) 
            console.log(res.data.data)
            Alert.alert(
                "",
                "Register Successfully, Check Your Email For Verification!",
                [
                    { text: "OK" }
                ]
            )
            navigation.navigate("Login");
        })
            .catch(function (error) {
                console.log(error);
                Alert.alert(
                    "",
                    "Lengkapi data",
                    [

                        { text: "OK" }
                    ]
                )

            })

        // console.log(data)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDateBirtday(date)
        hideDatePicker();
    };

    const verifyEmail = async () => {
        let data = {
            token: "token",
        }
        await axios.post(baseUrl + `auth/verifyEmail`, data, {
            headers: {
                "Origin": "http://localhost:3002/",
            }
        }).then(res => {
            console.log(res)

        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFFF" }}>
            <View style={{ width: "80%" }}>
                <Text style={styles.title}>Daftar Di Tokodapur</Text>
                <Text style={{ fontSize: 14, color: "black" }}>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setName(e))}
                    value={name}
                    placeholder="Masukkan Nama"
                />
                <View style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                    <Text style={{ fontSize: 14, color: "black" }}>Pilih Tanggal Lahir</Text>
                    <Button title="Pilih" onPress={() => setDatePickerVisibility(true)} color="#F18910" />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                </View>
                <Text style={{ fontSize: 14, color: "black" }}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setEmail(e))}
                    value={email}
                    placeholder="Masukkan Email"
                />
                <Text style={{ fontSize: 14, color: "black" }}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setPhone(e))}
                    value={phone}
                    autoComplete="tel-device"
                    placeholder="No telepon"
                />
                <Text style={{ fontSize: 14, color: "black" }}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => (onChangePass(e))}
                    value={password}
                    placeholder="Masukkan Kata Sandi"
                    secureTextEntry={true}
                />
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(e) => (setPassword(e))}
                    value={password}
                    placeholder="Konfirmasi Kata Sandi"
                    secureTextEntry={true}
                /> */}
            </View>
            <Text style={{ textAlign: "center", marginHorizontal: 50, marginBottom: 15 }}>
                Dengan klik Daftar, Maka anda telah menyetujui
                Syarat dan Ketentuan
            </Text>
            <View style={{ flexDirection: "row" }}>
                <Button
                    title="Daftar"
                    onPress={handleDaftar}
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