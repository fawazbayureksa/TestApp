import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable, Button, Alert, TouchableOpacity } from 'react-native';
import ModalDialog from '../../commons/Modal';
import { CurrencyFormat } from '../../components/CurrencyFormat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"

const MembershipRows = ({ item, type, submit, history }) => {
    const [modalDetailVoucher, setModalDetailVoucher] = useState(false);
    const [modalTukarPoint, setModalTukarPoint] = useState(false);
    const [submitting, setSubmitting] = useState()
    const regex = /<[^>]*>/mgi

    const handleSubmit = async () => {
        setSubmitting(true)
        let param = {
            mp_voucher_id: item.id,
        }

        await axios.post(API_URL + `membership/buyVoucherWithPoints?`, param,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
                }
            }
        ).then(res => {
            console.log(res.data)
            if (res.data.message == "Successful") {
                setModalTukarPoint(false)
                Alert.alert(
                    "",
                    "Berhasil tukar Point",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
                submit()
                history()

            }
        })
            .catch(function (error) {
                console.log(error);
                Alert.alert(
                    "",
                    "Point Tidak Cukup",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )

            })




    }

    const getMinPurchase = () => {
        if (!item.conditions) return null
        let min_purchase = item.conditions.find(x => x.type == "purchase" && x.purchase_trigger === true)
        if (min_purchase) return min_purchase.value

        return 0
    }

    const editButton = () => {
        return type === 0
    }

    return (
        <View style={styles.section4} key={item.id}>
            <Image
                style={styles.imageVoucher}
                source={{
                    uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/voucher/${item.image}`,
                }}
            />
            <View
                style={{
                    marginLeft: 10,
                    width: "60%",
                    height: "auto",
                }}>
                <Text
                    style={{
                        fontSize: 18,
                        color: "black",
                        fontWeight: "600"
                    }}>
                    {item.name}
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: "#A6A6A6"
                    }}>
                    {item.code}
                </Text>
                <Text
                    style={{
                        color: "#F18910",
                        fontSize: 18,
                        fontWeight: "700"
                    }}>
                    {CurrencyFormat(getMinPurchase())} Poin
                </Text>
                <Pressable
                    onPress={() => setModalDetailVoucher(true)}
                >
                    <Text
                        style={{
                            color: "#F18910",
                            fontSize: 18
                        }}>
                        Detail
                    </Text>
                </Pressable>
                <View style={{ width: "60%", marginTop: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: editButton() === true ? "grey" : "#F18910",
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                        }}
                        onPress={() => setModalTukarPoint(true)} disabled={editButton() === true ? true : false}>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "500",

                            }}
                        >
                            Tukar Point
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ModalDialog
                onShow={modalDetailVoucher}
                onHide={() => setModalDetailVoucher(false)}
                contentHeader={"Detail"}
                contentText={
                    <Text style={{ fontSize: 16, color: "black" }}>
                        {item?.informations[0].terms_and_conditions.replace(regex, "")}
                    </Text>
                }
            >
            </ModalDialog>
            <ModalDialog
                onShow={modalTukarPoint}
                onHide={() => setModalTukarPoint(false)}
                contentText={
                    <View >
                        <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
                            {item.name}
                        </Text>
                        <Text style={{ color: "#F18910", fontSize: 16 }}>
                            {CurrencyFormat(getMinPurchase())} Poin
                        </Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginTop: 30,
                            height: 50,
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: "45%",
                                    backgroundColor: "#A6A6A6",
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onPress={() => setModalTukarPoint(false)}
                            >
                                <Text style={{ fontSize: 16, color: "#FFF" }}>Nanti Saja</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: "45%",
                                    backgroundColor: "#F18910",
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onPress={handleSubmit}
                            >
                                <Text style={{ fontSize: 16, color: "#FFF" }}>Beli Voucher</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                contentHeader={
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}>
                            Yakin Ingin Membeli Voucher Ini?
                        </Text>
                    </View>
                }
            >
            </ModalDialog>


        </View>
    );
}

export default MembershipRows;


const styles = StyleSheet.create({

    imageVoucher: {
        width: "40%",
        height: 100,
        borderRadius: 5,
        resizeMode: "cover",
        alignSelf: "center",
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        textDecorationLine: "underline",
    },
})