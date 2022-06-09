import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Image, Pressable, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomImage from '../commons/CustomImage';
import MembershipRows from './membershipRows';
import ModalDialog from '../commons/Modal';

export default function Membership() {
    const [text, onChangeText] = useState();
    const [modalDetail, setModalDetail] = useState(false);
    const [modalTdPoint, setModalTdPoint] = useState(false);
    const [modalPoint, setModalPoint] = useState(false);
    const [modalHistroyActivity, setModalHistoryActivity] = useState(false);
    const [data, setData] = useState();

    // const token = localStorage.getItem('token')

    // const response = await fetch("REACT_APP_BASE_API_URL", {
    //     method: 'GET',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(yourNewData)
    // })

    return (
        <SafeAreaView>
            <StatusBar barStyle='light-content' backgroundColor="#ff6f00"></StatusBar>
            <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
                <View style={styles.membership}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Cari produk/toko"
                    />
                    <CustomImage
                        style={styles.logo}
                        filename={'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
                    />

                    <View style={styles.section1}>
                        <View style={styles.section2}>

                            <Image
                                style={styles.profil}
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                }}
                            />
                            <Text style={{ fontSize: 18, fontWeight: "700", color: "#ffffff", }}>
                                Silver Member
                            </Text>
                            <Pressable onPress={() => setModalDetail(true)}>
                                <Text style={styles.text}>
                                    Detail
                                </Text>
                            </Pressable>
                            <View>
                                <Pressable onPress={() => setModalHistoryActivity(true)}>
                                    <Icon style={{ marginLeft: 60 }} size={24} color="white" name="clock-o" />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.section3}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: "black",
                                    fontWeight: "700"
                                }}
                                >
                                    Tokodapur Point
                                </Text>
                                <Pressable
                                    onPress={() => setModalTdPoint(true)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: "#F18910"
                                        }}>
                                        Info Selengkapnya
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Text
                                    style={{
                                        fontSize: 32,
                                        color: "#F18910",
                                        fontWeight: "700"
                                    }}>
                                    50
                                </Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 20,
                                    color: "#A6A6A6"
                                }}>
                                    Point
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "red",
                                    marginTop: 20
                                }}>
                                25 poin akan hangus pada 01 Juni 2022
                            </Text>
                        </View>
                        <View style={styles.section3}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16, color: "black", fontWeight: "700"
                                    }}>
                                    Poin Loyalitas
                                </Text>
                                <Pressable
                                    onPress={() => setModalPoint(true)}
                                >
                                    <Text style={{
                                        fontSize: 14,
                                        color: "#F18910",
                                    }} >
                                        Info Selengkapnya
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Text
                                    style={{
                                        fontSize: 32,
                                        color: "#F18910",
                                        fontWeight: "700"
                                    }}>
                                    1250
                                </Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 20,
                                    color: "#A6A6A6"
                                }}>
                                    Point
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#A6A6A6",
                                    marginTop: 20
                                }}>
                                1200 poin lagi untuk naik ke level selanjutnya
                            </Text>
                        </View>
                    </View>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "black",
                        marginTop: 20
                    }}>
                        Tukar Poin dengan Voucher
                    </Text>
                    <MembershipRows />
                    <MembershipRows />

                    <ModalDialog
                        onShow={modalDetail}
                        onHide={() => setModalDetail(false)}
                        contentText="Tentang Member Silver"
                        contentHeader={"Detail Member"}
                    >
                    </ModalDialog>
                    <ModalDialog
                        onShow={modalTdPoint}
                        onHide={() => setModalTdPoint(false)}
                        contentText={"Tentang Member Silver"}
                        contentHeader={"Tokodapur Poin"}
                    >
                    </ModalDialog>


                    <ModalDialog
                        onShow={modalPoint}
                        onHide={() => setModalPoint(false)}
                        contentText={"Syarat dan Ketentuan"}
                        contentHeader={"Poin Loyalitas"}
                    >
                    </ModalDialog>
                    <ModalDialog
                        onShow={modalHistroyActivity}
                        onHide={() => setModalHistoryActivity(false)}
                        contentText={
                            <View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row"
                                    }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: "600",
                                            color: "black"
                                        }}>
                                            Transaksi: INV-TSI-0002-04-2022
                                        </Text>
                                    </View>
                                    <View
                                        style={{ marginLeft: 30 }}
                                    >
                                        <Text style={{ fontSize: 12 }}>Tokodapur Poin</Text>
                                    </View>
                                </View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: 20
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: "600",
                                                color: "black"
                                            }}>Transaksi: INV-TSI-0002-04-2022</Text>
                                    </View>
                                    <View
                                        style={{ marginLeft: 30 }}>
                                        <Text
                                            style={{ fontSize: 12 }}>Tokodapur Poin</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        contentHeader={"Riwayat Aktivitas Poin"}
                    >
                    </ModalDialog>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F18910",
        height: 40,
        borderRadius: 10,
        width: "90%",
        color: "black"

    },
    membership: {
        marginLeft: 20,
        width: "100%",
    },
    logo: {
        width: "90%",
        height: 125,
        borderRadius: 10,
        resizeMode: "cover",
    },
    imageVoucher: {
        width: "30%",
        height: "auto",
        borderRadius: 10,
        resizeMode: "cover",
    },
    section1: {
        padding: 20,
        marginTop: 5,
        backgroundColor: "#F18910",
        height: "auto",
        width: "90%",
        borderRadius: 10,
    },
    section3: {
        padding: 20,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        height: "auto",
        width: "100%",
        borderRadius: 10,
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
})
