import React from 'react'
import { Image, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigate, navigationRef } from '../../navigator/RootNavigation';

export default function All() {
    return (
        <>
            <ScrollView style={{ backgroundColor: "#FFF" }}>

                <View style={[styles.sectionRow, styles.container]}>
                    <View style={[styles.rounded, { backgroundColor: "#F18910" }]}>
                        <Text style={{ color: "#FFF" }}>Semua</Text>
                    </View>
                    <View style={[styles.rounded, styles.borderGray]}>
                        <Text style={{ color: "gray" }}>Resep</Text>
                    </View>
                    <View style={[styles.rounded, styles.borderGray]}>
                        <Text style={{ color: "gray" }}>Komparasi</Text>
                    </View>
                    <View style={[styles.rounded, styles.borderGray]}>
                        <Text style={{ color: "gray" }}>Tutorial</Text>
                    </View>
                </View >
                <View style={styles.container}>
                    <View style={[styles.card, { width: "85%" }]}>
                        <TouchableOpacity onPress={() => navigationRef.navigate("DetailForum")}>
                            <View style={styles.section}>
                                <Image
                                    style={styles.profil}
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                    }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 14 }}>TiLung Sukses Jaya</Text>
                                    <Text style={{ fontSize: 12, color: "gray" }}>1 Jam</Text>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
                                    <View style={{ backgroundColor: "#F18910", borderRadius: 50, marginLeft: 5 }}>
                                        <Icon size={18} color="#fff" name="done" />
                                    </View>
                                    <View style={{ backgroundColor: "#F18910", flexDirection: "row", borderRadius: 5, marginHorizontal: 5, paddingHorizontal: 10 }}>
                                        <Icon size={18} color="#fff" name="house-siding" />
                                        <Text style={{ color: "#fff" }} > Seller</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "700", marginVertical: 10 }}>
                                Mana yang lebih hemat? Kompor gas VS Kompor Listrik
                            </Text>
                            <Text style={{ color: "gray" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imper...
                            </Text>
                            <View style={styles.sectionRow}>
                                <View style={styles.row}>
                                    <Icon size={24} color="gray" name="thumb-up" />
                                    <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>250</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon size={24} color="gray" name="forum" />
                                    <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>37</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon size={24} color="gray" name="remove-red-eye" />
                                    <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>530</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={[styles.card, { width: "85%" }]}>
                        <View style={styles.section}>
                            <Image
                                style={styles.profil}
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 14 }}>Zavira Nabilla</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>5 Jam</Text>
                            </View>

                        </View>
                        <Text style={{ fontSize: 16, fontWeight: "700", marginVertical: 10 }}>
                            Tips Menggunakan Microwave
                        </Text>
                        <Text style={{ color: "gray" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imper...
                        </Text>
                        <View style={styles.sectionRow}>
                            <View style={styles.row}>
                                <Icon size={24} color="gray" name="thumb-up" />
                                <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>250</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon size={24} color="gray" name="forum" />
                                <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>37</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon size={24} color="gray" name="remove-red-eye" />
                                <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>530</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.card, { width: "85%" }]}>
                        <View style={styles.section}>
                            <Image
                                style={styles.profil}
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 14 }}>Kevin</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>12 Jam</Text>
                            </View>

                        </View>
                        <Text style={{ fontSize: 16, fontWeight: "700", marginVertical: 10 }}>
                            Penyebab Kulkas Tidak Dingin Sehabis Mati Listrik
                        </Text>
                        <Text style={{ color: "gray" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imper...
                        </Text>
                        <View style={styles.sectionRow}>
                            <View style={styles.row}>
                                <Icon size={24} color="gray" name="thumb-up" />
                                <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>250</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon size={24} color="gray" name="forum" />
                                <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>37</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon size={24} color="gray" name="remove-red-eye" />
                                <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>530</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView >
            <TouchableOpacity
                onPress={() => navigationRef.navigate("CreateThread")}
                style={styles.floatingButton}
            >
                <Icon name='create' size={21} color='#fff' />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    floatingButton: {
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        position: 'absolute',
        bottom: 20,
        right: 26,
        height: 44,
        backgroundColor: '#F8931D',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    row: { flexDirection: "row", alignItems: "center" },
    borderGray: {
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "#FFF"
    },
    rounded: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 40, borderRadius: 50, marginHorizontal: 5,
    },

    h6: {
        fontSize: 16
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 0,
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
        flexWrap: "nowrap",
        alignItems: "center",
    },
    input: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F18910",
        height: 40,
        borderRadius: 10,
        color: "black",
        // width: "90%"

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
        width: 100,
        height: 100,
        resizeMode: "contain",
        backgroundColor: "#F6F6F6",
        borderRadius: 5
    },
    produkImage: {
        marginVertical: 20,
        width: "30%",
        height: 120,
        borderRadius: 10,
        resizeMode: "cover",
        backgroundColor: "#F6F6F6"
    },
    card: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "40%",
        borderRadius: 5,
        shadowColor: "#999",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    profil: {
        width: 40,
        height: 40,
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
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20
    }
})