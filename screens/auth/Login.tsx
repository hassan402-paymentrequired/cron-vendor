import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import FormInputGroup from '../../components/form-input-group'
import Btn from '../../components/btn'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth } from '../../hook/auth'
import { showAlert } from '../../constant/alert'
import userContext from '../../context/userContext'
import { RootStackParamList } from '../../constant/types'
import Loading from '../../components/loading'


const Login = () => {
  const router = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { user, setUser } = useContext(userContext)
  const { login, loadUser } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const payload = {
        email: email,
        password: password,
      }
      await login(payload)

      const user = await loadUser();
      setUser(user)
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.message) {
        Alert.alert('error', error.response.data.message)
      }
      showAlert(error.response.data.error)

    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text} >Welcome Back</Text>
          <Text style={styles.subtext}>Login Into Your Account</Text>
        </View>

        <FormInputGroup label="Email" placeHolder="Enter your email" value={email} onChangeText={(text) => setEmail(text)} />
        <View style={{ width: '100%' }}>
          <FormInputGroup label='Password' placeHolder="Enter your password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        </View>


        <View style={{ width: '100%', flexDirection: 'column' }}>
          <Btn title={isLoading ? 'Login...' : 'Login'} onPress={handleLogin} disabled={isLoading} />
          <View style={{
            width: '90%', flexDirection: 'row', alignItems: 'center'
          }}>
            <Text style={styles.forgot}>Don't have an account?</Text>
            <Pressable onPress={() => router.navigate("Register")} >
              <Text style={styles.forgotLink}> Sign Up</Text>
            </Pressable>
            {/* <Pressable onPress={() => router.navigate("tab")} >
            <Text style={styles.forgotLink}> Otp Up</Text>
          </Pressable> */}
          </View>
        </View>

      </View>
      <Loading show={isLoading} />
    </>
  )
}

export default Login

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