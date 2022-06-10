import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Pressable, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


export default function Account({ navigation }) {
    const [data, setData] = useState()
    const baseUrl = `https://api-cms.degadai.id/api/`;

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {

        await axios.get(baseUrl + `membership/getLevelAndPoint`,
            {
                headers: {
                    "Origin": "http://localhost:3002/",
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
        try {
            await AsyncStorage.removeItem('token');
        }
        catch (e) {
            console.log(e)
        }
        navigation.navigate("Login")
        console.log("Berhasil Logout")
    }


    return (
        <View style={styles.container}>
            <View style={styles.section3}>
                <Text style={{ fontSize: 20, color: "black", fontWeight: "600" }}>
                    {/* Nama : {JSON.parse(AsyncStorage.getItem("user"))} */}
                </Text>
                <Pressable onPress={() => navigation.navigate("Membership")}>
                    <Text style={{ fontSize: 20, color: "#F18910", fontWeight: "600", textDecorationLine: "underline" }}
                    >
                        Point : {`(${data?.currentLoyaltyPoint}-${data?.levelName})`}
                    </Text>
                </Pressable>
            </View>
            <Button
                title="Logout"
                color="red"
                onPress={handleLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({

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