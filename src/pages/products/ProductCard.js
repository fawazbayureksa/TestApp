import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import PriceRatio from "../../components/PriceRatio"
import { CurrencyFormat } from '../../components/CurrencyFormat';
export default function ProductCard({ navi }) {
    const [data, setData] = React.useState();
    const baseUrl = `https://api-cms.degadai.id/api/`;

    React.useEffect(() => {
        getDataProduct()
    }, []);

    const getDataProduct = async () => {
        console.log("Data")


        // return
        let params = {
            order_by: 'date',
            order: 'desc',
            length: 10,
            page: 1,
            // type: props.data.type,
            // custom_product_url: props.data.custom_product_url
        }
        // if (props.data.mp_category_slug) {
        //     params = { ...params, category: props.data.mp_category_slug }
        // }

        await axios.get(baseUrl + `ecommerce/products/get?order_by=${params.order_by}&order=${params.order}&length=${params.length}&page=${params.page}`,
            {
                headers: {
                    "Origin": "http://localhost:3002/",
                }
            }
        )
            .then(response => {
                setData(response.data.data.data)
            }).catch(error => {
                console.log(error)

            })
    }

    return (
        <>
            {data && data.map((item) => {
                // console.log()
                return (
                    <View style={styles.card} key={item.id}>
                        <Pressable onPress={() => navi.navigate("DetailProduct")}>
                            <Image
                                style={styles.produkImage}
                                source={{
                                    uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${item.mp_product_images[0].filename}`
                                }}
                            />
                            <Text
                                numberOfLines={1}
                                style={{ color: "black", fontSize: 14, fontWeight: "600" }}
                            >
                                {item.mp_product_informations[0].name}
                            </Text>
                            <View style={styles.section}>
                                <Icon name='check-circle' size={24} color="#F18910" />
                                <Text style={{ color: "black" }}>
                                    {item.mp_seller.city}
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
                                        width: "25%",
                                        padding: 3,
                                        borderRadius: 5,
                                    }}>
                                    {/* 46% */}
                                    {PriceRatio(item.mp_product_skus.find(value1 => value1.is_main).normal_price, item.mp_product_skus.find(value1 => value1.is_main).price)}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        width: "75%",
                                        color: "black",
                                        marginLeft: 5,
                                        textDecorationLine: "line-through"
                                    }}>
                                    {/* Rp.30.000.000 */}
                                    Rp.{CurrencyFormat(item.mp_product_skus.find(value1 => value1.is_main).normal_price)}
                                </Text>
                            </View>
                            <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                                Rp.{CurrencyFormat(item.mp_product_skus.find(value1 => value1.is_main).price)}
                            </Text>
                            <View style={[styles.section, { marginTop: 10, alignItems: "center" }]}>
                                <Icon size={24} color="#F18910" name="star-border" />
                                <Text style={{ fontSize: 16, color: "black" }}>
                                    {item.rating ? item.rating : "-"}
                                    - | Terjual {item.sold_product}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
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
        width: "100%",
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
})