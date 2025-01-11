import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalTheme } from '../../constant/theme'

const ServiceCard = ({ item }) => {
    return (
        <Pressable style={styles.container}>
            <View style={styles.imageCon}>
                <Image
                    source={{ uri: `https://a146-102-89-47-115.ngrok-free.app/storage/${item.image}` }}
                    style={styles.image}
                    resizeMode="cover"
                />


            </View>
            <View style={styles.descInfo}>

                <Text style={styles.name}>{item.service.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text>{item.description}</Text>
            </View>
        </Pressable>
    )
}

export default ServiceCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        borderWidth: 1,
        borderColor: globalTheme.colors.border,
        flexDirection: 'column',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        overflow: 'hidden'
    },
    imageCon:
    {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 500,
        height: '100%'
    },
    descInfo: {
        padding: 10
    },
    name: {
        fontSize: 24
    },
    price: {
        fontSize: 20
    }
})