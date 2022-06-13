import React, { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';


const Email = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#333", fontSize: 20 }}>
                Email has been sent
            </Text>
            <View style={{ marginTop: 20, }}>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={{ backgroundColor: "#F18910", fontSize: 18, color: "white", paddingHorizontal: 20, borderRadius: 10, paddingVertical: 10 }}>
                        Masuk
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Email;
