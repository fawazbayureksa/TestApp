import React, { useState, useEffect } from 'react';
import { FlatList, View, Button, Text, TextInput, StyleSheet, Image, Pressable, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomImage from '../../commons/CustomImage';
import MembershipRows from './membershipRows';
import ModalDialog from '../../commons/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CurrencyFormat } from '../../components/CurrencyFormat';
import { DateTimeFormat } from '../../components/DatetimeFormat';
import moment from 'moment';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { API_URL, HOST } from "@env"
export default function Membership({ navigation }) {



    const [text, onChangeText] = useState();
    const [modalDetail, setModalDetail] = useState(false);
    const [modalTdPoint, setModalTdPoint] = useState(false);
    const [modalPoint, setModalPoint] = useState(false);
    const [modalHistroyActivity, setModalHistoryActivity] = useState(false);
    const [dataVoucherEligible, setDataVoucherEligible] = useState([]);
    const [dataVoucherIneligible, setDataVoucherIneligible] = useState([]);
    const [data, setData] = useState();
    const [perPage, setPerPage] = useState(6);
    const [lastCashPointLogID, setlastCashPointLogID] = useState()
    const [lastLoyaltyPointLogID, setlastLoyaltyPointLogID] = useState()
    const [dataHistory, setDataHistory] = useState([]);


    useEffect(() => {
        if (AsyncStorage.getItem("token") == undefined) {
            navigation.navigate("Login");
        }
        getData();
        getDataVoucher();
        getPointHistory();

    }, []);


    const getData = async () => {

        await axios.get(API_URL + `membership/getMasterData`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
                }
            }
        )
            .then(response => {
                setData(response.data.data)
            }).catch(error => {
                console.log(error)

            })
    }

    const getDataVoucher = async () => {

        await axios.get(API_URL + `membership/getVouchersToRedeem`,
            {
                headers: {
                    "Origin": "http://localhost:3002/",
                    "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
                }
            }
        )
            .then(response => {

                setDataVoucherEligible(response.data.data.eligibleVouchers)
                setDataVoucherIneligible(response.data.data.ineligibleVouchers)
            }).catch(error => {
                console.log(error)

            })
    }

    const getPointHistory = async () => {
        let param = {
            per_page: perPage,
            last_cash_point_log_id: lastCashPointLogID,
            last_loyalty_point_log_id: lastLoyaltyPointLogID
        }
        await axios.get(API_URL + `membership/getPointsHistory?per_page=${perPage}`,
            {
                headers: {
                    "Origin": "http://localhost:3002/",
                    "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
                }
            }, param
        )
            .then(response => {
                let data = response.data.data;
                setDataHistory(data.data)
                setlastCashPointLogID(data.lastCashPointLogID)
                setlastLoyaltyPointLogID(data.lastLoyaltyPointLogID)
            }).catch(error => {
                console.log(error)

            })
    }


    const regex = /<[^>]*>/mgi

    return (
        <SafeAreaView>
            <StatusBar barStyle='light-content' backgroundColor="#ff6f00"></StatusBar>
            <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
                <View style={styles.membership}>
                    <Text style={{ fontSize: 14, color: "black", marginTop: 20 }}>Search</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Cari produk/toko"
                    />
                    <Image
                        style={styles.logo}
                        source={{
                            uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/membership/${data?.customerNextLevel?.banner}`
                        }}
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
                                {(data?.customerLevel?.name) || "-"}
                            </Text>
                            <Pressable onPress={() => setModalDetail(true)}>
                                <Text style={styles.text}>
                                    Detail
                                </Text>
                            </Pressable>
                            <View style={{ marginLeft: 100 }}>
                                <Pressable onPress={() => setModalHistoryActivity(true)}>
                                    <Text>
                                        <Icon size={24} color="white" name="access-time" />
                                    </Text>
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
                                    {(data?.cashPointCustomName) || "-"}
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
                                    {CurrencyFormat(data?.currentCashPoint)}
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
                                {
                                    data?.cashPointExpireSchedule != null
                                        ?
                                        ` ${CurrencyFormat(data?.cashPointExpireSchedule.point * -1)}
                                               Poin akan hangus pada 
                                               ${DateTimeFormat(data.cashPointExpireSchedule.scheduled_time, 0)}
                                            `
                                        :
                                        ""
                                }
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
                                    {data?.currentLoyaltyPoint}
                                </Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 20,
                                    color: "#A6A6A6"
                                }}>
                                    {`/${data?.customerNextLevel?.min_point}`}
                                </Text>
                            </View>
                            <View>
                                <ProgressBar progress={0.1} color="#F18910" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#A6A6A6",
                                    marginTop: 20,
                                    fontWeight: "500"
                                }}>
                                {data?.customerNextLevel?.min_point - data?.currentLoyaltyPoint} Poin lagi untuk naik ke level selanjutnya
                            </Text>
                        </View>
                    </View>

                    {
                        (dataVoucherEligible !== null || dataVoucherIneligible !== null) ?
                            <>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                    color: "black",
                                    marginTop: 20,
                                    paddingRight: 20
                                }}>
                                    Tukar Poin dengan Voucher
                                </Text>
                                {dataVoucherEligible && dataVoucherEligible.map((item) => (
                                    <MembershipRows item={item} submit={getData} key={item.id} history={getPointHistory} />
                                ))}
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                    color: "black",
                                    marginTop: 20,
                                    paddingRight: 20
                                }}>
                                    Tingkatkan Poin untuk Dapatkan Voucher Lainnya
                                </Text>
                                {dataVoucherIneligible && dataVoucherIneligible.map((item) => (
                                    <MembershipRows item={item} submit={getData} type={0} key={item.id} />
                                ))}
                            </>
                            :
                            ""
                    }
                    <ModalDialog
                        onShow={modalDetail}
                        onHide={() => setModalDetail(false)}
                        contentHeader={"Detail Member"}
                        contentText={
                            <Text style={styles.description}>
                                {data?.customerLevel?.description.replace(regex, "")}
                            </Text>
                        }
                    >
                    </ModalDialog>
                    <ModalDialog
                        onShow={modalTdPoint}
                        onHide={() => setModalTdPoint(false)}
                        contentHeader={(data?.cashPointCustomName) || "-"}
                        contentText={
                            <Text style={styles.description}>
                                {data?.cashPointDescription.replace(regex, "")}
                            </Text>
                        }
                    >
                    </ModalDialog>

                    <ModalDialog
                        onShow={modalPoint}
                        onHide={() => setModalPoint(false)}
                        contentHeader={"Poin Loyalitas"}
                        contentText={
                            <Text style={styles.description}>
                                {data?.loyaltyPointDescription.replace(regex, "")}
                            </Text>
                        }
                    >
                    </ModalDialog>
                    <ModalDialog
                        onShow={modalHistroyActivity}
                        onHide={() => setModalHistoryActivity(false)}
                        contentText={
                            <View>
                                {dataHistory && dataHistory.map((item) => (
                                    <View key={item?.id}>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}

                                        >
                                            <View>
                                                <Text style={{
                                                    fontSize: 20,
                                                    fontWeight: "600",
                                                    color: "black"
                                                }}>
                                                    Transaksi: {item?.description}
                                                </Text>
                                                <Text style={{ color: "black" }}>
                                                    {moment(item?.created_at).format("DD/MM/YYYY")}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 14, color: "black" }}>
                                                    {(item?.type == "cash") ? data?.cashPointCustomName : (item?.type == "loyalty") ? "Poin Loyalitas" : "-"}
                                                </Text>
                                                <Text
                                                    style={{ color: item.point > 0 ? "green" : "red", fontSize: 18, alignSelf: "flex-end" }}
                                                >
                                                    {(item?.point > 0) ? `+${CurrencyFormat(item?.point)}` : CurrencyFormat(item?.point)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'gray',
                                                borderBottomWidth: 1,
                                                marginVertical: 10
                                            }}
                                        />
                                    </View>

                                ))}
                            </View>

                        }
                        contentHeader={"Riwayat Aktivitas Poin"}
                    >
                    </ModalDialog>
                </View>
            </ScrollView >
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
        marginTop: 0,
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
