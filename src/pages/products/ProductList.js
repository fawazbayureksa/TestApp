import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import Carousel from 'react-native-snap-carousel';



export default function ProductList({ navigation }) {
    const [text, setText] = useState()

    const onChangeText = () => {

    }

    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                {/* Search Form */}
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Cari produk/toko"
                />
                {/* Carousel */}
                <View>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1508004680771-708b02aabdc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                        }}
                    />
                </View>
                {/* Image Category */}
                <View style={styles.section}>
                    <Image
                        style={styles.categoryImage}
                        source={{
                            uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314062934_Cook%20&%20Cuisine%20%281%29.png'
                        }}
                    />
                    <Image
                        style={styles.categoryImage}
                        source={{
                            uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314062953_Cold%20&%20Preserve.png'
                        }}
                    />
                    <Image
                        style={styles.categoryImage}
                        source={{
                            uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314063011_Wash%20&%20Clean%20%281%29.png'
                        }}
                    />
                    <Image
                        style={styles.categoryImage}
                        source={{
                            uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314063026_Sanitary%20%281%29.png'
                        }}
                    />
                    <Image
                        style={styles.categoryImage}
                        source={{
                            uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314063127_Kitchen%20Tools.png'
                        }}
                    />
                    <Image
                        style={styles.categoryImage}
                        source={{
                            uri: 'https://api-admin.tokodapur.com/storage/public/tsi-3/public/cms/20220314063049_Coffee%20&%20Tea%20%281%29.png'
                        }}
                    />
                </View>

                {/* Text Banner */}
                <View style={styles.section}  >
                    <View
                        style={{
                            backgroundColor: "#F18910",
                            width: "90%",
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "700"
                        }}>
                            New Product
                        </Text>
                    </View>
                </View>
                {/* Card Produk */}
                <View style={styles.section}>
                    <View style={styles.card}>
                        <Pressable onPress={() => navigation.navigate("DetailProduct")}>
                            <Image
                                style={styles.produkImage}
                                source={{
                                    uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/4deb293b-e6fc-11ec-a77b-00163c303764.jpg"
                                }}
                            />
                            <Text
                                numberOfLines={1}
                                style={{ color: "black", fontSize: 14, fontWeight: "600" }}
                            >
                                Faber Decorative Island Up Down Hood Pareo
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
                                        padding: 1,
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
                    <View style={styles.card}>
                        <Image
                            style={styles.produkImage}
                            source={{
                                uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/aa6e79fb-dc03-11ec-a77b-00163c303764.jpg"
                            }}
                        />
                        <Text
                            numberOfLines={1}
                            style={{ color: "black", fontSize: 14, fontWeight: "600" }}
                        >
                            Faber Decorative Island Up Down Hood Pareo
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
                                    padding: 1,
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
                    </View>
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
        width: "100%",
        height: 100,
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
