import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable, Button } from 'react-native';
import CustomImage from '../commons/CustomImage';
import ModalDialog from '../commons/Modal';
import { CurrencyFormat } from '../components/CurrencyFormat';

const MembershipRows = ({ item, type, submit }) => {
    const [modalDetail, setModalDetail] = useState(false);
    const [modalDetailVoucher, setModalDetailVoucher] = useState(false);
    const [modalTukarPoint, setModalTukarPoint] = useState(false);


    const handleSubmit = () => {
        setModalTukarPoint(true)
    }

    const getMinPurchase = () => {
        if (!item.conditions) return null
        let min_purchase = item.conditions.find(x => x.type == "purchase" && x.purchase_trigger === true)
        if (min_purchase) return min_purchase.value

        return 0
    }

    return (
        <View style={styles.section4} key={item.id}>
            <Image
                style={styles.imageVoucher}
                source={{
                    uri: 'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
                    onPress={() => setModalDetail(true)}
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
                    <Text
                        numberOfLines={1}
                        style={{
                            backgroundColor: "#F18910",
                            height: 40,
                            padding: 10,
                            color: "white",
                            borderRadius: 5,
                            fontSize: 16,
                            fontWeight: "500",
                            // marginTop: -40

                        }}
                        onPress={handleSubmit}>
                        Tukar Point
                    </Text>
                </View>
            </View>

            <ModalDialog
                onShow={modalDetail}
                onHide={() => setModalDetail(false)}
                contentText={"Content"}
                contentHeader={"Tentang Member Silver"}
            >
            </ModalDialog>
            <ModalDialog
                onShow={modalTukarPoint}
                onHide={() => setModalTukarPoint(false)}
                contentText={
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
                            Diskon 40% Hingga Rp 200.000
                        </Text>
                        <Text style={{ color: "#F18910", fontSize: 16 }}>
                            600 Poin
                        </Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginTop: 30
                        }}>
                            <View style={{ borderRadius: 20 }}>
                                <Button
                                    onPress={() => setModalTukarPoint(false)}
                                    title="Nanti Saja"
                                    color="#A6A6A6"
                                />
                            </View>
                            <View style={{ borderRadius: 20 }}>
                                <Button
                                    title="Beli Voucher"
                                    color="#F18910"
                                />
                            </View>
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
        alignSelf: "center"
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
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        textDecorationLine: "underline",
    },
})