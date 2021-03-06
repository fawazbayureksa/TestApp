import { View, Button, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import Modal from "react-native-modal";
import React from 'react';
import Icon from "react-native-vector-icons/Ionicons"

export default function ModalDialog(
    {
        onShow,
        contentText,
        onHide,
        contentHeader
    }
) {
    return (
        <Modal
            isVisible={onShow}
            animationIn="slideInUp"
            animationInTiming={300}
            animationOut="slideOutDown"
            coverScreen={true}
        >
            <View>

                <View style={styles.modalView}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>
                                {contentHeader}
                            </Text>
                        </View>
                        <View >
                            <Pressable
                                onPress={onHide}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "700", color: "black" }}>
                                    x
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            marginVertical: 10
                        }}
                    />
                    <View style={{ marginTop: 20 }}>
                        {contentText}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        // alignItems: "center",
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