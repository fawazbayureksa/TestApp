import { Image, StyleSheet, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RadioButton, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"
import { CurrencyFormat } from '../../components/CurrencyFormat';

export default function CheckoutPay({ route, navigation }) {

    const [value, setValue] = useState();
    const [grandTotal, setGrandTotal] = useState();
    const [qty, setQty] = useState()
    const [data, setData] = useState()

    const [platformFee, setPlatformFee] = useState(0)
    const [platformFeePercentage, setPlatformFeePercentage] = useState(null)
    const [grand_total_before_platform_fee, set_grand_total_before_platform_fee] = useState(0)

    const [config, setConfig] = useState()
    const [payment_method, set_payment_method] = useState()

    useEffect(() => {
        getMasterData()
    }, [])

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
            // console.log(response.data.data)
            if (!response.data.data.data || response.data.data.data.length === 0) {
                navigation.navigate("TransaksiList")
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

                //     this.setState({
                //         config: config,
                //         payment_method: payment_method,
                //         data: response.data.data.data,
                //         grand_total_before_platform_fee: grand_total,
                //         grand_total: grand_total,
                //         bank_accounts: response.data.data.bank_accounts,
                //         total_quantity: sumQty
                //     });
            }
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }

    // console.log(config)
    // console.log(payment_method.manual)

    // checkoutManual = (e) => {
    //     e.preventDefault();
    //     if (!this.state.data) return;
    //     if (!this.state.selected_manual_destination) return;

    //     let params = {
    //         mp_payment_id: this.state.data.id,
    //         mp_company_bank_account_id: this.state.selected_manual_destination
    //     }

    //     this.setState({ submitting: true })
    //     axios.post(`${process.env.REACT_APP_BASE_API_URL}checkout-pay/checkoutManual`, params, Config({
    //         Authorization: `Bearer ${Cookie.get('token')}`
    //     })).then(response => {
    //         SwalToast.fire({ icon: "success", title: response.data.message })
    //         this.props.history.push({ pathname: EcommerceRoutePath.AWAITING_PAYMENT.replace(":id", response.data.data) })
    //     }).catch(error => {
    //         console.log(error);
    //         if (error.response) {
    //             console.log(error.response);
    //             SwalToast.fire({ icon: "error", title: error.response.data.message })
    //         }
    //     }).finally(() => {
    //         this.setState({ submitting: false })
    //     });
    // }

    const regex = /<[^>]*>/mgi
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ marginTop: 10, fontSize: 18, marginLeft: 10, marginVertical: 10 }}>
                    Pilih Metode Pembayaran
                </Text>
                <View style={[styles.card, { width: "85%" }]}>
                    <View style={[styles.section, { alignItems: "center" }]}>
                        <RadioButton.Group
                            onValueChange={newValue => setValue(newValue)}
                            value={value}>
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
                            <Pressable onPress={() => navigation.navigate("CheckoutPay")} style={{ backgroundColor: "#F18910", height: 35, borderRadius: 5, marginTop: 10, justifyContent: "center", flex: 1, alignItems: "center" }} >
                                <Text style={{ fontSize: 20, color: "white" }}>
                                    Lanjutkan Membeli
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
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