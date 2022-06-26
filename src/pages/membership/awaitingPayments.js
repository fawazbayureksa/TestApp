import { Image, StyleSheet, View, Pressable, TouchableOpacityBase, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RadioButton, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"
import { CurrencyFormat } from '../../components/CurrencyFormat';
import ModalDialog from '../../commons/Modal';
import { TextInput } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Select from 'react-native-picker-select';

export default function AwaitingPayments({ route, navigation }) {

    const [data, setData] = useState();
    const [modal, setModal] = useState();
    const [photo, setPhoto] = useState(null);
    const [uriPhoto, setUriPhoto] = useState(null);
    const [mpBanks, set_mpBanks] = useState([])
    const [nama, setNama] = useState();
    const [noRek, setNorek] = useState();
    const [idBank, setIdBank] = useState();

    useEffect(() => {
        getManualTransferDestination()
        getBanks()

    }, [])

    const getManualTransferDestination = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `checkout-pay/getManualTransferDestination`, {
            params: {
                mp_payment_destination_id: route.params.id
            },
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }).then(response => {
            setData(response.data.data)
        }).catch(error => {
            console.log(error);
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 403) {
                    navigation.navigate("TransactionList")
                }
                else if (error.response.status === 400) {
                    navigation.navigate("TransactionList")
                }
            }
        })
    }

    const handleUploadPhoto = async () => {
        const formData = new FormData();
        if (photo) {
            const tempPhoto = {
                uri: photo?.assets[0]?.uri,
                type: photo?.assets[0]?.type,
                name: photo?.assets[0]?.fileName,
            };
            formData.append('file', tempPhoto);

            let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

            await axios.post(API_URL + `my-orders/uploadPaymentProof`, formData, {
                headers: {
                    "Origin": "http://localhost:3002/",
                    "Authorization": `Bearer ${jsonValue}`,
                    'content-type': 'multipart/form-data'
                }
            }).then(response => {
                Alert.alert(
                    "",
                    "Berhasil unggah gambar",
                    [
                        { text: "OK" }
                    ]
                )
                setUriPhoto(response.data.data)
            }).catch(error => {
                console.log(error);
            })
        }
    }
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setPhoto(response);
            } else {
                setPhoto()
            }
        });

    }
    const handleCamera = () => {
        launchCamera({ noData: true }, (response) => {
            if (response) {
                setPhoto(response);
            }
        });

    }
    const getBanks = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `my-orders/getBanks`,
            {
                headers: {
                    Origin: HOST,
                    Authorization: `Bearer ${jsonValue}`,
                }
            }
        ).then(response => {
            set_mpBanks(response.data.data.map((item) => (
                { value: item.id, label: item.name }
            )))
        }).catch(error => {
            console.log(error);
        })
    }



    const handleSave = async () => {
        let param = {
            account_name: nama,
            account_number: noRek,
            mp_bank_id: idBank,
            mp_payment_id: data.payment_id,
            payment_proof: uriPhoto,
        }

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.post(API_URL + `my-orders/savePaymentProof`, param, {
            headers: {
                "Origin": "http://localhost:3002/",
                "Authorization": `Bearer ${jsonValue}`,
            }
        }).then(response => {
            setModal(false);
            getManualTransferDestination();
            navigation.navigate("TransactionList")
        }).catch(error => {
            console.log(error.response.data.message);
        })

    }

    return (
        <View>
            <View style={styles.section}>
                <View style={[styles.card, { width: "95%", padding: 20 }]}>
                    <Text style={styles.h6}>
                        Total Pembayaran
                    </Text>
                    <Text style={[styles.h6, { fontWeight: "700", marginTop: 10 }]}>
                        Rp.{CurrencyFormat(data?.payment_total)}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("DetailOrder")}
                            style={{ borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 50 }}
                        >
                            <Text style={{ textAlign: "center", fontSize: 16 }}>
                                Cek Status Pemesanan
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModal(true)}
                            style={{
                                backgroundColor: "#F18910",
                                padding: 10,
                                borderRadius: 50,
                                marginTop: 10
                            }}
                        >
                            <Text style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}>
                                Unggah bukti
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ModalDialog
                onShow={modal}
                onHide={() => setModal(false)}
                contentHeader={`Unggah bukti ${data?.payment_invoice_number}`}
                contentText={
                    <ScrollView>
                        <Text style={styles.h6}>
                            Bukti pembayaran
                        </Text>
                        <View style={[styles.section, { marginVertical: 10 }]}>
                            <Image
                                source={{ uri: photo?.assets[0]?.uri }}
                                style={{ width: 150, height: 150, backgroundColor: "#A6A6A6", borderRadius: 5, }}
                            />
                            <View style={{ marginLeft: 20, alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity
                                    onPress={handleCamera}
                                    style={{
                                        borderColor: "#F18910",
                                        borderWidth: 1,
                                        height: 30,
                                        width: 100,
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{ textAlign: "center" }}>
                                        Buka Kamera
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleChoosePhoto}
                                    style={{
                                        backgroundColor: "#F18910",
                                        height: 30,
                                        width: 100,
                                        padding: 5,
                                        marginVertical: 10,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{ textAlign: "center", color: "#FFF" }}>
                                        Pilih Gambar
                                    </Text>
                                </TouchableOpacity>
                                {!uriPhoto &&
                                    <TouchableOpacity
                                        onPress={handleUploadPhoto}
                                        style={{
                                            backgroundColor: "green",
                                            height: 30,
                                            width: 100,
                                            padding: 5,
                                            marginVertical: 10,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", color: "#FFF" }}>
                                            Unggah Gambar
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <Text style={{ fontSize: 14, color: "red" }}>
                            Sebelum klik kirim , unggah gambar terlebih dahulu
                        </Text>
                        <TextInput
                            onChangeText={(e) => setNama(e)}
                            mode="outlined"
                            label="Nama"
                            placeholder="Name Account"
                        />
                        <TextInput
                            onChangeText={(e) => setNorek(e)}
                            mode="outlined"
                            label="Nomor Rekening"
                            placeholder="Account Number"
                        />
                        <Select
                            onValueChange={option => setIdBank(option)}
                            items={mpBanks}
                            placeholder={{ label: "Nama Bank", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <View style={[styles.section, { justifyContent: "space-between" }]}>
                            <TouchableOpacity
                                onPress={() => setModal(false)}
                                style={{
                                    borderColor: "#F18910",
                                    borderWidth: 1,
                                    width: "45%",
                                    padding: 5,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    Batal
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSave}
                                style={{
                                    backgroundColor: "#F18910",
                                    width: "45%",
                                    padding: 5,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                }}
                                disabled={!uriPhoto ? true : false}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "#FFF"
                                    }}
                                >
                                    Kirim
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                }
            >

            </ModalDialog>
        </View>
    )
}

const styles = StyleSheet.create({
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
        // justifyContent: "center"
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
        backgroundColor: "#A6A6A6",
        borderRadius: 5
    },
    produkImage: {
        marginVertical: 20,
        width: "30%",
        height: 120,
        borderRadius: 10,
        resizeMode: "cover",
        backgroundColor: "#A6A6A6"
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