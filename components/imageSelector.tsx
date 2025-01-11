import { useState } from 'react';
import { Image, View, StyleSheet, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalTheme } from '../constant/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function ImagePickerExample({ image, setImage }) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [20, 36],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.btn} onPress={pickImage}>
                <MaterialCommunityIcons name="image-filter-center-focus-strong-outline" size={24} color="black" />
            </Pressable>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <>
                    <Fontisto name="cloud-up" size={24} color="black" />
                    <Text style={{ fontSize: 15 }}>Upload Shop Image</Text>
                    <Text style={{ color: '#ccc' }}>jpg/png should be less than 5mb</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        borderColor: globalTheme.colors.border,
        borderWidth: 1,
        borderRadius: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 150,
    },
    btn: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: globalTheme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.5,
        elevation: 2,
        zIndex: 100,
    },
});
