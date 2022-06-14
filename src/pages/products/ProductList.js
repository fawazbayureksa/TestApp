import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, Button } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Searchbar, Appbar } from 'react-native-paper';
// import Carousel from 'react-native-snap-carousel';
import Select from 'react-native-picker-select';
import ProductCard from './ProductCard';


export default function ProductList({ navigation }) {
    const [searchQuery, setSearchQuery] = useState()
    const select = "Pilih";
    const [category, setCategory] = useState([
        { label: 'Produk', value: 'produk' },
        { label: 'Seller', value: 'seller' },
        { label: 'Article', value: 'article' },
    ])
    const onChangeSearch = (e) => {
        console.log(e)
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
                {/* Card Produk */}
                <View style={styles.section}>
                    <ProductCard navi={navigation} />
                </View>
                <Text>

                </Text>
            </View >
        </ScrollView >

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
