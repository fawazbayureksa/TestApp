import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function DetailForum() {
    const [reply, setReply] = React.useState()
    return (
        <ScrollView style={{ backgroundColor: "#FFF" }}>
            <View style={[styles.container]}>
                <View style={[styles.card, { marginTop: 20, width: "85%" }]}>
                    <View style={styles.sectionRow}>
                        <View style={{ alignSelf: "center", flexDirection: "row" }}>
                            <Image
                                style={styles.profil}
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                                }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 10 }}>TiLung Sukses Jaya</Text>
                                <Text style={{ fontSize: 8, color: "gray" }}>1 Jam</Text>
                            </View>
                            <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
                                <View style={{ backgroundColor: "#F18910", borderRadius: 50, marginLeft: 5 }}>
                                    <Icon size={12} color="#fff" name="done" />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Icon size={24} color="gray" name="turned-in" />
                        </View>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 10 }}>
                        Mana yang lebih hemat? Kompor gas VS Kompor Listrik
                    </Text>
                    <Image
                        style={styles.banner}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1523800378286-dae1f0dae656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
                        }}
                    />
                    <Text style={{ fontSize: 14, color: "#404040", textAlign: "justify", fontWeight: "400", lineHeight: 25 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imperdiet congue ante quis elementum. In ultrices massa quis sapien pretium mollis. Duis hendrerit magna leo, sed dapibus ante interdum nec. Proin at felis volutpat, vulputate diam et, tempor sapien. Praesent at purus lorem. Duis ac nunc magna. Phasellus efficitur enim libero. Donec lectus leo, dapibus ac massa ut, pellentesque consectetur dolor. Cras purus mauris, tempor nec lorem eu, maximus fringilla eros. Curabitur consectetur malesuada pharetra. Curabitur eget venenatis purus.
                    </Text>
                    <View style={styles.sectionRow}>
                        <View style={[styles.rounded]}>
                            <Text style={{ color: "gray" }}>Resep</Text>
                        </View>
                        <View style={[styles.rounded]}>
                            <Text style={{ color: "gray" }}>Komparasi</Text>
                        </View>
                        <View style={[styles.rounded]}>
                            <Text style={{ color: "gray" }}>Tutorial</Text>
                        </View>
                    </View >
                    <View style={styles.sectionRow}>
                        <View style={styles.row}>
                            <Icon size={24} color="gray" name="thumb-up" />
                            <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>250</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon size={24} color="gray" name="reply" />
                            <Text style={[styles.h6, { marginRight: 10, color: "#333" }]}>530</Text>
                            <Icon size={24} color="gray" name="share" />
                            <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>37</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.container]}>
                <Text style={{ fontSize: 14, marginLeft: 10 }}>
                    Berikan Komentar
                </Text>
                <View style={{ width: "100%", marginLeft: 10 }}>
                    <TextInput
                        style={{ marginVertical: 10, width: "85%" }}
                        multiline
                        onChangeText={(e) => setReply(e)}
                        numberOfLines={5}
                        mode="outlined"
                        label="Tulis Komentar Anda ..."
                        placeholder="tulis komentar"
                    />
                </View>
                <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 10 }}>
                    37 Komentar
                </Text>
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
                    <Text style={{ color: "gray" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imper...
                    </Text>
                    <View style={styles.sectionRow}>
                        <View style={styles.row}>
                            <Icon size={24} color="gray" name="thumb-up" />
                            <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>250</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon size={24} color="gray" name="reply" />
                            <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>530</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.card, { width: "85%" }]}>
                    <View style={styles.sectionRow}>
                        <View style={{ flexDirection: "row" }}>
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
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Icon size={24} color="gray" name="delete" />
                        </View>
                    </View>
                    <View style={[styles.card, { width: "90%", backgroundColor: "#F5F5F5" }]}>
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
                        <Text style={{ color: "gray" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imper...
                        </Text>
                    </View>
                    <Text style={{ color: "gray" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imper...
                    </Text>
                    <View style={styles.sectionRow}>
                        <View style={styles.row}>
                            <Icon size={24} color="gray" name="thumb-up" />
                            <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>250</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon size={24} color="gray" name="reply" />
                            <Text style={[styles.h6, { marginLeft: 10, color: "#333" }]}>530</Text>
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView >
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: "#F5F5F5"
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
    banner: {
        marginVertical: 10,
        width: "100%",
        height: 181,
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
        borderRadius: 0,
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