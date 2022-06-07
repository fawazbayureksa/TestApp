import React from 'react';
import { View, Button, Text, StyleSheet, StatusBar } from 'react-native';

export default function Headers() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Headers</Text>
        </View >
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#F8931D",
        height: 60,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },

})



