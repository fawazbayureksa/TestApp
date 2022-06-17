import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import InfromationProduct from './InfromationProduct';
import UlasanProduct from './UlasanProduct';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PriceRatio from '../../components/PriceRatio';
import { CurrencyFormat } from '../../components/CurrencyFormat';

const renderScene = SceneMap({
    first: InfromationProduct,
    second: UlasanProduct,
});


const DetailProduct = ({ route, navigation }) => {

    const baseUrl = `https://api-cms.degadai.id/api/`;
    const layout = useWindowDimensions();
    const [dataDetail, setDataDetail] = useState([])
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);
    const [item, setItem] = useState(1)

    const [total, setTotal] = useState()

    useEffect(() => {
        getDataProductDetail()
    }, [])

    const getDataProductDetail = async () => {
        await axios.get(baseUrl + `ecommerce/product/find?seller_slug=${route.params.seller_slug}&product_slug=${route.params.product_slug}`,
            {
                headers: {
                    "Origin": "http://localhost:3002/",
                }
            }
        )
            .then(response => {
                setDataDetail(response.data.data.detail)
                // console.log(response.data.data.detail)
            }).catch(error => {
                console.log(error)

            })
    }

    // console.log(route.params.seller_slug)
    // console.log(route.params.product_slug)

    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            {dataDetail.length > 0 &&
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.produkImage}
                            source={{
                                uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${dataDetail.mp_product_images[0].filename}`
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        {dataDetail.mp_product_images.map((image, index) => (
                            <View key={index}>
                                <Image
                                    style={styles.produkImageDetails}
                                    source={{
                                        uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${image.filename}`
                                    }}
                                />
                            </View>
                        ))}
                        {/* 
                                <Image
                                    style={styles.produkImageDetails}
                                    source={{
                                        uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/568253ce-e6fc-11ec-a77b-00163c303764.jpg"
                                    }}
                                />
                                <Image
                                    style={styles.produkImageDetails}
                                    source={{
                                        uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/5ed66981-e6fc-11ec-a77b-00163c303764.jpg"
                                    }}
                                /> 
                                */}
                    </View>
                    <View >
                        <Text style={{ fontSize: 18, color: "black", marginBottom: 5 }}>
                            {dataDetail?.mp_product_informations[0]?.name}
                        </Text>
                        <View style={[styles.section]}>
                            <Icon name='check-circle' size={24} color="#F18910" />
                            <Text
                                style={{ fontSize: 16, color: "gray", marginLeft: 5, fontWeight: "500", marginBottom: 10 }}>
                                {dataDetail?.mp_seller.name} | Terjual {dataDetail?.sold_product} |
                            </Text>
                            <Icon size={24} color="#F18910" name="star-border" />
                            <Text
                                style={{ fontSize: 16, color: "gray", marginLeft: 5, fontWeight: "500", marginBottom: 10 }}
                            >
                                Rating {dataDetail?.rating ? dataDetail?.rating : "-"} ({dataDetail?.mp_product_ratings[0].count} Ulasan)
                            </Text>
                        </View>

                        <View
                            style={{
                                dispaly: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                            <Text
                                style={{
                                    backgroundColor: "#F18910",
                                    color: "white",
                                    // width: "10%",
                                    padding: 5,
                                    borderRadius: 5,
                                    fontSize: 16,
                                }}>
                                {PriceRatio(dataDetail?.mp_product_skus.find(value1 => value1.is_main).normal_price, dataDetail?.mp_product_skus.find(value1 => value1.is_main).price)}

                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 18,
                                    color: "black",
                                    marginLeft: 10,
                                    textDecorationLine: "line-through"
                                }}>
                                Rp.{CurrencyFormat(dataDetail?.mp_product_skus.find(value1 => value1.is_main).normal_price)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "black",
                                    marginLeft: 20,
                                    fontWeight: "600"
                                }}
                            >
                                Rp.{CurrencyFormat(dataDetail?.mp_product_skus.find(value1 => value1.is_main).price)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            marginVertical: 20
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 18,
                                fontWeight: "600"
                            }}
                        >
                            Pengiriman
                        </Text>
                        <Text style={{ color: "gray", fontSize: 16 }}>
                            Dikirim Dari : {dataDetail?.mp_seller.city}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            marginVertical: 20
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 18,
                                fontWeight: "600"
                            }}
                        >
                            Pilih Varian
                        </Text>
                        <Text style={{ color: "gray", fontSize: 16 }}>
                            Tidak Ada Varian
                        </Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            marginVertical: 20
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 18,
                                fontWeight: "600"
                            }}
                        >
                            Jumlah Produk
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-end" }}>
                            <Button
                                title="-"
                                color="#F18910"
                                onPress={() => setItem(item - 1)}
                            />
                            <Text style={{
                                marginHorizontal: 20, fontSize: 20, textDecorationLine: "underline"
                            }}
                            >
                                {item}
                            </Text>
                            <Button
                                title="+"
                                color="#F18910"
                                onPress={() => setItem(item + 1)}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: "black" }}>Total Harga : Rp.{CurrencyFormat(dataDetail?.mp_product_skus.find(value1 => value1.is_main).price * item)}</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Pressable
                            style={{
                                backgroundColor: "#FFFFFF",
                                borderColor: "#F18910",
                                borderWidth: 2,
                                width: "90%",
                                padding: 10,
                                alignItems: "center",
                                borderRadius: 10
                            }}>
                            <Text style={{ fontSize: 18, color: "black" }}>
                                Tambahkan Ke Wishlist
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{
                                backgroundColor: "#F18910",
                                borderColor: "#F18910",
                                borderWidth: 2,
                                width: "90%",
                                padding: 10,
                                alignItems: "center",
                                borderRadius: 10,
                                marginTop: 10
                            }}>
                            <Text style={{ fontSize: 18, color: "white" }}>
                                Masukkan Ke Keranjang
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.card}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View>
                                <Image
                                    style={styles.profil}
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                    }}
                                />

                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
                                    TSJ
                                </Text>
                                <Text
                                    style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                >
                                    Jakarta Barat
                                </Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", marginVertical: 10 }}>
                            <Pressable
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    borderColor: "#F18910",
                                    borderWidth: 2,
                                    width: "45%",
                                    padding: 10,
                                    alignItems: "center",
                                    borderRadius: 5,
                                    marginHorizontal: 10
                                }}>
                                <Text style={{ fontSize: 18, color: "black" }}>
                                    Hubungi
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    backgroundColor: "#F18910",
                                    borderColor: "#F18910",
                                    borderWidth: 2,
                                    width: "45%",
                                    padding: 10,
                                    alignItems: "center",
                                    borderRadius: 5,
                                }}>
                                <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
                                    Ikuti
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    {/* <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: 50 }}
                /> */}
                    <Text
                        style={{
                            fontSize: 16,
                            color: "black",
                            fontWeight: "600",
                            marginVertical: 20,
                            marginLeft: 10
                        }}>
                        Lebih Banyak Dari Seller Ini
                    </Text>
                    <View style={styles.section}>
                        <View style={styles.cardProduct}>
                            <Pressable onPress={() => navigation.navigate("DetailProduct")}>
                                <Image
                                    style={styles.cardProdukImage}
                                    source={{
                                        uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/5e80fc2a-b4bd-11ec-bbde-00163c303764.jpg"
                                    }}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={{ color: "black", fontSize: 14, fontWeight: "600" }}
                                >
                                    JIB Silicone Slotted Spoon / Silicon Utensil
                                </Text>
                                <Text style={{ color: "black" }}>
                                    Jakarta Barat
                                </Text>
                                <View
                                    style={{
                                        dispaly: "flex",
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                    <Text
                                        style={{
                                            backgroundColor: "black",
                                            color: "white",
                                            width: "25%",
                                            padding: 3,
                                            borderRadius: 5,
                                        }}>
                                        50%
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            width: "75%",
                                            color: "black",
                                            marginLeft: 5,
                                            textDecorationLine: "line-through"
                                        }}>
                                        Rp.30.000.0000
                                    </Text>
                                </View>
                                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                                    Rp.20.000
                                </Text>
                                <Text style={{ fontSize: 16, color: "black", marginTop: 10 }}>
                                    * - | Terjual 0
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.cardProduct}>
                            <Pressable onPress={() => navigation.navigate("DetailProduct")}>
                                <Image
                                    style={styles.cardProdukImage}
                                    source={{
                                        uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/5e80fc2a-b4bd-11ec-bbde-00163c303764.jpg"
                                    }}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={{ color: "black", fontSize: 14, fontWeight: "600" }}
                                >
                                    JIB Silicone Slotted Spoon / Silicon Utensil
                                </Text>
                                <Text style={{ color: "black" }}>
                                    Jakarta Barat
                                </Text>
                                <View
                                    style={{
                                        dispaly: "flex",
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                    <Text
                                        style={{
                                            color: "white",
                                            width: "25%",
                                            padding: 3,
                                            borderRadius: 5,
                                        }}>
                                        46%
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            width: "75%",
                                            color: "black",
                                            marginLeft: 5,
                                            textDecorationLine: "line-through"
                                        }}>
                                        Rp.30.000.0000
                                    </Text>
                                </View>
                                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                                    Rp.20.000
                                </Text>
                                <Text style={{ fontSize: 16, color: "black", marginTop: 10 }}>
                                    * - | Terjual 0
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            }
        </ScrollView >
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    section: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    input: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F18910",
        height: 40,
        borderRadius: 10,
        width: "90%",
        color: "black"

    },
    container: {
        marginLeft: 20,
        width: "100%",
        // padding: 10
        // 
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
        width: "90%",
        height: 350,
        resizeMode: "cover",
    },
    cardProdukImage: {
        marginVertical: 20,
        width: "100%",
        height: 120,
        resizeMode: "cover",
    },
    produkImageDetails: {
        marginVertical: 20,
        width: 100,
        height: 100,
        resizeMode: "contain",
        borderWidth: 1,
        borderColor: "gray",
        marginRight: 10
    },
    card: {
        padding: 10,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "90%",
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
    cardProduct: {
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
    section4: {
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "90%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#F18910",
        display: "flex",
        flexDirection: "row",

    },
    section2: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    profil: {
        width: 80,
        height: 80,
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
})