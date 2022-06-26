import { TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"
import { CurrencyFormat } from '../../components/CurrencyFormat';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { navigate, navigationRef } from '../../navigator/RootNavigation';
import ModalDialog from '../../commons/Modal';
import { Alert } from 'react-native';

const SecondRoute = () => {
    const [data, setData] = useState();
    const [orderCode, setOrderCode] = useState();
    const [modalCancel, setModalCancel] = useState();

    useEffect(() => {
        getMasterData()
    }, [])

    const getMasterData = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `my-orders/get`

        await axios.get(url, {
            params: {
                status: "pending",
                length: 10
            },
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }).then(response => {
            setData(response.data.data.data)
        }).catch(error => {
            console.log(error);
        })
    }


    const handleModalCancel = (record) => {
        setModalCancel(true)
        // console.log(record.mp_payment_transactions[0].mp_transaction.order_code)
        setOrderCode(record?.mp_payment_transactions[0].mp_transaction.order_code)
    }

    const handleCancel = async (e) => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `my-orders/cancelOrder`
        await axios.post(url,
            {
                order_code: orderCode,
            },
            {
                headers: {
                    Origin: HOST,
                    Authorization: `Bearer ${jsonValue}`,
                }
            }).then(response => {
                closeModal()
                getMasterData()
            }).catch(error => {
                console.log(error)
                if (error.response) {
                    console.log(error.response)
                    if (error.response.data.message) {
                        Alert.alert(
                            "",
                            `${error.response.data.message}`,
                            [
                                { text: "OK" }
                            ]
                        )

                    }
                }
            })
    }


    return (
        <ScrollView>
            {data && data.map((item) => (
                <View style={styles.section} key={item?.id}>
                    <View style={[styles.card, { width: "95%" }]}>
                        <View style={styles.sectionRow}>
                            <Text style={{ fontSize: 18, color: "#000" }}>
                                {item?.mp_transaction_details[0]?.mp_transaction.mp_seller.name}
                            </Text>
                            <Text style={{ fontSize: 18, color: "#000" }}>
                                Status
                                <Text style={{ color: "red", marginLeft: 3 }}>
                                    : {
                                        item?.last_status?.status === "waiting_for_upload" ? "Unggah bukti bayar" :
                                            item?.last_status?.status === "waiting_approval" ? "Mengunggu Konfirmasi" :
                                                item?.last_status?.status
                                    }
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{ borderWidth: 0.5, color: "gray", width: "100%", marginTop: 10 }}
                        />
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Image
                                style={styles.produkImage}
                                source={{
                                    uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/${item?.mp_transaction_details[0].mp_transaction_product.mp_transaction_product_images[0].filename}`,
                                }}
                            />
                            <View style={{ marginLeft: 10, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
                                    {item?.mp_transaction_details[0].mp_transaction_product.mp_transaction_product_informations[0].name}
                                </Text>
                                {item?.mp_transaction_details[0]?.mp_transaction_product.mp_transaction_product_sku_variants.map((variant) => (
                                    <View key={variant.id}>
                                        <Text
                                            style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                        >
                                            {variant.name}: {variant.mp_transaction_product_sku_variant_option.name}
                                        </Text>
                                    </View>
                                ))}
                                <Text
                                    style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                >
                                    Rp.{CurrencyFormat(item?.mp_transaction_details[0].mp_transaction_product.mp_transaction_product_sku.price)}
                                </Text>
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 10, flex: 1 }}>
                                <Text style={{ textAlign: "right", alignSelf: "flex-end" }}>
                                    {item?.mp_transaction_details[0].quantity} Products
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#000", textAlign: "right", alignSelf: "flex-end" }}>
                                    Rp.{CurrencyFormat(item?.mp_transaction_details[0].grand_total)}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{ borderWidth: 0.5, color: "gray", width: "100%", marginBottom: 10 }}
                        />
                        <View style={styles.sectionRow}>
                            <Text style={{ fontSize: 18, color: "#000" }}>Total Payment</Text>
                            <Text style={{ fontSize: 18, color: "#000" }}>Rp.{CurrencyFormat(item?.mp_transaction_details[0].grand_total)}</Text>
                        </View>
                        {item?.last_status?.status === "pending" &&
                            <>
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => navigationRef.navigate("CheckoutPay", {
                                            invoice_number: item?.invoice_number
                                        })}
                                        style={{ borderWidth: 1, borderColor: "#F18910", width: "100%", padding: 5, borderRadius: 5 }}>
                                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", color: "#F18910" }}>
                                            Bayar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => handleModalCancel(item)}
                                        style={{ borderWidth: 1, borderColor: "red", width: "100%", padding: 5, borderRadius: 5 }}>
                                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", color: "red" }}>
                                            Batalkan Pesanan
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                        {item?.last_status?.status === "waiting_for_upload" &&

                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => navigationRef.navigate("awaitingPayments", {
                                        id: item?.mp_payment_destination.id
                                    })}
                                    style={{ borderWidth: 1, borderColor: "#F18910", width: "100%", padding: 5, borderRadius: 5 }}>
                                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", color: "#F18910" }}>
                                        Lanjutkan bayar
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        }
                    </View>
                </View >
            ))}
            <ModalDialog
                onShow={modalCancel}
                onHide={() => setModalCancel(false)}
                contentHeader={"Batalkan Pesanan"}
                contentText={
                    <View style={{ height: 100 }}>
                        <Text style={{ fontSize: 20, color: "#000" }}>Yakin batalkan Pesanan ?</Text>
                        <View style={[styles.sectionRow, { marginTop: 30 }]}>
                            <TouchableOpacity
                                onPress={() => setModalCancel(false)}
                                style={{ borderWidth: 1, borderColor: "#F18910", width: "45%", padding: 5, borderRadius: 5, height: 40, }}
                            >
                                <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>
                                    Kembali
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCancel}
                                style={{ backgroundColor: "#F18910", width: "45%", padding: 5, borderRadius: 5, height: 40 }}
                            >
                                <Text style={{ color: "#FFF", textAlign: "center", fontSize: 20 }}>
                                    Batalkan
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            >

            </ModalDialog >
        </ScrollView >
    )
};

const FirstRoute = () => {
    const [data, setData] = useState();

    useEffect(() => {
        getMasterData()
    }, [])

    const getMasterData = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `my-orders/get`

        await axios.get(url, {
            params: {
                status: "all",
                length: 10
            },
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }).then(response => {
            setData(response.data.data.data)
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <ScrollView>
            {data && data.map((item) => (
                <View style={styles.section} key={item?.id}>
                    <View style={[styles.card, { width: "95%" }]}>
                        <View style={styles.sectionRow}>
                            <Text style={{ fontSize: 18, color: "#000" }}>
                                {item?.mp_seller?.name}
                            </Text>
                            <Text style={{ fontSize: 18, color: "#000" }}>
                                Status
                                <Text style={{ color: "red", marginLeft: 3 }}>
                                    :
                                    {/* : {
                                        item?.last_status?.status === "waiting_for_upload" ? "Unggah bukti bayar" :
                                            item?.last_status?.status === "waiting_approval" ? "Mengunggu Konfirmasi" :
                                                !item?.last_status?.status ? item?.last_status?.mp_transaction_status_master_key : item?.last_status?.mp_transaction_status_master_key === "forwarded_to_seller" ? "Diteruskan ke seller" : item?.last_status?.mp_transaction_status_master_key
                                            } */}
                                    {item?.last_status?.mp_transaction_status_master_key === "forwarded_to_seller" ? "diteruskan ke seller" : item?.last_status?.mp_transaction_status_master_key}
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{ borderWidth: 0.5, color: "gray", width: "100%", marginTop: 10 }}
                        />
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Image
                                style={styles.produkImage}
                                source={{
                                    uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/${item?.mp_transaction_details[0].mp_transaction_product.mp_transaction_product_images[0].filename}`,
                                }}
                            />
                            <View style={{ marginLeft: 10, justifyContent: "center" }}>
                                <Text
                                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
                                    {item?.mp_transaction_details[0].mp_transaction_product.mp_transaction_product_informations[0].name}
                                </Text>
                                {item?.mp_transaction_details[0]?.mp_transaction_product.mp_transaction_product_sku_variants.map((variant) => (
                                    <View key={variant.id}>
                                        <Text
                                            style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                        >
                                            {variant.name}: {variant.mp_transaction_product_sku_variant_option.name}
                                        </Text>
                                    </View>
                                ))}
                                <Text
                                    style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                >
                                    Rp.{CurrencyFormat(item?.mp_transaction_details[0].mp_transaction_product.mp_transaction_product_sku.price)}
                                </Text>
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: 10, flex: 1 }}>
                                <Text style={{ textAlign: "right", alignSelf: "flex-end" }}>
                                    {item?.mp_transaction_details[0].quantity} Products
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#000", textAlign: "right", alignSelf: "flex-end" }}>
                                    Rp.{CurrencyFormat(item?.mp_transaction_details[0].grand_total)}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{ borderWidth: 0.5, color: "gray", width: "100%", marginBottom: 10 }}
                        />
                        <View style={styles.sectionRow}>
                            <Text style={{ fontSize: 18, color: "#000" }}>Total Payment</Text>
                            <Text style={{ fontSize: 18, color: "#000" }}>Rp.{CurrencyFormat(item?.mp_transaction_details[0].grand_total)}</Text>
                        </View>
                        {item?.last_status?.status === "pending" &&
                            <>
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => navigationRef.navigate("CheckoutPay", {
                                            invoice_number: item?.invoice_number
                                        })}
                                        style={{ borderWidth: 1, borderColor: "#F18910", width: "100%", padding: 5, borderRadius: 5 }}>
                                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", color: "#F18910" }}>
                                            Bayar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity style={{ borderWidth: 1, borderColor: "red", width: "100%", padding: 5, borderRadius: 5 }}>
                                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", color: "red" }}>
                                            Batalkan Pesanan
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                        {item?.last_status?.status === "waiting_for_upload" &&

                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => navigationRef.navigate("awaitingPayments", {
                                        id: item?.mp_payment_destination.id
                                    })}
                                    style={{ borderWidth: 1, borderColor: "#F18910", width: "100%", padding: 5, borderRadius: 5 }}>
                                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", color: "#F18910" }}>
                                        Lanjutkan bayar
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        }
                    </View>
                </View >
            ))}
        </ScrollView >
    )
};


const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});



export default function TransaksiList() {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Semua' },
        { key: 'second', title: 'Pending' },
    ]);

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );

}

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#F18910' }}
    />
);


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
        backgroundColor: "#A6A6A6"
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