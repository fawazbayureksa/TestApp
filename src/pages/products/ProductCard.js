import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

export default function ProductCard({ navi }) {
    return (
        <>
            <View style={styles.card}>
                <Pressable onPress={() => navi.navigate("DetailProduct")}>
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
            <View style={styles.card}>
                <Pressable onPress={() => navi.navigate("DetailProduct")}>
                    <Image
                        style={styles.produkImage}
                        source={{
                            uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/c21af3c1-b4bc-11ec-bbde-00163c303764.jpg"
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
            <View style={styles.card}>
                <Pressable onPress={() => navi.navigate("DetailProduct")}>
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
            <View style={styles.card}>
                <Pressable onPress={() => navi.navigate("DetailProduct")}>
                    <Image
                        style={styles.produkImage}
                        source={{
                            uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/c2331457-b4bc-11ec-bbde-00163c303764.jpg"
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