import React from 'react'
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigate, navigationRef } from '../../navigator/RootNavigation';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import MultiSelect from 'react-native-multiple-select';

export default function CreateThread() {
    const [text, setText] = React.useState()
    const [selectedItems, setSelectedItems] = React.useState([])
    // const multiselect = React.useRef();
    const richText = React.useRef();
    const items = [{
        id: '92iijs7yta',
        name: 'Ondo'
    }, {
        id: 'a0s0a8ssbsd',
        name: 'Ogun'
    }, {
        id: '16hbajsabsd',
        name: 'Calabar'
    }, {
        id: 'nahs75a5sg',
        name: 'Lagos'
    }, {
        id: '667atsas',
        name: 'Maiduguri'
    }, {
        id: 'hsyasajs',
        name: 'Anambra'
    }, {
        id: 'djsjudksjd',
        name: 'Benue'
    }, {
        id: 'sdhyaysdj',
        name: 'Kaduna'
    }, {
        id: 'suudydjsjd',
        name: 'Abuja'
    }
    ];
    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    };

    return (
        <ScrollView style={{ backgroundColor: "#FFF" }}>
            <View style={[styles.container, { marginTop: 10 }]}>
                <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: "600" }}>
                    Judul Thread
                </Text>
                <View style={{ width: "100%", marginLeft: 10 }}>
                    <TextInput
                        style={{ marginVertical: 10, width: "85%", borderColor: "#F5F5F5", borderRadius: 10 }}
                        multiline
                        onChangeText={(e) => setText(e)}
                        numberOfLines={5}
                        mode="outlined"
                        label="Tulis Judul Anda ..."
                        placeholder="Tulis Judul Anda ..."
                    />
                </View>
                <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 10 }}>
                    Kategori
                </Text>
                <View style={{ width: "85%", marginLeft: 10, marginVertical: 10 }}>
                    <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        ref={(component) => { console.log(component) }}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                    <View>

                    </View>
                </View>
                <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 10, marginBottom: 10 }}>
                    Isi Thread
                </Text>
                <SafeAreaView style={{ width: "85%", marginLeft: 10 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <RichEditor
                            ref={richText}
                            onChange={descriptionText => {
                                console.log("descriptionText:", descriptionText);
                            }}
                            // disabled={disabled}
                            // editorStyle={contentStyle} // default light style
                            style={styles.rich}
                            useContainer={true}
                            initialHeight={300}
                            enterKeyHint={'done'}
                            // containerStyle={{borderRadius: 24}}
                            placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum nibh id commodo finibus. Mauris imperdiet congue ante quis elementum. In ultrices massa quis sapien pretium mollis.'}
                            // initialContentHTML={initHTML}
                            // editorInitializedCallback={editorInitializedCallback}
                            // onChange={handleChange}
                            // onHeightChange={handleHeightChange}
                            // onPaste={handlePaste}
                            // onKeyUp={handleKeyUp}
                            // onKeyDown={handleKeyDown}
                            // onInput={handleInput}
                            // onMessage={handleMessage}
                            // onFocus={handleFocus}
                            // onBlur={handleBlur}
                            // onCursorPosition={handleCursorPosition}
                            pasteAsPlainText={true}
                        />
                    </KeyboardAvoidingView>

                    <RichToolbar
                        editor={richText}
                        actions={[actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.insertOrderedList,
                        actions.insertImage,
                        actions.keyboard,
                        ]}
                        iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
                    />
                </SafeAreaView>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#F8931D",
                        height: 40,
                        borderRadius: 10,
                        marginTop: 10,
                        width: "85%",
                        flex: 1,
                        justifyContent: "center", alignItems: "center",
                        shadowColor: "gray",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                    }}
                    onPress
                >
                    <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 14 }}>
                        Kirim
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#FFF",
                        height: 40,
                        borderRadius: 10,
                        marginTop: 10,
                        width: "85%",
                        flex: 1,
                        justifyContent: "center", alignItems: "center",
                        shadowColor: "gray",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                    }}
                    onPress
                >
                    <Text style={{ color: "#F8931D", fontWeight: "600", fontSize: 14 }}>
                        Simpan Sebagai Draft
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    rich: {
        minHeight: 300,
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e3e3e3',
    },
    floatingButton: {
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        position: 'absolute',
        bottom: 20,
        right: 26,
        height: 44,
        backgroundColor: '#F8931D',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
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
    categoryImage: {
        marginVertical: 10,
        width: 100,
        height: 100,
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
        borderRadius: 5,
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