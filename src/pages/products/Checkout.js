import { View, StyleSheet, TextInput, Image, ScrollView, Button, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Select from 'react-native-picker-select';
import { Text } from 'react-native-paper';
import ModalDialog from '../../commons/Modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"
import IsEmpty from '../../commons/IsEmpty';
import { CurrencyFormat } from '../../components/CurrencyFormat';

export default function Checkout({ navigation }) {
    const [searchQuery, setSearchQuery] = useState()
    const [isSelected, setSelection] = useState(false);
    const [kurirList, setKurirList] = useState([])
    const [kurir, setKurir] = useState([
        { label: 'No Item', value: '1' },
    ])
    const [durasi, setDurasi] = useState([
        { label: 'No Item', value: '1' },
    ])
    const [modalVoucher, setModalVoucher] = useState(false)
    const [modalAddress, setModalAddress] = useState(false)
    const [data, setData] = useState([])
    const [address, setCostumerAddress] = useState()
    const [addressSelected, setCostumerAddressSelected] = useState()
    const [totalPrice, setTotalPrice] = useState();
    const [modalEditAdrress, setModalEditAddress] = useState(false)

    const onChangeSearch = (e) => {
        console.log(e)
    }

    useEffect(() => {
        getMasterData();
        calculateTotalPrice();
        getCustomerAddresses();
    }, []);


    const getMasterData = async () => {
        // console.log("cek");

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `checkout/getMasterData`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        )
            .then((response) => {
                if (!IsEmpty(response.data.data)) {
                    response.data.data.data.map((item) => {
                        setData(item.carts)
                        setKurirList(
                            item.couriers.map((kurir) =>
                            ({
                                value: kurir.key,
                                label: kurir.name
                            })
                            )
                        );

                    })
                } else {
                    console.log("Cart Kosong")
                }
            }).catch(error => {
                console.log(error)

            })
    }

    const setDefaultAddress = async (id) => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))
        // console.log(id)

        // return

        let url = API_URL + `profile/address/setDefault`
        let data = {
            mp_customer_address_id: id
        }
        await axios.post(url, data,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        ).then(res => {
            Alert.alert(
                "",
                "Berhasil Ganti Alamat",
                [
                    { text: "OK" }
                ]
            )
            console.log(res)
            setModalEditAddress(false)
            setModalAddress(false)
            getCustomerAddresses()
        }).catch((error) => {
            console.log(error)
        })
    }


    const getCustomerAddresses = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `profile/address/get`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        ).then(response => {
            let address_selected = null;
            response.data.data.forEach(value => {
                if (value.is_main === true) address_selected = value;
            });
            // console.log(address_selected);
            setCostumerAddressSelected(address_selected)
            setCostumerAddress(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }


    const calculateTotalPrice = () => {
        let total_price = 0

        for (const datum of data) {
            // console.log(datum.mp_product_sku.price)
            total_price += datum.mp_product_sku.price * datum.quantity
        }
        setTotalPrice(total_price)

    }

    console.log(totalPrice)


    const handleChangeKurir = (value) => {
        console.log(value)
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
                                {addressSelected?.receiver_name}  ({addressSelected?.address_name}) | {addressSelected?.receiver_phone}
                            </Text>
                            <Text style={styles.h6}>
                                {addressSelected?.address}
                            </Text>
                            <Text style={styles.h6}>
                                {`${addressSelected?.subdistrict} , ${addressSelected?.city} ,${addressSelected?.province}`}
                                {/* Grogol Petamburan, Jakarta Barat, 11440 */}
                            </Text>
                            <Text style={styles.h6}>
                                {addressSelected?.postal_code}
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
                        <TouchableOpacity
                            // onPress={() => navigation.navigate("Address")}
                            onPress={() => setModalAddress(true)}
                        >
                            <Text style={{ textAlign: "center", fontSize: 18 }}>
                                Pilih alamat lain
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Pesanan Anda */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16 }}>Pesanan anda</Text>
                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={[styles.section, { justifyContent: "space-between" }]}>
                        {data && data.map((item) => {
                            // console.log("item", item.)
                            return (
                                <View style={[styles.section, { justifyContent: "space-between" }]} key={item.id}>
                                    <Image
                                        style={styles.categoryImage}
                                        source={{
                                            uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${item.mp_product.mp_product_images[0].filename}`
                                        }}
                                    />
                                    <Text style={{ alignSelf: "center", width: 150, textAlign: "center" }} >
                                        {item.mp_product.slug_name}
                                    </Text>
                                    <View style={{ alignSelf: "center" }}>
                                        <Text style={{ fontWeight: "500" }}>
                                            {item.quantity} Pcs
                                        </Text>
                                        <Text style={{ fontWeight: "700" }}>
                                            Rp.{CurrencyFormat(item.quantity * item.mp_product_sku.price)}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
                {/* Metode Pengiriman  */}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16 }}>Metode Pengiriman</Text>
                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                    <View style={[styles.section, { justifyContent: "space-between", flexDirection: "column" }]}>
                        <View style={pickerSelectStyles.inputAndroid}>
                            <Select
                                onValueChange={(value) => handleChangeKurir(value)}
                                items={kurirList}
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
                            Rp{CurrencyFormat(totalPrice)}
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
                            Rp.{CurrencyFormat(totalPrice)}
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
                onShow={modalEditAdrress}
                onHide={() => setModalEditAddress(false)}
                contentHeader={"Ganti Alamat"}
                contentText={
                    <Text style={{ fontSize: 16, color: "black" }}>
                        test
                    </Text>
                }
            />
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
                    <ScrollView style={{}}>
                        {address && address.map((item) => {
                            return (
                                <View style={[styles.section]} key={item.id}>
                                    <View style={[styles.card, { width: "100%" }]}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={[styles.h6, { color: "#000", fontWeight: "700" }]}>
                                                {item.receiver_name} ({item?.address_name}) | {item.receiver_phone}
                                            </Text>
                                            {item.is_main === true &&
                                                <View style={{ backgroundColor: "#F18910", borderRadius: 5, padding: 5, marginLeft: 10 }}>
                                                    <Text style={{
                                                        color: "white",
                                                    }}>
                                                        default
                                                    </Text>
                                                </View>
                                            }
                                        </View>
                                        <Text style={[styles.h6, { color: "#000" }]}>
                                            {item.address}
                                        </Text>
                                        <Text style={[styles.h6, { color: "#000" }]}>
                                            {`${item.subdistrict} , ${item.city} ,${item.province}`}
                                        </Text>
                                        <Text style={[styles.h6, { color: "#000" }]}>
                                            {item.postal_code}
                                        </Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { setModalEditAddress(true), setModalAddress(false) }}>
                                                <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                                    UBAH
                                                </Text>
                                            </TouchableOpacity>
                                            {item.is_main === false &&
                                                <TouchableOpacity onPress={() => setDefaultAddress(item.id)}>
                                                    <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                                        Pilih Sebagai Alamat Default
                                                    </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
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
        backgroundColor: "#A6A6A6",
        borderRadius: 5
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