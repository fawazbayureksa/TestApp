import React, { PureComponent, useEffect, useState } from "react";
import axios from 'axios';
import Config from "./Config"
import { View, Image } from "react-native"


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

    const getImageUrl = () => {
        if (!props.folder || !props.filename) {
            set_filename('')
            return;
        }

        let params = {
            folder: props.folder,
            filename: props.filename
        }
        let url = `https://tsi-cms.oss-ap-southeast-5.aliyuncs.com/public/` + "images/getPublicUrl"
        axios.get(url, Config({
        }, params))

            .then(response => {
                set_filename(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    return (

        // <img alt={props.alt} src={filename} className={props.className} style={props.style} onLoad={props.onLoad} onError={event => event.target.src = "/images/placeholder.gif"} onClick={props.onClick} />
        <View>
            <Image
                style={props.style}
                source={{
                    uri: `${filename}`
                }}
            />
        </View>
    )
}

export default CustomImage