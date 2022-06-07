import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Image, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Membership() {
    const [text, onChangeText] = useState();
    const [modalDetail, setModalDetail] = useState(false);



    return (
        <View style={styles.membership}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Cari produk/toko"
            />
            <Image
                style={styles.logo}
                source={{
                    // uri: '../assets/img/Rectangle.png',
                    uri: 'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                }}
            />
            <View style={styles.section1}>
                <View style={styles.section2}>
                    <Image
                        style={styles.profil}
                        source={{
                            // uri: '../assets/img/Rectangle.png',
                            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                        }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "800", color: "#ffffff" }}>
                        Silver Member
                    </Text>
                    <Text style={styles.text}>
                        Detail
                    </Text>
                    <Icon style={{ marginLeft: 60 }} size={24} color="white" name="clock-o" />
                </View>
                <View style={styles.section3}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, color: "black", fontWeight: "700" }}>
                            Tokodapur Point
                        </Text>
                        <Text style={{ fontSize: 14, color: "#F18910", }}>
                            Info Selengkapnya
                        </Text>
                    </View>
                    <Text style={{ fontSize: 32, color: "#F18910", fontWeight: "700" }}>
                        50
                        <Text style={{ fontSize: 20, color: "#A6A6A6" }}>
                            Point
                        </Text>
                    </Text>
                    <Text style={{ fontSize: 14, color: "red", marginTop: 20 }}>
                        25 poin akan hangus pada 01 Juni 2022
                    </Text>
                </View>
                <View style={styles.section3}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, color: "black", fontWeight: "700" }}>
                            Tokodapur Point
                        </Text>
                        <Text style={{ fontSize: 14, color: "#F18910", }}>
                            Info Selengkapnya
                        </Text>
                    </View>
                    <Text style={{ fontSize: 32, color: "#F18910", fontWeight: "700" }}>
                        1250
                        <Text style={{ fontSize: 20, color: "#A6A6A6" }}>
                            Point
                        </Text>
                    </Text>
                    <Text style={{ fontSize: 14, color: "#A6A6A6", marginTop: 20 }}>
                        1200 poin lagi untuk naik ke level selanjutnya
                    </Text>
                </View>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "700", color: "black", marginTop: 20 }}>
                Tukar Poin dengan Voucher
            </Text>


            <View style={styles.section4}>
                <Image
                    style={styles.imageVoucher}
                    source={{
                        // uri: '../assets/img/Rectangle.png',
                        uri: 'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                    }}
                />
                <Text style={{ fontSize: 20, color: "black" }}>Diskon 40% Hingga Rp 200.000 </Text>
                <Text style={{ fontSize: 18, color: "#A6A6A6" }}>VCH40 </Text>
                <Text style={{ color: "#F18910", fontSize: 20 }}>600 Poin </Text>
                <Pressable
                    onPress={() => setModalDetail(true)}
                >
                    <Text style={{ color: "#F18910", fontSize: 18 }}>
                        Detail
                    </Text>
                </Pressable>
                <Button
                    onPress
                    title="Tukar Point"
                    color="#F18910"
                />
            </View>

            <View style={styles.section4}>
                <Image
                    style={styles.imageVoucher}
                    source={{
                        // uri: '../assets/img/Rectangle.png',
                        uri: 'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                    }}
                />
                <Text style={{ fontSize: 20, color: "black" }}>Diskon 40% Hingga Rp 200.000 </Text>
                <Text style={{ fontSize: 18, color: "#A6A6A6" }}>VCH40 </Text>
                <Text style={{ color: "#F18910", fontSize: 20 }}>600 Poin </Text>
                <Text style={{ color: "#F18910", fontSize: 18 }}>Detail</Text>
                <Button
                    onPress
                    title="Tukar Point"
                    color="#F18910"
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDetail}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalDetail(!modalDetail)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        paddingHorizontal: 10,
        marginTop: 30,
        width: "90%",
        marginBottom: 10
    },
    membership: {
        marginLeft: 20,
        width: "100%",
    },
    logo: {
        width: "90%",
        height: 125,
        borderRadius: 10
    },
    imageVoucher: {
        width: "100%",
        height: 125,
        borderRadius: 10
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
        borderColor: "#F18910"

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
