import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function CustomImage(props) {
    // const [filename, set_filename] = useState('')
    // const baseUrl = `https://tsi-cms.oss-ap-southeast-5.aliyuncs.com/public/`;

    // useEffect(() => {
    //     // getImageUrl()
    // }, [props.filename])

    // const getImageUrl = async () => {
    //     let params = {
    //         folder: props.folder,
    //         filename: props.filename
    //     }

    //     await axios.get(baseUrl + "images/getPublicUrl",
    //         {
    //             headers: {
    //                 "Origin": "http://localhost:3002/",
    //                 "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
    //             },
    //             params
    //         }
    //     )
    //         .then(response => {
    //             set_filename(response.data)
    //         }).catch(error => {
    //             console.log(error)

    //         })
    // }

    return (

        <View>
            <Image
                style={props.style}
                source={{
                    uri: `https://images.unsplash.com/photo-1654190556461-3919acf03f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`
                }}
            />
        </View>
    )
}
