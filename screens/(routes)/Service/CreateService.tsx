import { Button, StyleSheet, Text, TextInput, View, Switch, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalTheme } from '../../../constant/theme'
import FormInputGroup from '../../../components/form-input-group'
import Input from '../../../components/service/input'
import RNPickerSelect from 'react-native-picker-select';
import { Category } from '../../../constant/types'
import { axios } from '../../../lib/axios'
import ImageSelector from '../../../components/imageSelector'
import DropdownComponent from '../../../components/dropdown'
import Btn from '../../../components/btn'
import CreateBusinessHourModal from '../../../components/service/modal'
import { useProvider } from '../../../hook/provider/provider'
import { showAlert } from '../../../constant/alert'
import { useNavigation } from '@react-navigation/native'


const CreateService = () => {
    const { CreateService } = useProvider()
    const navigate = useNavigation();
    const [image, setImage] = useState<string | null>(null);
    const [officialEmail, setOfficialEmail] = useState('')
    const [officialphoneNumber, setOfficialphoneNumber] = useState('')
    const [address, setAddress] = useState('')


    const handleCreateService = async () => {
        if (
            !officialEmail || !officialphoneNumber || !address || !image
        ) {
            Alert.alert("error", "All Field Are Required")
            return;
        }

        try {
            const payload = {
                image: image,
                official_phone_number: officialphoneNumber,
                official_email: officialEmail,
                address: address
            }
            await CreateService(payload)
            navigate.navigate("Create Offer")
        } catch (error: any) {
            console.log(error.response.data);
            showAlert(error.response.data.error)

        }

    }



    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>You're almost there!</Text>
                    <Text style={styles.body}>
                        Creating your provider account is quick and easy. This step ensures that you can showcase your services and connect with clients seamlessly.
                    </Text>
                    <Text style={styles.body}>
                        Take your time, and don’t worry — you can always update your information later! Let’s get started and set you up for success.
                    </Text>

                    <Input placeholder='Provider Official Email (Optional)' multiline={false} value={officialEmail} onChangeText={setOfficialEmail} />
                    <Input placeholder='Provider Official Phone Number (Optional)' multiline={false} value={officialphoneNumber} onChangeText={setOfficialphoneNumber} keyboardType='numeric' />

                    <ImageSelector image={image} setImage={setImage} />



                    <Input placeholder='Address (Optional)' multiline={false} value={address} onChangeText={setAddress} />



                    <View style={styles.notice}>
                        <Text style={styles.noticeHeader}>Important:</Text>
                        <Text style={styles.noticeMessage}>
                            If you do not fill in the email, phone number, and address fields, the details from your personal data will be automatically used.
                        </Text>
                    </View>

                    <Btn title={'Add Service'} onPress={handleCreateService} />
                </View>
            </ScrollView>

        </>
    )
}

export default CreateService

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: globalTheme.colors.background,
        gap: 20,
        borderRadius: 10,
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        margin: 10,
    },

    dropdown: {
        width: '100%',
        borderColor: globalTheme.colors.border,
        borderWidth: 1,
        borderRadius: 5
    },
    stock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    notice: {
        marginVertical: 15,
        padding: 15,
        backgroundColor: '#ffe9e9', // Light red background for emphasis
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ff6b6b',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    noticeHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d32f2f',
        marginBottom: 8,
    },
    noticeMessage: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 10,
    },
})