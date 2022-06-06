import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Membership() {
    const [text, onChangeText] = useState();
    return (
        <View style={styles.membership}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Cari produk/toko"
            />
            <Image
                style={styles.logo}
                source={{
                    // uri: '../assets/img/Rectangle.png',
                    uri: 'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                }}
            />
            <View style={styles.section1}>
                <View style={styles.section2}>
                    <Image
                        style={styles.profil}
                        source={{
                            // uri: '../assets/img/Rectangle.png',
                            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                        }}
                    />
                    <Text style={styles.text}>
                        Silver Member
                    </Text>
                    <Text style={styles.text}>
                        Detail
                    </Text>
                    <Icon style={{ marginLeft: 60 }} size={24} color="white" name="clock-o" />
                </View>
                <View style={styles.section3}>

                </View>
                <View style={styles.section3}>

                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        paddingHorizontal: 10,
        marginTop: 30,
        width: "90%",
        marginBottom: 10
    },
    membership: {
        marginLeft: 20,
        width: "100%"
    },
    logo: {
        width: "90%",
        height: 125,
        borderRadius: 10
    },
    section1: {
        padding: 20,
        marginTop: 5,
        backgroundColor: "#F18910",
        height: 350,
        width: "90%",
        borderRadius: 10,
    },
    section3: {
        padding: 20,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        height: 150,
        width: "100%",
        borderRadius: 10,
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
        fontSize: 14
    }
})
