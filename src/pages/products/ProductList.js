import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, ScrollView, Button, Pressable } from 'react-native';
import { Searchbar, Appbar } from 'react-native-paper';
import Select from 'react-native-picker-select';
import ProductCard from './ProductCard';
import { Text } from 'react-native-paper'

export default function ProductList({ navigation }) {
    const [searchQuery, setSearchQuery] = useState()
    const [dataProducts, setDataProducts] = useState({})
    const baseUrl = `https://api-cms.degadai.id/api/`;

    const select = "Pilih";
    const [category, setCategory] = useState([
        { label: 'Produk', value: 'produk' },
        { label: 'Seller', value: 'seller' },
        { label: 'Article', value: 'article' },
    ])

    const onChangeSearch = (e) => {
        console.log(e)
    }

    useEffect(() => {
        getDataProduct()
    }, []);

    const getDataProduct = async () => {
        console.log("Data")


        // return
        let params = {
            order_by: 'date',
            order: 'desc',
            length: 1,
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
                setDataProducts(response.data.data.data)
            }).catch(error => {
                console.log(error)

            })
    }

    // console.log(dataProducts.map((item) => (item.mp_product_informations[0].name)))

    return (
        <>
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
                    {/* Card Produk */}
                    <View style={{ width: "87%" }}>
                        <Pressable >
                            <Text style={{ textAlign: "right", fontSize: 18, color: "#000" }}>
                                Filter
                            </Text>
                        </Pressable>
                    </View>
                    {/* {dataProducts && dataProducts.map((item) => { */}
                    <View style={styles.section}>
                        <ProductCard navi={navigation} item={dataProducts} />
                    </View>
                    {/* })} */}
                </View >
            </ScrollView >
        </>
    )
}

const styles = StyleSheet.create({
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
