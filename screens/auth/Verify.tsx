import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FormInputGroup from '../../components/form-input-group'
import Btn from '../../components/btn'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth } from '../../hook/auth'
import { showAlert } from '../../constant/alert'
import userContext from '../../context/userContext'


type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
};

const Verify = () => {
    const router = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { setUser } = useContext(userContext)
    const { verifyAccount, loadUser } = useAuth()

    const [countdown, setCountdown] = useState(60);
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleResend = async () => {
        setCountdown(60);
        // setLoading(true)
        // await requestNewCode()
        console.log('Resend code clicked');
    };

    const handleVerify = async () => {
        console.log(code);
        setLoading(true)
        try {
            const data = await verifyAccount(code)
            const user = await loadUser();
            setUser(user);
            Alert.alert("success", data.message)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            Alert.alert(error.response.data.message)
            showAlert(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text} >Verify Your Account</Text>
                <Text style={styles.subtext}>Please enter the verification code sent to your email</Text>
            </View>

            <FormInputGroup label="Confirm OTP" placeHolder="Enter OTP" value={code} onChangeText={(text) => setCode(text)} />

            <View style={{ width: '100%', flexDirection: 'column' }}>
                <Btn title={loading ? 'Verifying....' : 'Verify'} onPress={handleVerify} disabled={loading} />
                <View style={{
                    width: '90%', flexDirection: 'row', alignItems: 'center'
                }}>
                    <Text style={styles.forgot}>Didn't Receive Code?</Text>
                    {countdown > 0 ? (
                        <Text style={styles.forgotLink}> Resend ({countdown}s)</Text>
                    ) : (
                        <Pressable onPress={handleVerify} >
                            <Text style={styles.forgotLink}> Resend</Text>
                        </Pressable>
                    )}
                </View>
            </View>

        </View>
    )
}

export default Verify

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        fontSize: 30,
        color: '#000',
        // fontWeight: 'bold',
    },
    subtext: {
        fontSize: 15,
        color: '#000',
    },
    inputGroup: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        height: 45,
        marginVertical: 25
    },
    label: {
        fontSize: 15,
        marginVertical: 4
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        fontSize: 18
    },
    forgot: {
        fontSize: 15,
        marginTop: 4,
    },
    forgotLink: {
        fontSize: 15,
        marginTop: 4,
        color: 'green',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }

})

// #EAF9E7