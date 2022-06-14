import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";

const Filter = (drawer) => {

    return (

        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={{ fontSize: 20, color: "#000", fontWeight: "500" }}>
                Filter
            </Text>
        </View>
    );
};

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

export default Filter;