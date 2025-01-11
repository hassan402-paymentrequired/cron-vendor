import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SplashScreen from './screens/onBoarding';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Verify from './screens/auth/Verify';
import TabLayout from './screens/(routes)/Navigation';
import { useAuth } from './hook/auth';
import UserContext from './context/userContext';
import { User } from './constant/types';
import CreateService from './screens/(routes)/Service/CreateService';
import WorkHour from './screens/(routes)/Service/workHour/workHour';
import CreateOffer from './screens/(routes)/Service/CreateOffer';

const Stack = createNativeStackNavigator();

export default function App() {
  // const navigation = useNavigation()
  const { loadUser } = useAuth()
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const data = await loadUser();
        setUser(data)
      }
      getUser();
    } catch (error: any) {
      console.log(error.response.data);

    }
  }, [])




  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator >
          {user ? (
            user?.is_verified ? (
              !user?.is_provider ? (
                <Stack.Screen name="Create Provider Account" component={CreateService} />
              )
                :
                (
                  <>
                    <Stack.Screen name="tab" component={TabLayout} options={{ headerShown: false }} />
                    <Stack.Screen name="Create Offer" component={CreateOffer} />
                    <Stack.Screen name="Add work hour" component={WorkHour} />

                  </>
                )

            ) : (
              <Stack.Screen name="Verify" component={Verify} />
            )

          ) : (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register}


              />

            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
