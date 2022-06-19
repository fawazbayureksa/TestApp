import { View, StyleSheet, TextInput, Image, ScrollView, Button, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Select from 'react-native-picker-select';
import { Text } from 'react-native-paper';
import ModalDialog from '../../commons/Modal';


export default function Checkout({ navigation }) {
    const [searchQuery, setSearchQuery] = useState()
    const [isSelected, setSelection] = useState(false);
    const [kurir, setKurir] = useState([
        { label: 'Anter Aja', value: '1' },
        { label: 'Gosend', value: '2' },
        { label: 'ID Express', value: '3' },
        { label: 'JNE', value: '4' },
        { label: 'J&T Express', value: '5' },
        { label: 'Pos Indonesia', value: '6' },
    ])
    const [durasi, setDurasi] = useState([
        { label: 'No Item', value: '1' },
    ])
    const [modalVoucher, setModalVoucher] = useState(false)
    const [modalAddress, setModalAddress] = useState(false)

    const onChangeSearch = (e) => {
        console.log(e)
    }





    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                <Text style={{ marginTop: 10, fontSize: 18, marginLeft: 10, marginVertical: 10 }}>
                    Checkout
                </Text>
                {/* Alamat Saya */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16 }}>Alamat Pengiriman</Text>
                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={[styles.section, { justifyContent: "space-between" }]}>
                        <View>
                            <Text style={[styles.h6, { fontWeight: "600" }]}>
                                Nabila (Kantor) | 0823663282
                            </Text>
                            <Text style={styles.h6}>
                                APL Tower
                            </Text>
                            <Text style={styles.h6}>
                                Grogol Petamburan, Jakarta Barat, 11440
                            </Text>
                        </View>
                        <View>
                            <Pressable>
                                <Text style={{ color: "#F18910", fontSize: 16, marginLeft: -10 }}>
                                    Ubah
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: "#F18910", padding: 10, borderRadius: 10, marginTop: 10 }}>
                        <Pressable onPress={() => navigation.navigate("Address")}>
                            <Text style={{ textAlign: "center", fontSize: 18 }}>
                                Pilih alamat lain
                            </Text>
                        </Pressable>
                    </View>
                </View>
                {/* Pesanan Anda */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16 }}>Pesanan anda</Text>
                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={[styles.section, { justifyContent: "space-between" }]}>

                        <View style={[styles.section, { justifyContent: "space-between" }]}>
                            <Image
                                style={styles.categoryImage}
                                source={{
                                    uri: "https://tsi-3.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/c4fcb239-b497-11ec-b9ff-00163c71e1f6.jpg"
                                }}
                            />
                            <Text style={{ alignSelf: "center", width: 150 }} >
                                upor Wajan HO7011-3 Spear Series
                            </Text>
                            <View style={{ alignSelf: "center" }}>
                                <Text style={{ fontWeight: "500" }}>
                                    2 Pcs
                                </Text>
                                <Text style={{ fontWeight: "700" }}>
                                    Rp.600.000
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Metode Pengiriman  */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16 }}>Metode Pengiriman</Text>
                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={[styles.section, { justifyContent: "space-between", flexDirection: "column" }]}>
                        <View style={pickerSelectStyles.inputAndroid}>
                            <Select
                                onValueChange={(value) => console.log(value)}
                                items={kurir}
                                placeholder={{ label: "Pilih Kurir", value: null }}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <View style={pickerSelectStyles.inputAndroid}>
                            <Select
                                onValueChange={(value) => console.log(value)}
                                items={durasi}
                                placeholder={{ label: "Pilih Durasi Pengiriman", value: null }}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                </View>
                {/* Voucher Diskon */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>Voucher Diskon</Text>
                    <Pressable onPress={() => setModalVoucher(true)}>
                        <Text style={{ fontSize: 16, textAlign: "center", color: "#F18910", marginVertical: 10 }}>Mau voucher lain ?</Text>
                    </Pressable>
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
            </View >
            <ModalDialog
                onShow={modalVoucher}
                onHide={() => setModalVoucher(false)}
                contentHeader={"Pilih Voucher"}
                contentText={
                    <Text style={{ fontSize: 16, color: "black" }}>

                    </Text>
                }
            />
            <ModalDialog
                onShow={modalAddress}
                onHide={() => setModalAddress(false)}
                contentHeader={"Pilih Alamat Pengiriman"}
                contentText={
                    <Text style={{ fontSize: 16, color: "black" }}>

                    </Text>
                }
            />
        </ScrollView >
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginTop: 10,
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderWidth: 1,
        borderColor: '#F18910',
        borderRadius: 8,
        color: 'black',
        width: "100%",
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});

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