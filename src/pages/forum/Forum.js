import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import { CurrencyFormat } from '../../components/CurrencyFormat';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { navigate, navigationRef } from '../../navigator/RootNavigation';
import ModalDialog from '../../commons/Modal';
import { Alert } from 'react-native';
import All from './All';
import Information from './Information';
import Knowledge from './Knowledge';

// const Event = () => {
//     <ScrollView>
//         <View>Event</View>
//     </ScrollView>
// }

// const Produk = () => {
//     <ScrollView>
//         <View>Produk</View>
//     </ScrollView>
// }

const renderScene = SceneMap({
    first: All,
    second: Knowledge,
    third: Information,
});


export default function Forum() {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Semua' },
        { key: 'second', title: 'Pengetahuan' },
        { key: 'third', title: 'Informasi' },
    ]);

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );

}

const renderTabBar = props => (
    <TabBar
        // {...props}
        // indicatorStyle={{ backgroundColor: '#F18910' }}
        // style={{ backgroundColor: '#FFF', color: "black", }}
        {...props}
        renderLabel={({ focused, route }) => {
            return (
                <Text style={{ color: "#000" }}>
                    {route.title}
                </Text>
            );
        }}
        indicatorStyle={{ backgroundColor: '#F18910' }}
        style={{ backgroundColor: '#FFF', color: "black", }}
    />
);


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
        borderRadius: 10,
        shadowColor: "#666",
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