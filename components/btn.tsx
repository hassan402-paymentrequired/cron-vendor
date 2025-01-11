import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Btn = ({title,...rest }) => {
    return (
        <TouchableOpacity style={styles.button} {...rest} >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Btn

const styles = StyleSheet.create({
       button: {
        backgroundColor: '#013237',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    }
})