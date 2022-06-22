import { TouchableOpacity, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function TransaksiList() {
    return (
        <ScrollView>
            <View style={styles.section}>
                <View style={[styles.card, { width: "95%" }]}>
                    <View style={styles.sectionRow}>
                        <Text style={{ fontSize: 18, color: "#000" }}>Eat and Drunk</Text>
                        <Text style={{ fontSize: 18, color: "red" }}>Status : Expired</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                            style={styles.produkImage}
                            source={{
                                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                            }}
                        />
                        <View style={{ marginLeft: 10, justifyContent: "center" }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
                                Product 15
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                            >
                                Color : Blue
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                            >
                                Leaf Door: Leaf 1
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                            >
                                Rp.29.823.354
                            </Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "flex-end", marginLeft: 10 }}>
                            <Text>
                                1 Products
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: "700", color: "#000" }}>
                                Rp.29.823.354
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ borderWidth: 0.5, color: "gray", width: "100%" }}
                    />
                    <View style={styles.sectionRow}>
                        <Text style={{ fontSize: 18, color: "#000" }}>Total Payment</Text>
                        <Text style={{ fontSize: 18, color: "#000" }}>Rp.29.823.354</Text>
                    </View>
                </View>
            </View >
        </ScrollView >
    )
}


const styles = StyleSheet.create({

    h6: {
        fontSize: 16
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 0,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    container2: {
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
    },
    section: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        // justifyContent: "center"
    },
    input: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F18910",
        height: 40,
        borderRadius: 10,
        color: "black",
        // width: "90%"

    },
    searchBar: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#F18910",
        width: "90%",
        borderRadius: 10,
        marginTop: 10
    },
    container: {
        marginLeft: 20,
        width: "100%",
    },
    logo: {
        width: "90%",
        height: 125,
        borderRadius: 10,
        resizeMode: "cover",
    },
    categoryImage: {
        marginVertical: 10,
        width: 100,
        height: 100,
        resizeMode: "contain",
        backgroundColor: "#A6A6A6",
        borderRadius: 5
    },
    produkImage: {
        marginVertical: 20,
        width: "30%",
        height: 120,
        borderRadius: 10,
        resizeMode: "cover",
    },
    card: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "40%",
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
    sectionRow: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    }
})