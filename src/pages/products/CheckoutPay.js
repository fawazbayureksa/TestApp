import { Image, StyleSheet, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RadioButton, Text } from 'react-native-paper';
export default function CheckoutPay() {

    const [value, setValue] = useState('first');


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ marginTop: 10, fontSize: 18, marginLeft: 10, marginVertical: 10 }}>
                    Pilih Metode Pembayaran
                </Text>
                <View style={[styles.card, { width: "85%" }]}>
                    <View style={[styles.section, { alignItems: "center" }]}>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <RadioButton value="first" />
                        </RadioButton.Group>
                        <View style={styles.sectionRow}>
                            <Image
                                source={{
                                    uri: "https://vectorified.com/images/card-icon-4.png"
                                }}
                                style={styles.produkImage}
                            />
                        </View>
                        <View style={{ width: "70%", marginLeft: 80 }}>
                            <Text style={[styles.h6, { fontWeight: "700" }]}>
                                Transfer Bank Manual
                            </Text>
                            <Text style={[styles.h6]} >
                                Transfer ke Rekening Bank Perusahaan, Waktu Proses hingga 1x24 Jam Kerja
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Voucher Diskon */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>Ringkasan</Text>
                    {/* <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} /> */}
                    <View style={styles.sectionRow}>
                        <Text style={styles.h6}>
                            Total Harga
                        </Text>
                        <Text style={[styles.h6, { fontWeight: "700" }]}>
                            Rp.535.500
                        </Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text>
                            Biaya Kirim
                        </Text>
                        <Text>
                            Rp.0
                        </Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text>
                            Total Diskon
                        </Text>
                        <Text>
                            Rp.0
                        </Text>
                    </View>
                    <View style={{ borderWidth: 0.5, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={styles.sectionRow}>
                        <Text style={styles.h6}>
                            Total Harga
                        </Text>
                        <Text style={[styles.h6, { fontWeight: "700" }]}>
                            Rp.535.500
                        </Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.h6}>
                            Biaya Platform
                        </Text>
                        <Text style={[styles.h6, { fontWeight: "700" }]}>
                            Rp.535.500
                        </Text>
                    </View>
                    <View style={{ borderWidth: 0.5, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={styles.sectionRow}>
                        <Text style={styles.h6}>
                            Total Pembayaran
                        </Text>
                        <Text style={[styles.h6, { fontWeight: "700" }]}>
                            Rp.535.500
                        </Text>
                    </View>
                    <View>
                        <Pressable onPress={() => navigation.navigate("CheckoutPay")} style={{ backgroundColor: "#F18910", height: 35, borderRadius: 5, marginTop: 10, justifyContent: "center", flex: 1, alignItems: "center" }} >
                            <Text style={{ fontSize: 20, color: "white" }}>
                                Lanjutkan Membeli
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    },
    produkImage: {
        marginVertical: 20,
        width: 80,
        height: 80,
        resizeMode: "contain"
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