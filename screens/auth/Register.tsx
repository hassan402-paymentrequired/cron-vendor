import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import FormInputGroup from '../../components/form-input-group'
import Btn from '../../components/btn'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth } from '../../hook/auth'
import { showAlert } from '../../constant/alert'
import userContext from '../../context/userContext'
import { globalTheme } from '../../constant/theme'
import Loading from '../../components/loading'


type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

const Register = () => {
  const router = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { register, loadUser } = useAuth();
  const { user, setUser } = useContext(userContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setphone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      password: password,
      password_confirmation: confirmPassword
    }

    
    try {
      await register(payload)
      const user = await loadUser();
      setUser(user)
    } catch (error: any) {
      console.log(error.response.data);
      showAlert(error.response.data.error);
    } finally {
      setLoading(false)
    }
  }



  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text} >Let Get You Started</Text>
        <Text style={styles.subtext}>Sign Up And Take Your Service To The World</Text>
      </View>


      <View style={{ width: '100%' }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
        </View>
      </View>




      <FormInputGroup label="Email" placeHolder="Enter your email" value={email} onChangeText={(text) => setEmail(text)} />
      <FormInputGroup label="Phone number" placeHolder="Enter your email" value={phone} onChangeText={(text) => setphone(text)} keyboardType='numeric' />



      <FormInputGroup label='Password' placeHolder="Enter your password" value={password} onChangeText={(text) => setPassword(text)} />
      <FormInputGroup label='Confirm Password' placeHolder="Comfirm password" value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} />




      <View style={{ width: '100%', flexDirection: 'column' }}>
        <Btn title={loading ? 'Register...' : 'Register'} onPress={handleRegister} disabled={loading} />
        <View style={{
          width: '90%', flexDirection: 'row', alignItems: 'center'
        }}>
          <Text style={styles.forgot}>Already have an account?</Text>
          <Pressable onPress={() => router.navigate("Login")} >
            <Text style={styles.forgotLink}> Login</Text>
          </Pressable>
        </View>
      </View>

    </View>
    <Loading show={loading} />
    </>
  )
}

export default Register
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
  },
  input: {
    borderWidth: 1,
    borderColor: globalTheme.colors.border,
    borderRadius: 5,
    height: 49,
    fontSize: 16,
    paddingHorizontal: 10
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },

})

// #EAF9E7
