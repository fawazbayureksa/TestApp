import { View, StyleSheet, TextInput, Image, ScrollView, Button, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Select from 'react-native-picker-select';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import IsEmpty from '../../commons/IsEmpty';
import { CurrencyFormat } from '../../components/CurrencyFormat';
import { API_URL, HOST } from "@env"

export default function Cart({ navigation }) {
    const [searchQuery, setSearchQuery] = useState()
    const [isSelected, setSelection] = useState();
    const [category, setCategory] = useState([
        { label: 'Produk', value: 'produk' },
        { label: 'Seller', value: 'seller' },
        { label: 'Article', value: 'article' },
    ])
    const [totalPrice, setTotalPrice] = useState();
    const [qty, setQty] = useState(1)
    const [idCart, setIdCart] = useState([])
    const [data, setData] = useState([])
    const onChangeSearch = (e) => {
        console.log(e)
    }

    useEffect(() => {
        getCart();
        calculateTotalPrice()
    }, []);



    const getCart = async () => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `cart/get`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        )
            .then((response) => {
                if (!IsEmpty(response.data.data)) {
                    setData(response.data.data)
                }
            }).catch(error => {
                console.log(error)

            })
    }

    const deleteCart = async () => {
        if (IsEmpty(idCart)) {
            Alert.alert(
                "",
                "Pilih produk yang ingin dihapus terlebih dahulu",
                [
                    { text: "OK" }
                ]
            )
            return
        }

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let data = {
            cart_ids: idCart
        }
        let config = {
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }
        await axios.post(API_URL + `cart/delete-by-ids`, data, config
        ).then(response => {
            getCart()
            setIdCart()
            Alert.alert(
                "",
                "Berhasil Hapus Product",
                [
                    { text: "OK" }
                ]
            )
        }).catch(error => {
            console.log(error.response.data.message)
        })

    }


    const checkSingleCheckbox = async (value1, index, key) => {
        // console.log(value1.id)
        let cart = []
        // data.map((item) => {
        //     // console.log(item.carts[index])
        //     cart = item.carts.findIndex(value => value.id === value1.id)
        //     // console.log(cart.is_selected)
        //     // console.log(item.carts.find(value => value.id === value1.id))
        // })

        data[index].carts[key].is_selected = false
        console.log(data[index].carts[key].is_selected)
        // console.log(data[index].carts[key])
        // console.log(data.find(value2 => value2.id === value1.id))
    }

    const handleCheckbox = (value1) => {
        if (idCart.find(value2 => value2 === value1.id)) {
            idCart.splice(idCart.findIndex(value2 => value2 === value1.id), 1);
            setSelection(isSelected === true ? false : true)
            setTotalPrice(0)
            console.log(idCart)
        } else {
            const listId = [...idCart]
            listId.push(value1.id)
            setIdCart(listId)
            setSelection(isSelected === true ? false : true)
            calculateTotalPrice()
            console.log(listId)
        }
    }



    const calculateTotalPrice = () => {
        let total_price = 0

        for (const datum of data) {
            for (const cart of datum.carts) {
                total_price += cart.mp_product_sku.price * cart.quantity
            }
        }
        setTotalPrice(total_price)
    }


    const submitCart = async () => {

        if (IsEmpty(idCart)) {
            Alert.alert(
                "",
                "Pilih produk yang ingin beli terlebih dahulu",
                [
                    { text: "OK" }
                ]
            )
            return
        }

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"));

        let data = {
            cart_ids: idCart,
            lang: "id"
        }
        let config = {
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }

        await axios.post(API_URL + `cart/submit`, data, config).then(response => {
            navigation.navigate("Checkout")
        }).catch(error => {
            console.log(error.message)
        });
    }


    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                {/* Search Form */}
                <View style={styles.searchBar}>
                    <View style={{ width: "40%" }}>
                        <Select
                            onValueChange={(value) => console.log(value)}
                            items={category}
                        // placeholder={category}
                        />
                    </View>
                    <TextInput
                        onChangeText={(e) => onChangeSearch(e)}
                        value={searchQuery}
                        placeholder="Cari .."
                    />
                </View>
                {/* Content */}
                <View>
                    <Text style={{ marginTop: 10, fontSize: 18 }}>
                        Keranjang Saya
                    </Text>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Pilih Semua</Text>
                    </View>
                </View>
                {data.length === 0 ?

                    <View style={{ justifyContent: "center", alignItems: "center", height: 500 }}>
                        <Text style={{ fontSize: 20, color: "#F18910", fontWeight: "700" }}>
                            Keranjang Kosong
                        </Text>
                    </View>
                    : data.map((item, index) => (
                        <View style={[styles.section]} key={index}>
                            <View style={[styles.card, { width: "87%" }]}>
                                <View style={styles.checkboxContainer}>
                                    {/* <CheckBox
                                        value={isSelected}
                                        onValueChange={() => setSelection(isSelected === true ? false : true)}
                                        style={styles.checkbox}
                                    /> */}
                                    <Text
                                        style={[
                                            styles.label,
                                            { fontSize: 16, fontWeight: "500" }]}
                                    >
                                        {item.seller.name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 1,
                                        marginTop: -20
                                    }}
                                />
                                {item.carts.map((cart, key) => {
                                    return (
                                        <View key={cart.id}>
                                            <View style={styles.checkboxContainer}>
                                                {/* <TouchableOpacity style={styles.checkbox} onPress={() => handleCheckbox(cart, index, key)}> */}
                                                <CheckBox
                                                    value={isSelected}
                                                    onValueChange={() => handleCheckbox(cart)}
                                                    style={styles.checkbox}
                                                />
                                                {/* </TouchableOpacity> */}
                                                <Image
                                                    style={styles.produkImage}
                                                    source={{
                                                        uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${cart.mp_product.mp_product_images[0].filename}`
                                                    }}
                                                />
                                                <View style={{ width: "30%", alignSelf: "center", marginLeft: 20 }}>
                                                    <Text style={{ fontSize: 20 }}>
                                                        {cart.mp_product.slug_name}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, fontWeight: "700" }}>
                                                        Rp{CurrencyFormat(cart.mp_product_sku.price)}
                                                    </Text>
                                                </View>
                                                <View style={{ alignSelf: "center", marginLeft: 20 }}>
                                                    <View style={[styles.sectionRow, { justifyContent: "center", alignItems: "center" }]}>
                                                        <Icon size={32} name="favorite-outline" color="#F18910" />
                                                        <TouchableOpacity
                                                            onPress={deleteCart}
                                                        >
                                                            <View>
                                                                <Icon size={32} color="#F18910" name="delete" />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "flex-end" }}>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: "#F18910",
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: 50
                                                    }}
                                                    // disabled={qty === 1}
                                                    disabled={true}
                                                    onPress={() => setQty(qty - 1)}
                                                >
                                                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={{
                                                    marginHorizontal: 20, fontSize: 20, textDecorationLine: "underline"
                                                }}
                                                >
                                                    {cart.quantity}
                                                </Text>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: "#F18910",
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: 50
                                                    }}
                                                    disabled={true}
                                                    onPress={() => setQty(qty + 1)}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#FFF",
                                                            fontSize: 20,
                                                            fontWeight: "700"
                                                        }}
                                                    >
                                                        +
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text style={{ color: "red", marginLeft: 10, width: "30%" }}>
                                                    Barang hampir habis!
                                                </Text>
                                                <Text style={{ fontSize: 16, fontWeight: "700", marginLeft: 10 }}>
                                                    Rp{CurrencyFormat(cart.quantity * cart.mp_product_sku.price)}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })}

                            </View>
                        </View>
                    ))}
                <View style={[styles.card, { width: "87%" }]}>
                    <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>Ringkasan</Text>
                    <View style={styles.sectionRow}>
                        <Text>
                            Total Harga
                        </Text>
                        <Text>
                            Rp.{CurrencyFormat(totalPrice)}

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
                        <Text style={{ fontWeight: "700" }}>
                            Total Pembayaran
                        </Text>
                        <Text style={{ fontWeight: "700" }}>
                            Rp.{CurrencyFormat(totalPrice)}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F18910",
                                height: 40,
                                borderRadius: 50,
                                marginTop: 10,
                                justifyContent: "center",
                                flex: 1,
                                alignItems: "center"
                            }}
                            onPress={submitCart}
                        >
                            <Text style={{ fontSize: 20, color: "white" }}>
                                Beli
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ScrollView >
    )
}

const styles = StyleSheet.create({
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
        flexWrap: "wrap",
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
        width: "30%",
        height: 100,
        resizeMode: "cover",
    },
    produkImage: {
        marginVertical: 20,
        width: "30%",
        height: 100,
        resizeMode: "contain",
        backgroundColor: "#F6F6F6",
        borderRadius: 5
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