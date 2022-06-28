import { Image, StyleSheet, View, Pressable, TouchableOpacityBase, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RadioButton, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"
import { CurrencyFormat } from '../../components/CurrencyFormat';
import ModalDialog from '../../commons/Modal';

export default function CheckoutPay({ route, navigation }) {

    const [value, setValue] = useState();
    const [grandTotal, setGrandTotal] = useState();
    const [qty, setQty] = useState()
    const [data, setData] = useState()
    const [bankAccount, setBankAccount] = useState([])
    const [platformFee, setPlatformFee] = useState(0)
    const [platformFeePercentage, setPlatformFeePercentage] = useState(null)
    const [grand_total_before_platform_fee, set_grand_total_before_platform_fee] = useState(0)

    const [config, setConfig] = useState()
    const [payment_method, set_payment_method] = useState()

    const [modal, setModal] = useState()

    useEffect(
        () => {
            getMasterData()
        }, []
    )

    const getMasterData = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `checkout-pay/getMasterData`

        await axios.get(url, {
            params: {
                invoice_number: route.params.invoice_number,
            },
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }).then(response => {

            if (!response.data.data.data || response.data.data.data.length === 0) {
                return navigation.navigate("awaitingPayments")
            } else {

                let config = JSON.parse(response.data.data.config) || {};

                let payment_method = {}
                for (const item of JSON.parse(response.data.data.payment_method).value) {
                    payment_method[item.key] = item
                }

                let sumQty = 0
                let grand_total = 0
                for (const datum of response.data.data.data.mp_payment_transactions) {
                    grand_total += datum.mp_transaction.grand_total
                    for (const detail of datum.mp_transaction.mp_transaction_details) {
                        sumQty += detail.quantity
                    }
                }
                setData(response.data.data.data)
                setQty(sumQty)
                setGrandTotal(grand_total)
                set_grand_total_before_platform_fee(grand_total)
                set_payment_method(payment_method)
                setConfig(config)
                setBankAccount(response.data.data.bank_accounts)

            }
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }


    const checkoutManual = async (bankId) => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let params = {
            mp_payment_id: data.id,
            mp_company_bank_account_id: bankId
        }

        // console.log(params)

        await axios.post(API_URL + `checkout-pay/checkoutManual`, params,
            {
                headers: {
                    "Origin": "http://localhost:3002/",
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }).then(response => {
                console.log(response.data.data)
                // navigation.navigate("awaitingPayments", {
                //     id: response.data.data.id
                // })
            }).catch(error => {
                console.log(error.response.data.message);
                if (error.response.data.message === "Payment status isn't pending!") {
                    console.log("Silahkan lakukan pembayaran")
                    Alert.alert(
                        "",
                        "Silahkan lakukan pembayaran",
                        [
                            { text: "OK" }
                        ]
                    )
                    navigation.navigate("TransactionList")
                }
            })
    }

    const regex = /<[^>]*>/mgi

    const paymentMethodChange = (key) => {
        if (value === key) {
            setValue()
        }
        else {
            setValue(key)
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ marginTop: 10, fontSize: 18, marginLeft: 10, marginVertical: 10 }}>
                    Pilih Metode Pembayaran
                </Text>
                <View style={[styles.card, { width: "85%" }]}>
                    <View style={[styles.section, { alignItems: "center" }]}>
                        <RadioButton
                            value="first"
                            status={value === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => paymentMethodChange('first')}
                        />
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
                                {payment_method?.manual.title}
                            </Text>
                            <Text style={[styles.h6]} >
                                {payment_method?.manual.description.replace(regex, "")}
                            </Text>
                        </View>
                    </View>
                </View>
                {data && data.mp_payment_transactions.map((item) => (
                    <View style={[styles.card, { width: "87%" }]} key={item.id}>
                        <Text style={{ fontSize: 16, fontWeight: "700" }}>Ringkasan</Text>
                        <View style={styles.sectionRow}>
                            <Text style={styles.h6}>
                                Total Harga
                            </Text>
                            <Text style={[styles.h6]}>
                                Rp.{CurrencyFormat(item.mp_transaction.price)}
                            </Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text>
                                Biaya Kirim
                            </Text>
                            <Text style={styles.h6}>
                                Rp.{CurrencyFormat(item.mp_transaction.shipping_fee)}
                            </Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text>
                                Total Diskon
                            </Text>
                            <Text>
                                Rp.{CurrencyFormat(item.mp_transaction.discount)}
                            </Text>
                        </View>
                        <View style={{ borderWidth: 0.5, color: "#A6A6A6", marginVertical: 10 }} />
                        <View style={styles.sectionRow}>
                            <Text style={styles.h6}>
                                Total Harga
                            </Text>
                            <Text style={[styles.h6, { fontWeight: "700" }]}>
                                Rp.{CurrencyFormat(grand_total_before_platform_fee)}
                            </Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text style={styles.h6}>
                                Biaya Platform
                            </Text>
                            <Text style={[styles.h6, { fontWeight: "700" }]}>
                                Rp.{CurrencyFormat(platformFee)}
                            </Text>
                        </View>
                        <View style={{ borderWidth: 0.5, color: "#A6A6A6", marginVertical: 10 }} />
                        <View style={styles.sectionRow}>
                            <Text style={styles.h6}>
                                Total Pembayaran
                            </Text>
                            <Text style={[styles.h6, { fontWeight: "700" }]}>
                                Rp.{CurrencyFormat(grandTotal)}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setModal(true)} style={{ backgroundColor: "#F18910", height: 35, borderRadius: 5, marginTop: 10, justifyContent: "center", flex: 1, alignItems: "center" }} >
                                <Text style={{ fontSize: 20, color: "white" }}>
                                    Lanjutkan Membeli
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <ModalDialog
                    onShow={modal}
                    onHide={() => setModal(false)}
                    contentHeader={"Select Manual Bank Transfer"}
                    contentText={
                        <ScrollView>
                            {bankAccount && bankAccount.map((item) => (
                                <View style={[styles.card, { width: "95%" }]} key={item.id}>
                                    <TouchableOpacity onPress={() => checkoutManual(item.id)}>
                                        <View style={[styles.section, { alignItems: "center" }]}>
                                            <View style={styles.sectionRow}>
                                                {item.mp_bank.name === "BCA" ?
                                                    <Image
                                                        source={{
                                                            uri: `https://mpng.subpng.com/20180802/lcs/kisspng-bank-central-asia-logo-bca-finance-business-logo-bank-central-asia-bca-format-cdr-amp-pn-5b63687e470088.3520223915332414702908.jpg`
                                                        }}
                                                        style={styles.produkImage}
                                                    />
                                                    :
                                                    <Image
                                                        source={{
                                                            uri: `https://rekreartive.com/wp-content/uploads/2019/04/Logo-BRI-Bank-Rakyat-Indonesia-PNG-Terbaru.png`
                                                        }}
                                                        style={styles.produkImage}
                                                    />
                                                }
                                            </View>
                                            <View style={{ width: "70%", marginLeft: 100 }}>
                                                <Text style={[styles.h6, { fontWeight: "700" }]}>
                                                    {item.mp_bank.name}
                                                </Text>
                                                <Text style={[styles.h6]} >
                                                    {item.account_name}
                                                </Text>
                                                <Text style={[styles.h6]} >
                                                    {item.account_number}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    }
                ></ModalDialog>
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
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
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