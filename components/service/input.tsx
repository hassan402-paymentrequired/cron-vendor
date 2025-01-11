import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { ServiceInput } from '../../constant/types'
import { globalTheme } from '../../constant/theme'

const Input = ({placeholder, value, onChangeText,multiline, numberOfLines,...props}: ServiceInput) => {
  return (
    <View style={styles.inputGroup}>
      <TextInput placeholder={placeholder} style={styles.input} multiline={multiline} numberOfLines={numberOfLines} value={value} onChangeText={onChangeText} {...props} placeholderTextColor={'black'} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputGroup:
    {
        width: '100%',
        borderColor: globalTheme.colors.border,
        borderWidth: 1,
        borderRadius: 5,
    },
    input:{
        height: 49,
        fontSize: 16,
        color: globalTheme.colors.text,
        paddingHorizontal: 10,
        
    }
})