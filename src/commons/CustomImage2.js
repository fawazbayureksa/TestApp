import React, { PureComponent, useEffect, useState } from "react";
import axios from 'axios';
import Config from "./Config"
import { View, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";


export const PublicStorageFolderPath = {
    cms: 'cms',
    products: 'marketplace/products',
    customer: 'customer',
    product_review: 'product_review',
    seller: 'seller',
    voucher: 'marketplace/voucher',
    menu: 'menu',
    membership: 'membership'
}


const CustomImage = (props) => {
    const [filename, set_filename] = useState('')

    useEffect(() => {
        getImageUrl()
    }, [props.filename])

    const getImageUrl = async () => {
        if (!props.folder || !props.filename) {
            set_filename('')
            return;
        }

        let params = {
            filename: props.filename
        }

        // console.log(params)
        // return
        let url = "https://tsi-1.oss-ap-southeast-5.aliyuncs.com/public/membership/"
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(await AsyncStorage.getItem("token"))}`,
            },
            params
        }).then(response => {
            set_filename(response.data)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    console.log(filename)

    return (


        <Image
            style={props.style}
            source={filename}
        />


    )
}

export default CustomImage