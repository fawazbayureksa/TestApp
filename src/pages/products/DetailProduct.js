import { Button, Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import InfromationProduct from './InfromationProduct';
import UlasanProduct from './UlasanProduct';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PriceRatio from '../../components/PriceRatio';
import { CurrencyFormat } from '../../components/CurrencyFormat';
import IsEmpty from '../../commons/IsEmpty';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, HOST } from "@env"
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import moment from 'moment';

const DetailProduct = ({ route, navigation }) => {

    const layout = useWindowDimensions();
    const [dataDetail, setDataDetail] = useState(null)
    const [dataRelated, setDataRelated] = useState(null)
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);
    const [item, setItem] = useState(1)
    const [total, setTotal] = useState()
    const [variantId, setVariantId] = useState()
    const [idVar, setIdVar] = useState()
    const [dataRating, setDataRating] = useState()
    const [idProdcut, setIdProdcut] = useState()

    const regex = /<[^>]*>/mgi

    useEffect(() => {
        getDataProductDetail()
        getRatingByParam()
    }, [])

    // useEffect(() => {
    //     if (!dataDetail) {
    //         getRating()
    //     }

    // }, [dataRating])


    const getDataProductDetail = async () => {
        await axios.get(API_URL + `ecommerce/product/find?seller_slug=${route.params.seller_slug}&product_slug=${route.params.product_slug}`,
            {
                headers: {
                    "Origin": HOST,
                }
            }
        )
            .then((response) => {
                setDataDetail(response.data.data.detail)
                setIdProdcut(response.data.data.detail.id)
                setDataRelated(response.data.data.related)
                setVariantId(response.data.data.detail.mp_product_skus.find(value => value.is_main === true))
            }).catch(error => {
                console.log(error)

            })
    }

    const handleCart = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        if (!jsonValue) {
            navigation.navigate("Login")
            Alert.alert(
                "",
                "Silahkan login terlebih dahulu",
                [
                    { text: "OK" }
                ]
            )
        }
        let params = {
            sku_id: variantId.id,
            qty: item
        }
        if (parseInt(item) <= parseInt(variantId.stock)) {
            await axios.post(API_URL + `cart/add`, params,
                {
                    headers: {
                        "Origin": "http://localhost:3002/",
                        "Authorization": `Bearer ${jsonValue}`,
                    }
                }
            ).then(response => {
                Alert.alert(
                    "",
                    "Berhasil menambahkan ke keranjang",
                    [
                        { text: "OK" }
                    ]
                )
            }).catch(error => {
                if (error.response.data.message === "Exceed max order of one transaction") {
                    Alert.alert(
                        "",
                        `Melebihi pesanan maksimal, satu transaksi`,
                        [
                            { text: "OK" }
                        ]
                    )
                }
                else {
                    console.log(error.response.data.message)
                }
            })
        } else {
            console.log("Stok tidak cukup")
        }
    }

    // console.log(dataDetail?.mp_product_ratings)

    const follow = async () => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        if (!jsonValue) {
            navigation.navigate("Login")
            Alert.alert(
                "",
                "Silahkan login terlebih dahulu",
                [
                    { text: "OK" }
                ]
            )
            return
        }
        await axios.post(API_URL + `ecommerce/seller/follow`, {
            mp_seller_id: dataDetail.mp_seller_id,
            is_follow: dataDetail.mp_seller.follow.is_follow === false ? true : false
        }, {
            headers: {
                "Origin": "http://localhost:3002/",
                "Authorization": `Bearer ${jsonValue}`,
            }
        }).then(response => {
            Alert.alert(
                "",
                "Berhasil di ikuti",
                [
                    { text: "OK" }
                ]
            )
            getDataProductDetail()
        }).catch(error => {
            console.log(error)
        })
    }

    const getRatingByParam = async () => {


        let url = API_URL + `review/getWithParams?page=1&per_page=2&filter=all&product_id=${idProdcut}`
        axios.get(url, {
            headers: {
                Origin: HOST,
            }
        }).then(response => {
            setDataRating(response.data.data.data)
        }).catch(error => {
            console.log(error.response.data.message)
        })
    }
    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            {((dataDetail === null) || (dataRating === null)) ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>
                        Wait ...
                    </Text>
                </View>
                :
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.produkImage}
                            source={{
                                uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${dataDetail?.mp_product_images[0].filename}`
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        {dataDetail?.mp_product_images.map((image, index) => (
                            <View key={index}>
                                <Image
                                    style={styles.produkImageDetails}
                                    source={{
                                        uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${image.filename}`
                                    }}
                                />
                            </View>
                        ))}
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
                                {/* Rating {dataDetail?.rating ? dataDetail?.rating : "-"} ({dataDetail?.mp_product_ratings[0].count} Ulasan) */}
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

                        <View style={{ marginVertical: 10, flex: 1, flexWrap: "wrap" }}>
                            <Text style={{ fontSize: 16, fontWeight: "600", }}>{dataDetail?.mp_product_variants[0]?.name}</Text>
                            {dataDetail?.mp_product_variants.length === 0
                                ?
                                <Text style={{ color: "gray", fontSize: 16 }}>
                                    Tidak Ada Varian
                                </Text>
                                :
                                dataDetail?.mp_product_variants[0].mp_product_sku_variant_options.map((item) => (
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderColor: "#F18910",
                                            borderWidth: 1,
                                            marginTop: 10,
                                            padding: 10,
                                            borderRadius: 10,
                                            height: 50
                                        }}
                                        onPress={() => setIdVar(item.id)}
                                        key={item.id}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "700"
                                            }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
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
                            Jumlah Produk
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-end" }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#F18910",
                                    width: 30,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 50
                                }}
                                onPress={() => setItem(item - 1)}
                            >
                                <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{
                                marginHorizontal: 20, fontSize: 20, textDecorationLine: "underline"
                            }}
                            >
                                {item}
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
                                onPress={() => setItem(item + 1)}
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
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: "black" }}>Total Harga : Rp.{CurrencyFormat(dataDetail?.mp_product_skus.find(value1 => value1.is_main).price * item)}</Text>
                    </View>
                    <View style={{ marginBottom: 20 }} >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#FFFFFF",
                                borderColor: "#F18910",
                                borderWidth: 2,
                                width: "90%",
                                padding: 10,
                                alignItems: "center",
                                borderRadius: 50
                            }}
                            onPress={() => console.log("wishlist")}
                        >
                            <Text style={{ fontSize: 18, color: "black" }}>
                                Tambahkan Ke Wishlist
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCart}
                            style={{
                                backgroundColor: "#F18910",
                                borderColor: "#F18910",
                                borderWidth: 2,
                                width: "90%",
                                padding: 10,
                                alignItems: "center",
                                borderRadius: 50,
                                marginTop: 10
                            }}
                        >
                            <Text style={{ fontSize: 18, color: "white" }}>
                                Masukkan Ke Keranjang
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View>
                                <Image
                                    style={styles.profil}
                                    source={{
                                        uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/seller/${dataDetail?.mp_seller.cover_picture}`,
                                    }}
                                />

                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
                                    {dataDetail?.mp_seller.name}
                                </Text>
                                <Text
                                    style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                                >
                                    {dataDetail?.mp_seller.city}
                                </Text>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", marginVertical: 10 }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    borderColor: "#F18910",
                                    borderWidth: 2,
                                    width: "45%",
                                    padding: 10,
                                    alignItems: "center",
                                    borderRadius: 50,
                                    marginHorizontal: 10
                                }}
                                onPress={() => console.log("Hubungi Seller")}
                            >
                                <Text style={{ fontSize: 18, color: "black" }}>
                                    Hubungi
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#F18910",
                                    borderColor: "#F18910",
                                    borderWidth: 2,
                                    width: "45%",
                                    padding: 10,
                                    alignItems: "center",
                                    borderRadius: 50,
                                }}
                                onPress={follow}
                            >
                                {/* {console.log(dataDetail)} */}
                                <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
                                    {dataDetail.mp_seller.follow.is_follow === false ? "Ikuti" : "Diikuti"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <View style={[styles.card, { marginTop: 20 }]}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={[{ fontSize: 18, color: "#F18910" }]}>Deskripsi</Text>
                                        <Icon size={24} color="#000" name="arrow-forward-ios" />
                                    </View>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={[styles.card, { marginTop: 5 }]}>
                                    {dataDetail?.mp_product_informations.map((item) => {
                                        let section = JSON.parse(item.sections)
                                        return (
                                            <View>
                                                <Text style={[{ fontSize: 18, color: "#000" }]}>{section[0].content.replace(regex, "")}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </CollapseBody>
                        </Collapse>
                    </View>
                    <View>
                        <Collapse>
                            <CollapseHeader>
                                <View style={[styles.card, { marginTop: 20 }]}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={[{ fontSize: 18, color: "#F18910" }]}>Ulasan</Text>
                                        <Icon size={24} color="#000" name="arrow-forward-ios" />
                                    </View>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={[styles.card, { marginTop: 5 }]}>
                                    {dataDetail?.mp_product_ratings && dataDetail?.mp_product_ratings.map((item) => {
                                        return (
                                            <View>
                                                {/* <Text style={[{ fontSize: 18, color: "#F18910" }]}>Rating {item.rating}</Text> */}
                                                {item.rating === 5 ?
                                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                                        <Icon size={24} color="#F18910" name="star" />
                                                        <Icon size={24} color="#F18910" name="star" />
                                                        <Icon size={24} color="#F18910" name="star" />
                                                        <Icon size={24} color="#F18910" name="star" />
                                                        <Icon size={24} color="#F18910" name="star" />
                                                    </View>
                                                    : item.rating === 4 ?
                                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                                            <Icon size={24} color="#F18910" name="star" />
                                                            <Icon size={24} color="#F18910" name="star" />
                                                            <Icon size={24} color="#F18910" name="star" />
                                                            <Icon size={24} color="#F18910" name="star" />
                                                        </View>
                                                        : item.rating === 3 ?
                                                            <View style={{ flex: 1, flexDirection: "row" }}>
                                                                <Icon size={24} color="#F18910" name="star" />
                                                                <Icon size={24} color="#F18910" name="star" />
                                                                <Icon size={24} color="#F18910" name="star" />
                                                            </View>
                                                            : item.rating === 2 ?
                                                                <View style={{ flex: 1, flexDirection: "row" }}>
                                                                    <Icon size={24} color="#F18910" name="star" />
                                                                    <Icon size={24} color="#F18910" name="star" />
                                                                </View>
                                                                : item.rating === 1 ?
                                                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                                                        <Icon size={24} color="#F18910" name="star" />
                                                                    </View>
                                                                    :
                                                                    <View>
                                                                    </View>
                                                }

                                                <Text style={{ marginTop: 10 }}>
                                                    {dataDetail?.mp_product_ratings.length} Ulasan
                                                </Text>
                                                <View style={{ borderColor: "#A6A6A6", borderWidth: 1, width: "100%", marginTop: 20 }} />
                                                <View style={{ marginVertical: 20 }}>
                                                    {dataRating && dataRating.map((rate) => {
                                                        return (
                                                            <View key={item.id} style={styles.section}>
                                                                <Image
                                                                    style={styles.profil}
                                                                    source={{
                                                                        uri: `${rate?.mp_customer?.profile_picture}`,
                                                                    }}
                                                                />

                                                                <View style={{ marginLeft: 20 }}>
                                                                    <Text>{rate.mp_customer.name}</Text>
                                                                    <Text>{moment(rate.created_at).format("DD-MM-YYYY")}</Text>
                                                                    {rate.rating == 5 ?
                                                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                                                            <Icon size={24} color="#F18910" name="star" />
                                                                            <Icon size={24} color="#F18910" name="star" />
                                                                            <Icon size={24} color="#F18910" name="star" />
                                                                            <Icon size={24} color="#F18910" name="star" />
                                                                            <Icon size={24} color="#F18910" name="star" />
                                                                        </View>
                                                                        : item.rating === 4 ?
                                                                            <View style={{ flex: 1, flexDirection: "row" }}>
                                                                                <Icon size={24} color="#F18910" name="star" />
                                                                                <Icon size={24} color="#F18910" name="star" />
                                                                                <Icon size={24} color="#F18910" name="star" />
                                                                                <Icon size={24} color="#F18910" name="star" />
                                                                            </View>
                                                                            : item.rating === 3 ?
                                                                                <View style={{ flex: 1, flexDirection: "row" }}>
                                                                                    <Icon size={24} color="#F18910" name="star" />
                                                                                    <Icon size={24} color="#F18910" name="star" />
                                                                                    <Icon size={24} color="#F18910" name="star" />
                                                                                </View>
                                                                                : item.rating === 2 ?
                                                                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                                                                        <Icon size={24} color="#F18910" name="star" />
                                                                                        <Icon size={24} color="#F18910" name="star" />
                                                                                    </View>
                                                                                    : item.rating === 1 ?
                                                                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                                                                            <Icon size={24} color="#F18910" name="star" />
                                                                                        </View>
                                                                                        :
                                                                                        <View>
                                                                                        </View>
                                                                    }
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </CollapseBody>
                        </Collapse>
                    </View>
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
                        {dataRelated && dataRelated.map((item) => (
                            <View style={styles.cardProduct} key={item.id}>
                                <Pressable onPress={() => navigation.navigate("DetailProduct", {
                                    seller_slug: item.mp_seller.slug,
                                    product_slug: item.slug
                                })}>
                                    <Image
                                        style={styles.cardProdukImage}
                                        source={{
                                            uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${item?.mp_product_images[0].filename}`
                                        }}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{ color: "black", fontSize: 14, fontWeight: "600" }}
                                    >
                                        {item?.mp_product_informations[0].name}
                                    </Text>
                                    <Text style={{ color: "black" }}>
                                        {item?.mp_seller.city}
                                    </Text>

                                    <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                                        Rp.{CurrencyFormat(item?.mp_product_skus.find(value1 => value1.is_main).price)}
                                    </Text>
                                    <View style={[styles.section, { marginTop: 10, alignItems: "center" }]}>
                                        <Icon size={24} color="#F18910" name="star-border" />
                                        <Text style={{ fontSize: 16, color: "black" }}>
                                            {item.rating ? item.rating : "-"}
                                            | Terjual {item.sold_product}
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                        ))}
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
        backgroundColor: "#F6F6F6",
        borderRadius: 10
    },
    cardProdukImage: {
        marginVertical: 20,
        width: "100%",
        height: 120,
        resizeMode: "contain",
        backgroundColor: "#F6F6F6",
        borderRadius: 5

    },
    produkImageDetails: {
        marginVertical: 20,
        width: 100,
        height: 100,
        resizeMode: "contain",
        borderWidth: 1,
        borderColor: "gray",
        marginRight: 10,
        backgroundColor: "#F6F6F6",
        borderRadius: 10

    },
    card: {
        padding: 10,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "90%",
        borderRadius: 10,
        shadowColor: "#666",
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
        shadowColor: "#666",
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
        borderRadius: 50,
        backgroundColor: "#A6A6A6"
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