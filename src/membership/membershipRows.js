import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import CustomImage from '../commons/CustomImage';
import ModalDialog from '../commons/Modal';

const MembershipRows = () => {
    const [modalDetail, setModalDetail] = useState(false);


    const handleSubmit = () => {
        setModalDetail(true)
    }


    return (
        <View style={styles.section4}>
            <Image
                style={styles.imageVoucher}
                source={{
                    uri: 'https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                }}
            />
            <View style={{ marginLeft: 10, width: "40%" }}>
                <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>Diskon 40% Hingga Rp 200.000 </Text>
                <Text style={{ fontSize: 16, color: "#A6A6A6" }}>VCH40 </Text>
                <Text style={{ color: "#F18910", fontSize: 18, fontWeight: "700" }}>600 Poin </Text>
                <Pressable
                    onPress={() => setModalDetail(true)}
                >
                    <Text style={{ color: "#F18910", fontSize: 18 }}>
                        Detail
                    </Text>
                </Pressable>
            </View>
            <View style={{ width: "30%", alignSelf: "flex-end" }}>
                <Text numberOfLines={1} style={{ backgroundColor: "#F18910", padding: 10, color: "white", borderRadius: 5, fontSize: 16, fontWeight: "500" }} onPress={handleSubmit}>
                    Tukar Point
                </Text>
            </View>

            <ModalDialog
                onShow={modalDetail}
                onHide={() => setModalDetail(false)}
                contentText="Modal Content"
            >
            </ModalDialog>
        </View>
    );
}

export default MembershipRows;


const styles = StyleSheet.create({

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
        // flexWrap: "wrap"
    },
    section2: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        textDecorationLine: "underline",
    },
})