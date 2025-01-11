import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

interface Props {
    children: React.ReactNode
}

const SafeAreaLayout = ({ children }: Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaLayout