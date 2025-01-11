import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../../context/userContext';
import { globalTheme } from '../../../constant/theme';
import Avatar from '../../../components/dashboard/avatar';
import SearchInput from '../../../components/searchInput';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../constant/types';
import { useProvider } from '../../../hook/provider/provider';
import ServiceCard from '../../../components/service/ServiceCard';

const Dashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(userContext);
  const { GetServices } = useProvider();
  const [services, setservices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        setLoading(true);
        const res = await GetServices();
        setservices(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    getAllServices();
  }, []);

  const handleClick = () => {
    if (user?.is_provider) {
      navigation.navigate("Create Offer");
      return;
    }
    Alert.alert(
      "Action Required",
      "You need to create a provider account before you can create an offer. Please set up your provider account to get started.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Create Provider Account", onPress: () => navigation.navigate("Create Provider Account") },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await GetServices();
      setservices(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar user={user} />
      <SearchInput />

      {services.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../../assets/icons/no-order.png')}
            alt="empty"
            style={styles.icon}
          />
          <Text style={styles.emptyText}>
            To get started, let's add your first service. This service will showcase what you offer to potential clients and help you stand out.
          </Text>
        </View>
      ) : (
        <View style={{ width: '100%', marginTop: 25 }}>
          <FlatList
            data={services}
            renderItem={({ item }) => <ServiceCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}

      <Pressable style={styles.addIconCon} onPress={handleClick}>
        <AntDesign name="plus" size={24} color={globalTheme.colors.primary} />
      </Pressable>
    </View>
  );
};

export default Dashboard;

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
  },
  addIconCon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 20,
    bottom: 30,
    borderRadius: 25,
    backgroundColor: globalTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
