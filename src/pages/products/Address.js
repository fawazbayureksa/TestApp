import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export default function Address() {
    return (
        <View style={[styles.container, { marginTop: 10, width: "90%" }]}>
            <View style={styles.section}>
                <View style={[styles.card, { width: "100%" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.h6, { color: "#000", fontWeight: "700" }]}>
                            Nabila (Kantor) | 082394738
                        </Text>
                        <View style={{ backgroundColor: "#F18910", borderRadius: 5, padding: 5, marginLeft: 10 }}>
                            <Text style={{
                                color: "white",
                            }}>
                                default
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.h6, { color: "#000" }]}>
                        APL Tower
                    </Text>
                    <Text style={[styles.h6, { color: "#000" }]}>
                        Grogol Petamburan, Jakarta Barat, 11440
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                        <Pressable>
                            <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                UBAH
                            </Text>
                        </Pressable>
                        {/* <Pressable>
                            <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                Pilih Sebagai Alamat Default
                            </Text>
                        </Pressable> */}
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={[styles.card, { width: "100%" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.h6, { color: "#000", fontWeight: "700" }]}>
                            Nabila Ramadhani (kantor) | 082199738767
                        </Text>
                    </View>
                    <Text style={[styles.h6, { color: "#000" }]}>
                        Jl. Gatot Subroto No. 5
                    </Text>
                    <Text style={[styles.h6, { color: "#000" }]}>
                        Buahbatu, Kota Bandung, 15810
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                        <Pressable>
                            <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                UBAH
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                Pilih Sebagai Alamat Default
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={[styles.card, { width: "100%" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.h6, { color: "#000", fontWeight: "700" }]}>
                            Nabila Ramadhani (Rumah) | 081399990000
                        </Text>
                    </View>
                    <Text style={[styles.h6, { color: "#000" }]}>
                        Jl. Permata III Blok E No.10, Pekayon Jaya
                    </Text>
                    <Text style={[styles.h6, { color: "#000" }]}>
                        Bekasi Selatan, Kota Bekasi, 17148
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                        <Pressable>
                            <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                UBAH
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                Pilih Sebagai Alamat Default
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    h6: {
        fontSize: 16
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
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
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F18910",
        height: 40,
        borderRadius: 10,
        color: "black"

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
        marginLeft: 0,
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
    },
    produkImage: {
        marginVertical: 20,
        width: "30%",
        height: 135,
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