import { View, StyleSheet, TextInput, Image, ScrollView, Button, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Select from 'react-native-picker-select';
import { Text } from 'react-native-paper';
export default function Cart() {
    const [searchQuery, setSearchQuery] = useState()
    const [isSelected, setSelection] = useState(false);
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
                <View style={[styles.section]}>
                    <View style={[styles.card, { width: "87%" }]}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={[styles.label, { fontSize: 16, fontWeight: "500" }]}>TSJ</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1,
                                // marginVertical: 20,
                                marginTop: -20
                            }}
                        />
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Image
                                style={styles.produkImage}
                                source={{
                                    uri: "https://api-admin.tokodapur.com/storage/public/tsi-3/public/marketplace/products/c2331457-b4bc-11ec-bbde-00163c303764.jpg"
                                }}
                            />
                            <View style={{ width: "30%", alignSelf: "center", marginLeft: 20 }}>
                                <Text variant="">
                                    PANCI PRESTO SUPOR SAFETY PRESSURE COOKER 18CM - YH18NI
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                                    Rp 535.500
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "flex-end" }}>
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
                            <Text style={{ color: "red", marginLeft: 10, width: "30%" }}>
                                Barang hampir habis!
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: "700", marginLeft: 10 }}>
                                Rp 535.500
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.card, { width: "87%" }]}>
                        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>Ringkasan</Text>
                        <View style={styles.sectionRow}>
                            <Text>
                                Total Harga
                            </Text>
                            <Text>
                                Rp.535.500
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
                            <Text>
                                Total Pembayaran
                            </Text>
                            <Text>
                                Rp.535.500
                            </Text>
                        </View>
                        <View style={{ backgroundColor: "black", height: 35, borderRadius: 5, marginTop: 10, justifyContent: "center", flex: 1, alignItems: "center" }}>
                            <Pressable>
                                <Text style={{ fontSize: 20, color: "white" }}>
                                    Beli
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View >
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