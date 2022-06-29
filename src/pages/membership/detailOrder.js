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
import moment from 'moment';
import { DateTimeFormat } from '../../components/DatetimeFormat';

export default function DetailOrder({ navigation, route }) {


    const [data, setData] = useState()


    useEffect(() => {
        getDetailOrder()
    }, [])

    const getDetailOrder = async () => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        axios.get(API_URL + `my-orders/getPaymentDetail/${route.params.invoice}`,
            {
                headers: {
                    Origin: HOST,
                    Authorization: `Bearer ${jsonValue}`,
                }
            }).then(response => {
                // setData(response.data.data)
                let data = response.data.data
                // data.mp_transaction_details.forEach(detail => {
                //     if (detail.mp_transaction_product.type === "bundling") {
                //         detail.bundlings.forEach(bundling => {
                //             bundling.sku = JSON.parse(bundling.sku)
                //         })
                //     }
                // });
                // data.courier.mp_transaction_courier_statuses.forEach(detail => {
                //     if (detail.data) detail.data = JSON.parse(detail.data)
                //     else detail.data = []
                // })
                // console.log('trans detail', data);
                setData(data)
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <ScrollView>
            <Text style={{ fontSize: 20, marginLeft: 10, color: "#F18910", marginTop: 10, fontWeight: "700" }}>Produk List</Text>
            <View style={[styles.card, { width: "95%" }]}>
                {data && data?.mp_payment_transactions.map((item) => {
                    return (
                        <View key={item.id}>
                            <View style={[styles.section, { justifyContent: "space-between" }]}>
                                <Text style={styles.h6}>{item.mp_transaction.mp_seller.name}</Text>
                                <Text style={styles.h6}>{data?.invoice_number}</Text>
                            </View>
                            <View style={{ borderWidth: 0.5, color: "#A6A6A6", marginVertical: 10 }} />
                            {item.mp_transaction.mp_transaction_details.map((item) => (
                                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }} key={item.id}>
                                    <Image
                                        style={styles.categoryImage}
                                        source={{
                                            uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${item.mp_transaction_product.mp_transaction_product_images[0].filename}`
                                        }}
                                    />
                                    < Text style={{ alignSelf: "center", textAlign: "center" }} >
                                        x {item.quantity}
                                    </Text >
                                    < Text style={{ alignSelf: "center", textAlign: "center" }} >
                                        Rp {CurrencyFormat(item.total_price)}
                                    </Text >
                                </View>
                            ))}
                            <View style={{ borderWidth: 0.2, color: "#A6A6A6", marginVertical: 20 }} />
                            <View style={[styles.section, { justifyContent: "space-between" }]}>
                                <Text style={styles.h6}>Total Product Price</Text>
                                <Text style={styles.h6}>Rp.{CurrencyFormat(item.mp_transaction.price)}
                                </Text>
                            </View>
                            <View style={[styles.section, { justifyContent: "space-between" }]}>
                                <Text style={styles.h6}>Total Shipping Fee</Text>
                                <Text style={styles.h6}>Rp.{CurrencyFormat(item.mp_transaction.shipping_fee)}</Text>
                            </View>
                            <View style={[styles.section, { justifyContent: "space-between" }]}>
                                <Text style={styles.h6}>Total Discount</Text>
                                <Text style={styles.h6}>Rp.{CurrencyFormat(item.mp_transaction.discounts)}</Text>
                            </View>
                            <View style={{ borderWidth: 0.2, color: "#A6A6A6", marginVertical: 10 }} />
                            <View style={[styles.section, { justifyContent: "space-between" }]}>
                                <Text style={styles.h6}>Total</Text>
                                <Text style={styles.h6}>Rp.{CurrencyFormat(item.mp_transaction.total_price)}</Text>
                            </View>
                        </View>
                    )
                })}
            </View >
            <Text style={{ fontSize: 20, marginLeft: 10, color: "#F18910", marginTop: 10, fontWeight: "700" }}>Status Pembayaran</Text>
            <View style={[styles.card, { width: "95%", paddingHorizontal: 30 }]}>
                {data && data?.mp_payment_statuses.map((item) => {
                    // console.log(item.status)
                    return (
                        <View style={[styles.section, { justifyContent: "space-between", alignItems: "center" }]} key={item.id}>
                            <Text style={styles.h6}>Customer</Text>
                            <View style={{ width: "70%" }}>
                                <Text style={[styles.h6, { padding: 10, color: "red" }]}>{item.status == "waiting_for_upload" ? "Menunggu unggah bukti bayar" : item.status === "waiting_approval" ? "Menunggu persetujuan" : item.status == "cancelled" ? "Dibatalkan" : item.status == "rejected" ? "Pembayaran ditolak" : item.status}
                                </Text>

                                <Text style={[styles.h6, { marginLeft: 10 }]}>
                                    {item.notes}
                                </Text>
                                <Text style={[styles.h6, { marginLeft: 10 }]}>
                                    {moment(item.created_at).format("DD/MM/YYYY - h:m:s")}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            {/* {console.log(data?.mp_payment_statuses.map((item) => item.status))} */}
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
        backgroundColor: "#F6F6F6",
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