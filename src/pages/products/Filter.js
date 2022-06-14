import CheckBox from "@react-native-community/checkbox";
import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Filter() {

    // const [isSelected, setSelection] = useState(false);

    return (

        <List.AccordionGroup>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 18, color: "#000", fontWeight: "500", textAlign: "center" }}>
                    Filter
                </Text>
            </View>
            <List.Accordion title="Kategori" id="1">
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Cook Cuisine
                        </Text>
                    </View>
                }
                />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Cold Preserve
                        </Text>
                    </View>
                } />
            </List.Accordion>
            <List.Accordion title="Wilayah" id="2" >
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Jakarta Pusat
                        </Text>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Jakarta Barat
                        </Text>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Jakarta Selatan
                        </Text>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Jakarta Utara
                        </Text>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>
                            Jakarta Timur
                        </Text>
                    </View>
                } />
            </List.Accordion>
            <List.Accordion title="Harga" id="3">
                <List.Item title="Item 2" />
            </List.Accordion>
            <List.Accordion title="Peringkat" id="4">
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                        </View>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                        </View>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                        </View>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Icon name="star-border" size={24} color="#000" />
                            <Icon name="star-border" size={24} color="#000" />
                        </View>
                    </View>
                } />
                <List.Item title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <CheckBox
                            value={false}
                            onValueChange
                            style={styles.checkbox}
                        />
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Icon name="star-border" size={24} color="#000" />
                        </View>
                    </View>
                } />
            </List.Accordion>
        </List.AccordionGroup>

        // <View style={[styles.container, styles.navigationContainer]}>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        marginHorizontal: 8,
        fontSize: 16
    },
});
