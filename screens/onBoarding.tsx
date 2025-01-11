import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeAreaLayout from '../components/ui/SafeArea';
import Btn from '../components/btn';

type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
};

const SplashScreen = () => {
    const router = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    return (
        <SafeAreaLayout>
            <View style={styles.container}>
                <Text style={styles.logo}>Logo i</Text>
                <View style={styles.banner}>
                    <Image
                        source={require('../assets/images/pipeline.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.bannerText}>
                    <Text style={styles.title}>Get The Best Service At Your FingerTip</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                        amet nulla auctor, vestibulum magna sed, convallis ext.</Text>
                </View>
                <View style={{width:'100%', padding: 20}}>
                <Btn  onPress={() => router.navigate('Login')} title={'Get Started'}/>
                </View>
            </View>
        </SafeAreaLayout>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    logo: {
        marginTop: 30
    },
    banner: {
        width: '100%',
        height: 400,
        marginTop: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    bannerText: {
        flexDirection: 'column',
        alignItems: 'center',

    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        textAlign: 'center',
    },
 
});