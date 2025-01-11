import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import userContext from '../../../context/userContext';
import { globalTheme } from '../../../constant/theme';
import Avatar from '../../../components/dashboard/avatar';
import SearchInput from '../../../components/searchInput';
import Btn from '../../../components/btn';
import { useNavigation } from '@react-navigation/native';

const Order = () => {
  const { user } = useContext(userContext);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);


  if (loading) {
    return <Text>Loading orders....</Text>;
  }




  return (
    <View style={styles.container}>
      <Avatar user={user} />
      <SearchInput />


      {
        user?.is_provider ?
          (
            orders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={require('../../../assets/icons/no-order.png')}
                  alt='empty'
                  style={styles.icon}
                />
                <Text style={styles.emptyText}>No orders found for this provider.</Text>
              </View>
            ) : (
              <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.orderItem}>
                    {/*  */}
                  </View>
                )}
              />
            )
          )
          :
          (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../../assets/icons/no-order.png')}
                alt='empty'
                style={styles.icon}
              />
              <Text style={styles.emptyText}>It looks like you don't have a provider account yet.</Text>
              <Text style={styles.emptyText}>Click the button below to upgrade your account and start your journey as a provider!</Text>
              <Btn title={'Create Provider Account'} onPress={() => navigation.navigate("Create Provider Account")} />
            </View>
          )

      }
    </View >
  )
}

export default Order

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: globalTheme.colors.background,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
  icon: {
    width: 100,
    height: 100,
  }
})