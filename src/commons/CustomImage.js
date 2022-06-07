import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function CustomImage(props) {
    return (

        <View>
            <Image
                style={props.style}
                source={{
                    uri: `${props.filename}`
                }}
            />
        </View>
    )
}
