import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { globalTheme } from '../constant/theme'

interface Props {
  label?: string,
  placeHolder: string,
  value?: string,
  onChangeText?: (text: string) => void
}

const FormInputGroup = ({ label, placeHolder, value, onChangeText, ...rest }: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputGroup}>

        <TextInput style={styles.input} placeholder={placeHolder} value={value} onChangeText={onChangeText} {...rest}  />
      </View>
    </View>
  )
}

export default FormInputGroup

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10
  },
  inputGroup:
  {
    width: '100%',
    borderColor: globalTheme.colors.border,
    borderWidth: 1,
    borderRadius: 5,
    // backgroundColor: globalTheme.colors.background
  },
  input: {
    height: 49,
    fontSize: 16,
    color: globalTheme.colors.text,
    paddingHorizontal: 10
  },
  label: {
    fontSize: 15,
    marginVertical: 4
  },
})