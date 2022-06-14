import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailProduct = () => {
    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.produkImage}
                        source={{
                            uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/4deb293b-e6fc-11ec-a77b-00163c303764.jpg"
                        }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Image
                        style={styles.produkImageDetails}
                        source={{
                            uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/4deb293b-e6fc-11ec-a77b-00163c303764.jpg"
                        }}
                    />
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
                </View>
                <View>
                    <Text style={{ fontSize: 16, color: "black" }}>
                        Faber Decorative Island Up  Down Hood Pareo
                    </Text>
                    <Text
                        style={{ fontSize: 16, color: "gray" }}>
                        U TSJ | Terjual 0 | * Rating - (0 Ulasan)
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
                                // width: "10%",
                                padding: 5,
                                borderRadius: 5,
                                fontSize: 16,
                            }}>
                            46%
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 18,
                                color: "black",
                                marginLeft: 10,
                                textDecorationLine: "line-through"
                            }}>
                            Rp.30.000.0000
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "black",
                                marginLeft: 20,
                                fontWeight: "600"
                            }}
                        >
                            Rp.18.720.0000
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
                        Dikirim Dari : Jakarta Barat
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
                            color="black"
                        />
                        <Text style={{
                            marginHorizontal: 20, fontSize: 20, textDecorationLine: "underline"
                        }}
                        >
                            1
                        </Text>
                        <Button
                            title="+"
                            color="black"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: "black" }}>Total Harga : Rp.19.999.999</Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Pressable
                        style={{
                            backgroundColor: "#FFFFFF",
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
                            backgroundColor: "#000000",
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
                <View>
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

                            </Text>
                            <Text
                                style={{ fontSize: 16, fontWeight: "300", color: "black" }}
                            >
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
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