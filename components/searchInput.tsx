import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { globalTheme } from '../constant/theme'

const SearchInput = () => {
    return (
        <View style={styles.searchCon}>
            <View style={styles.searchInput}>
                <TextInput style={styles.input} placeholder='Search' />
            </View>
            {/* icon */}
            <Image
                source={require('../assets/icons/sort.png')}
            />
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    input: {
    height: 45,
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 18
  },
  searchInput: {
    backgroundColor: globalTheme.colors.background,
    // borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
    // borderColor: globalTheme.colors.gray,
    borderRadius: 5,
    shadowOpacity: 0.5,
    elevation: 2
  },
  searchCon: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    gap: 15
  },
})