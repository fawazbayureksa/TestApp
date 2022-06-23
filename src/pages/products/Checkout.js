import { View, StyleSheet, TextInput, Image, ScrollView, Button, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Select from 'react-native-picker-select';
import { Text } from 'react-native-paper';
import ModalDialog from '../../commons/Modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, HOST } from "@env"
import IsEmpty from '../../commons/IsEmpty';
import { CurrencyFormat } from '../../components/CurrencyFormat';

export default function Checkout({ navigation }) {
    const [searchQuery, setSearchQuery] = useState()
    const [isSelected, setSelection] = useState(false);
    const [kurirList, setKurirList] = useState([])
    const [durasi, setDurasi] = useState([
        { label: 'No Item', value: '1' },
    ])
    const [modalVoucher, setModalVoucher] = useState(false)
    const [modalAddress, setModalAddress] = useState(false)
    const [dataCart, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [address, setCostumerAddress] = useState()
    const [addressSelected, setCostumerAddressSelected] = useState()
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalEditAdrress, setModalEditAddress] = useState(false)
    const [modalAddAdrress, setModalAddAddress] = useState(false)

    const [receiver_name, set_receiver_name] = useState('');
    const [receiver_phone, set_receiver_phone] = useState('');
    const [city, set_city] = useState('')
    const [subdistrict, set_subdistrict] = useState('')
    const [province, set_province] = useState('');
    const [postal_code, set_postal_code] = useState('');
    const [address_name, set_address_name] = useState('');
    const [address_, set_address] = useState('');
    const [provinces, set_provinces] = useState([]);
    const [cities, set_cities] = useState([]);
    const [subdistricts, set_subdistricts] = useState([]);
    const [idAddress, setIdAddress] = useState()
    const [is_main, set_ismain] = useState(false)
    const [selectedKurir, setSelectedKurir] = useState()
    const [pengiriman, setPengiriman] = useState([])
    const [hargaKirim, setHargaKirim] = useState(0)
    const [kurirType, setKurirType] = useState()


    useEffect(() => {
        calculateTotalPrice();
        getMasterData();
        getCustomerAddresses();
        getProvisi();
    }, []);


    const getMasterData = async () => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `checkout/getMasterData`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        ).then((response) => {
            setData(response.data.data.data)
            response.data.data.data.map((item) => {
                setKurirList(
                    item.couriers.map((kurir) =>
                    ({
                        value: kurir.key,
                        label: kurir.name
                    })
                    )
                );
            })

        }).catch(error => {
            console.log(error)

        })
    }

    const setDefaultAddress = async (id) => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `profile/address/setDefault`
        let data = {
            mp_customer_address_id: id
        }
        await axios.post(url, data,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        ).then(res => {
            Alert.alert(
                "",
                `${res.data.message}`,
                [
                    { text: "OK" }
                ]
            )

            setModalEditAddress(false)
            setModalAddress(false)
            getCustomerAddresses()
        }).catch((error) => {
            console.log(error)
        })
    }


    const getCustomerAddresses = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `profile/address/get`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        ).then(response => {
            let address_selected = null;
            response.data.data.forEach(value => {
                if (value.is_main === true) address_selected = value;
            });
            setCostumerAddressSelected(address_selected)
            setCostumerAddress(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }


    const calculateTotalPrice = () => {
        let total_price = 0

        for (const datum of dataCart) {
            for (const cart of datum.carts) {
                total_price += cart.mp_product_sku.price * cart.quantity
            }
        }
        setTotalPrice(total_price)
    }

    const handleModal = (record) => {
        setModalEditAddress(true)
        setModalAddress(false)
        setIdAddress(record.id)
        set_receiver_name(record.receiver_name)
        set_address_name(record.address_name)
        set_postal_code(record.postal_code)
        set_city(record.city);
        set_subdistrict(record.subdistrict);
        set_province(record.province);
        set_address_name(record.address_name);
        set_address(record.address);
        set_receiver_phone(record.receiver_phone);
        set_ismain(record.is_main)
    }

    const handleModalAdd = () => {
        setModalAddress(false)
        setModalAddAddress(true)
        setIdAddress()
        set_receiver_name()
        set_address_name()
        set_postal_code()
        set_city();
        set_subdistrict();
        set_province();
        set_address_name();
        set_address();
        set_receiver_phone();
        set_ismain()
    }


    const getProvisi = async () => {
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.get(API_URL + `profile/address/getProvince`,
            {
                headers: {
                    "Origin": HOST,
                    "Authorization": `Bearer ${jsonValue}`,
                }
            }
        ).then(response => {
            set_provinces(response.data.data)
        }).catch(error => {
            console.log(error);
        })

    }


    const handleProvinceSelect = async (option) => {

        let provinsi_name = provinces?.find(obj => obj.value === option)

        set_province(provinsi_name.label)

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `profile/address/getCityByProvince`
        let data = {
            mp_province_name: provinsi_name.label
        }
        await axios.post(url, data, {
            headers: {
                "Origin": HOST,
                "Authorization": `Bearer ${jsonValue}`,
            }
        }).then(res => {
            set_cities(res.data.data)
        }).catch(error => {
            console.log(error)
        })
    }


    const handleCitySelect = async (option) => {

        let city_name = cities?.find(obj => obj.value === option)

        set_city(city_name.label);

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `profile/address/getSubdistrictByCity`

        let data = {
            mp_city_name: city_name.label
        }
        await axios.post(url, data, {
            headers: {
                "Origin": HOST,
                "Authorization": `Bearer ${jsonValue}`,
            }
        }).then(res => {
            console.clear()
            set_subdistricts(res.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleSubdistictSelect = (value) => {
        let sub_name = subdistricts?.find(obj => obj.value === value)
        set_subdistrict(sub_name?.label)

    }

    const handleAddAddress = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `profile/address/add`
        let data = {
            receiver_name: receiver_name,
            receiver_phone: receiver_phone,
            city: city,
            subdistrict: subdistrict,
            province: province,
            postal_code: postal_code,
            address_name: address_name,
            address: address_,
            is_main: false,
            lng: null,
            lat: null
        }
        let config = {
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }

        await axios.post(url, data, config).then(res => {
            console.log(res.data.message)
            setModalAddAddress(false)
            Alert.alert(
                "",
                "Berhasil Tambah alamat",
                [
                    { text: "OK" }
                ]
            )
            getCustomerAddresses()

        }).catch((error) => {
            console.log(error)
        })
    }
    const handleSaveAddress = async () => {

        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        let url = API_URL + `profile/address/update`
        let data = {
            mp_customer_address_id: idAddress,
            receiver_name: receiver_name,
            receiver_phone: receiver_phone,
            city: city,
            subdistrict: subdistrict,
            province: province,
            postal_code: postal_code,
            address_name: address_name,
            address: address_,
            is_main: false,
            lng: null,
            lat: null
        }
        let config = {
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }

        await axios.post(url, data, config).then(res => {
            console.log(res.data.message)
            setModalEditAddress(false)
            Alert.alert(
                "",
                "Berhasil ubah alamat",
                [
                    { text: "OK" }
                ]
            )
            getCustomerAddresses()

        }).catch((error) => {
            console.log(error)
        })
    }

    const handleChangeKurir = async (option, index) => {
        setSelectedKurir(option)
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        const listData = [...dataCart]

        // dataCart.push(listData[index], {
        //     courier_selected: option,
        //     courier_type_selected: null,
        //     courier_types: [],
        //     courier_error: ""
        // })

        // console.log(dataCart)

        let idSeller = listData[index].seller.id

        let url = API_URL + `checkout/getCourierTypes`

        await axios.get(url, {
            params: {
                mp_seller_id: idSeller,
                mp_courier_key: option,
                mp_customer_address_id: addressSelected.id
            },
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }).then(res => {
            setDurasi(
                res.data.data.costs.map((item) =>
                ({
                    value: item.service,
                    label: `${item.description} (Rp${CurrencyFormat(item.cost[0].value)})`,
                })
                )
            )
            setPengiriman(
                res.data.data.costs.map((item) => item)
            )

        }).catch(error => {
            console.log(error);
        })
    }

    const handleChangeDurasi = (value) => {
        setKurirType(value)
        let ongkos = []

        ongkos = pengiriman.find((obj) => obj.service === value)

        setHargaKirim(ongkos?.cost[0]?.value)

    }



    const checkout = async () => {

        const getCartIds = (item) => {
            let ids = [];
            for (const cart of item) {
                for (const i of cart.carts) {
                    ids.push(i.id)
                }
            }
            return ids
        }

        let params = {
            mp_customer_address_id: addressSelected.id,
            voucher_customer_ids: [],
            transactions: dataCart.map((item) => (
                {
                    cart_ids: getCartIds(dataCart),
                    mp_courier_key: selectedKurir,
                    mp_courier_type_key: kurirType,
                    mp_seller_id: item.seller.id,
                    shipping_fee: hargaKirim,
                }
            ))
        }

        let config = {
            headers: {
                Origin: HOST,
                Authorization: `Bearer ${jsonValue}`,
            }
        }
        // console.log(params)
        // return
        let jsonValue = JSON.parse(await AsyncStorage.getItem("token"))

        await axios.post(API_URL + `checkout/save`,
            {
                mp_customer_address_id: addressSelected.id,
                voucher_customer_ids: [],
                transactions: dataCart.map((item) => (
                    {
                        cart_ids: getCartIds(dataCart),
                        mp_courier_key: selectedKurir,
                        mp_courier_type_key: kurirType,
                        mp_seller_id: item.seller.id,
                        shipping_fee: hargaKirim,
                    }
                ))
            },
            {
                headers: {
                    Origin: HOST,
                    Authorization: `Bearer ${jsonValue}`,
                }
            }).then(response => {
                console.log(response.data.data)
                console.log(response.data.message)

                navigation.navigate("CheckoutPay", {
                    invoice_number: response.data.data
                })
            }).catch(error => {
                console.log(error.response.data.message);
            })
    }


    return (
        <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                <Text style={{ marginTop: 10, fontSize: 18, marginLeft: 10, marginVertical: 10 }}>
                    Checkout
                </Text>
                {dataCart.length > 0 &&
                    <>
                        {/* Alamat Saya */}
                        <View style={[styles.card, { width: "87%" }]}>
                            <Text style={{ fontSize: 16 }}>Alamat Pengiriman</Text>
                            <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />

                            <View style={[styles.section, { justifyContent: "space-between" }]}>
                                <View>
                                    <Text style={[styles.h6, { fontWeight: "600" }]}>
                                        {addressSelected?.receiver_name}  ({addressSelected?.address_name}) | {addressSelected?.receiver_phone}
                                    </Text>
                                    <Text style={styles.h6}>
                                        {addressSelected?.address}
                                    </Text>
                                    <Text style={styles.h6}>
                                        {`${addressSelected?.subdistrict} , ${addressSelected?.city} ,${addressSelected?.province}`}
                                        {/* Grogol Petamburan, Jakarta Barat, 11440 */}
                                    </Text>
                                    <Text style={styles.h6}>
                                        {addressSelected?.postal_code}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ borderWidth: 1, borderColor: "#F18910", padding: 10, borderRadius: 10, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => setModalAddress(true)}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 18 }}>
                                        Pilih alamat lain
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Pesanan Anda */}
                        {dataCart && dataCart.map((cart, index) => (
                            <>
                                <View style={[styles.card, { width: "87%" }]}>
                                    <Text style={{ fontSize: 16 }}>Pesanan anda</Text>
                                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                                    <View style={[styles.section, { justifyContent: "space-between" }]}>
                                        {cart.carts.map((item) => {
                                            return (
                                                <View style={[styles.section, { justifyContent: "space-between" }]}>
                                                    <Image
                                                        style={styles.categoryImage}
                                                        source={{
                                                            uri: `https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/marketplace/products/${item.mp_product.mp_product_images[0].filename}`
                                                        }}
                                                    />
                                                    <Text style={{ alignSelf: "center", width: 150, textAlign: "center" }} >
                                                        {item.mp_product.slug_name}
                                                    </Text>
                                                    <View style={{ alignSelf: "center" }}>
                                                        <Text style={{ fontWeight: "500" }}>
                                                            {item.quantity} Pcs
                                                        </Text>
                                                        <Text style={{ fontWeight: "700" }}>
                                                            Rp.{CurrencyFormat(item.quantity * item.mp_product_sku.price)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                                {/* Metode Pengiriman  */}
                                <View style={[styles.card, { width: "87%" }]}>
                                    <Text style={{ fontSize: 16 }}>Metode Pengiriman</Text>
                                    <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} />
                                    <View style={[styles.section, { justifyContent: "space-between", flexDirection: "column" }]}>
                                        <View style={pickerSelectStyles.inputAndroid}>
                                            <Select
                                                onValueChange={(value) => handleChangeKurir(value, index)}
                                                items={kurirList}
                                                placeholder={{ label: "Pilih Kurir", value: null }}
                                                useNativeAndroidPickerStyle={true}
                                            />
                                        </View>
                                        <View style={pickerSelectStyles.inputAndroid}>
                                            <Select
                                                onValueChange={(value) => handleChangeDurasi(value)}
                                                items={durasi}
                                                placeholder={{ label: "Pilih Durasi Pengiriman", value: null }}
                                                useNativeAndroidPickerStyle={true}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </>
                        ))}
                        {/* Voucher Diskon */}
                        <View style={[styles.card, { width: "87%" }]}>
                            <Text style={{ fontSize: 16, fontWeight: "700" }}>Voucher Diskon</Text>
                            <Pressable onPress={() => setModalVoucher(true)}>
                                <Text style={{ fontSize: 16, textAlign: "center", color: "#F18910", marginVertical: 10 }}>Mau voucher lain ?</Text>
                            </Pressable>
                            <Text style={{ fontSize: 16, fontWeight: "700" }}>Ringkasan</Text>
                            {/* <View style={{ borderWidth: 1, color: "#A6A6A6", marginVertical: 10 }} /> */}
                            <View style={styles.sectionRow}>
                                <Text style={styles.h6}>
                                    Total Harga
                                </Text>
                                <Text style={[styles.h6, { fontWeight: "500" }]}>
                                    Rp.{CurrencyFormat(totalPrice)}
                                </Text>
                            </View>
                            <View style={styles.sectionRow}>
                                <Text>
                                    Biaya Kirim
                                </Text>
                                <Text style={[styles.h6, { fontWeight: "500" }]}>
                                    Rp.{CurrencyFormat(hargaKirim)}
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
                                <Text style={styles.h6}>
                                    Total Pembayaran
                                </Text>
                                <Text style={[styles.h6, { fontWeight: "700" }]}>
                                    Rp.{CurrencyFormat(totalPrice + hargaKirim)}
                                </Text>
                            </View>
                            <View>
                                <Pressable
                                    onPress={checkout}
                                    style={{ backgroundColor: "#F18910", height: 35, borderRadius: 5, marginTop: 10, justifyContent: "center", flex: 1, alignItems: "center" }} >
                                    <Text style={{ fontSize: 20, color: "white" }}>
                                        Lanjutkan Membeli
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </>
                }
            </View>
            {/* </View > */}
            <ModalDialog
                onShow={modalEditAdrress}
                onHide={() => setModalEditAddress(false)}
                contentHeader={"Ganti Alamat"}
                contentText={
                    <ScrollView style={{ height: 500 }}>
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Nama Alamat
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_address_name(e)}
                            value={address_name}
                            placeholder="Masukkan Alamat"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Nama Penerima
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_receiver_name(e)}
                            value={receiver_name}
                            placeholder="Masukkan Nama Penerima"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Nomor Telepon
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_receiver_phone(e)}
                            value={receiver_phone}
                            placeholder="Masukkan Nomor Telepon"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Provinsi
                        </Text>
                        <Select
                            onValueChange={option => { set_city(""); set_subdistrict(""); handleProvinceSelect(option) }}
                            items={provinces}
                            placeholder={{ label: "Provinsi", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Kota
                        </Text>
                        <Select
                            onValueChange={option => handleCitySelect(option)}
                            items={cities}
                            placeholder={{ label: "Kota", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Kecamatan
                        </Text>
                        <Select
                            onValueChange={option => handleSubdistictSelect(option)}
                            items={subdistricts}
                            placeholder={{ label: "Kecamatan", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Alamat
                        </Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            style={[styles.input, { height: 80 }]}
                            onChangeText={(e) => set_address(e)}
                            value={address_}
                            placeholder="Alamat"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Kode Pos
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_postal_code(e)}
                            value={postal_code}
                            placeholder="Masukkan Kecamatan"
                        />
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={is_main}
                                onValueChange={() => set_ismain(true)}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Tandai sebagai default</Text>
                        </View>
                        <View style={{ width: "48%", justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={handleSaveAddress}
                                style={{ backgroundColor: "#F18910", alignItems: "center", padding: 10, borderRadius: 10 }}>
                                <Text>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                }
            />
            <ModalDialog
                onShow={modalAddAdrress}
                onHide={() => setModalAddAddress(false)}
                contentHeader={"Tambahkan Alamat"}
                contentText={
                    <ScrollView style={{ height: 500 }}>
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Nama Alamat
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_address_name(e)}
                            value={address_name}
                            placeholder="Masukkan Alamat"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Nama Penerima
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_receiver_name(e)}
                            value={receiver_name}
                            placeholder="Masukkan Nama Penerima"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Nomor Telepon
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_receiver_phone(e)}
                            value={receiver_phone}
                            placeholder="Masukkan Nomor Telepon"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Provinsi
                        </Text>
                        <Select
                            onValueChange={option => { set_city(""); set_subdistrict(""); handleProvinceSelect(option) }}
                            items={provinces}
                            placeholder={{ label: "Provinsi", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Kota
                        </Text>
                        <Select
                            onValueChange={option => handleCitySelect(option)}
                            items={cities}
                            placeholder={{ label: "Kota", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Kecamatan
                        </Text>
                        <Select
                            onValueChange={option => handleSubdistictSelect(option)}
                            items={subdistricts}
                            placeholder={{ label: "Kecamatan", value: null }}
                            style={styles.input}
                            useNativeAndroidPickerStyle={true}
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Alamat
                        </Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            style={[styles.input, { height: 80 }]}
                            onChangeText={(e) => set_address(e)}
                            value={address_}
                            placeholder="Alamat"
                        />
                        <Text style={{ fontSize: 16, color: "black" }}>
                            Kode Pos
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => set_postal_code(e)}
                            value={postal_code}
                            placeholder="Masukkan Kecamatan"
                        />
                        {/* <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={is_main}
                                onValueChange={() => set_ismain(true)}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Tandai sebagai default</Text>
                        </View> */}
                        <View style={{ width: "48%", justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={handleAddAddress}
                                style={{ backgroundColor: "#F18910", alignItems: "center", padding: 10, borderRadius: 10 }}>
                                <Text>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                }
            />
            <ModalDialog
                onShow={modalVoucher}
                onHide={() => setModalVoucher(false)}
                contentHeader={"Pilih Voucher"}
                contentText={
                    <Text style={{ fontSize: 16, color: "black" }}>

                    </Text>
                }
            />
            < ModalDialog
                onShow={modalAddress}
                onHide={() => setModalAddress(false)}
                contentHeader={"Pilih Alamat Pengiriman"}
                contentText={
                    <ScrollView style={{ height: 500 }}>
                        <View style={{
                            width: 80,
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end"
                        }}
                        >
                            <TouchableOpacity
                                onPress={handleModalAdd}
                                style={{ backgroundColor: "#F18910", borderRadius: 5, padding: 5, }}>
                                <Text style={[styles.h6, { color: "#FFF" }]}>Tambah</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            address && address.map((item) => {
                                return (
                                    <View style={[styles.section, { width: "100%" }]} key={item.id}>
                                        <View style={[styles.card, { width: "95%" }]}>

                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={[styles.h6, { color: "#000", fontWeight: "700" }]}>
                                                    {item.receiver_name} ({item?.address_name}) | {item.receiver_phone}
                                                </Text>
                                                {item.is_main === true &&
                                                    <View style={{ backgroundColor: "#F18910", borderRadius: 5, padding: 5, marginLeft: 10 }}>
                                                        <Text style={{
                                                            color: "white",
                                                        }}>
                                                            default
                                                        </Text>
                                                    </View>
                                                }
                                            </View>
                                            <Text style={[styles.h6, { color: "#000" }]}>
                                                {item.address}
                                            </Text>
                                            <Text style={[styles.h6, { color: "#000" }]}>
                                                {`${item.subdistrict} , ${item.city} ,${item.province}`}
                                            </Text>
                                            <Text style={[styles.h6, { color: "#000" }]}>
                                                {item.postal_code}
                                            </Text>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                                                <TouchableOpacity onPress={() => handleModal(item)}>
                                                    <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                                        UBAH
                                                    </Text>
                                                </TouchableOpacity>
                                                {item.is_main === false &&
                                                    <TouchableOpacity onPress={() => setDefaultAddress(item.id)}>
                                                        <Text style={{ color: "#F18910", fontSize: 16, fontWeight: "600" }}>
                                                            Pilih Sebagai Alamat Default
                                                        </Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView >
                }
            />
        </ScrollView >
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginTop: 10,
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderWidth: 1,
        borderColor: '#F18910',
        borderRadius: 8,
        color: 'black',
        width: "100%",
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});

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