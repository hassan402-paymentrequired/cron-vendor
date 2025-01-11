import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalTheme } from '../../constant/theme'
import Ionicons from '@expo/vector-icons/Ionicons';
import { User } from '../../constant/types';

const Avatar = ({user}: any) => {
  return (
    <>
    <View style={styles.profile}>
            <View style={styles.avaterCon}>
              <View style={styles.avatar}>
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={styles.avatarImg}
                />
                <View style={styles.online} />
              </View>
              <View style={styles.user}>
                <Text style={styles.name}>{user?.first_name}</Text>
                <Text style={styles.greet}>Welcome to Cron</Text>
              </View>
            </View>
            <View>
              <Ionicons name="notifications" size={24} color="black" />
            </View>
          </View>
          </>
  )
}

export default Avatar

const styles = StyleSheet.create({
  online: {
    width: 10,
    height: 10,
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderRadius: 20,
    backgroundColor: globalTheme.colors.primary
  },
  avatarImg: {
    width: 50,
    height: 50,
    objectFit: 'cover',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  avaterCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',

  },
  name: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold'
  },
  greet: {
    fontSize: 15,
  }
})