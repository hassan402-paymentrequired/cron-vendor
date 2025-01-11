import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native';
import React from 'react';
import { ModalProp } from '../../constant/types';
import { BlurView } from 'expo-blur';
import { globalTheme } from '../../constant/theme';
import Btn from '../btn';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const CreateBusinessHourModal = ({ visible, setVisible, id }: ModalProp) => {
    const navigation = useNavigation()

    const handlePress = () => {
        navigation.navigate('Add work hour', { serviceId: id });
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={() => setVisible(!visible)}
            transparent={true}
        >
            <View style={styles.container}>
                <BlurView intensity={50} style={StyleSheet.absoluteFill} tint="dark" />

                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/icons/success.png')}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.title}>Service Added</Text>
                    <Text style={styles.subtitle}>Your service has been added to the list and is visible to all users.</Text>

                    <Text style={styles.question}>
                        Would you like to add the working hours now or continue and add them later?
                    </Text>


                    <Btn title={'Add Working Hours'} onPress={handlePress} />
                    <Pressable onPress={() => navigation.navigate("tab")}>
                        <Text style={styles.closeText}>Continue and Add Later</Text>
                    </Pressable>

                </View>
            </View>
        </Modal>
    );
};

export default CreateBusinessHourModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    question: {
        fontSize: 16,
        color: '#555',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 350,
        backgroundColor: globalTheme.colors.background,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    closeText: {
        marginVertical: 15,
        color: globalTheme.colors.primary,
        fontWeight: 'bold',
    },
    header: {
        justifyContent: 'center',
        backgroundColor: globalTheme.colors.miniprimary,
        borderRadius: 50,
        alignItems: 'center',
        height: 100,
        width: 100
    },
    image: {
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
    },
});
