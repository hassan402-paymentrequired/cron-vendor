import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownComponent from '../../../components/dropdown'
import Input from '../../../components/service/input'
import { Category } from '../../../constant/types'
import { globalTheme } from '../../../constant/theme'
import { axios } from '../../../lib/axios'
import CreateBusinessHourModal from '../../../components/service/modal'
import Btn from '../../../components/btn'
import ImageSelector from '../../../components/imageSelector'
import { useProvider } from '../../../hook/provider/provider'
import { showAlert } from '../../../constant/alert'
import Loading from '../../../components/loading'


const CreateOffer = () => {
  const { createOffer } = useProvider()
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isAvailable, setIsAvailable] = useState(false);
  const [category, setCategory] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [image, setImage] = useState(null)
  const [id, setId] = useState<string | number>('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const toggleSwitch = () => setIsAvailable(previousState => !previousState);



  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get("/provider/category");
        setCategories(data)
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    loadCategories()

  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    if (
      !name || !servicePrice || !image || !description || !category
    ) {
      setIsLoading(false)
      Alert.alert("Opps", "Please fill the neccessary fields")
      return;
    }



    const payload = {
      name: name,
      service: category,
      description: description,
      price: servicePrice,
      image: image
    }
    try {
      const id = await createOffer(payload)
      setId(id.message)
      setIsModalVisible(true)
    } catch (error: any) {
      console.log(error.response.data)
      showAlert(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Let's Create Your Offer! </Text>
          <Text style={styles.subheading}>You're just one step away from showcasing your services to potential clients. </Text>
          <Input placeholder='Service Name' value={name} onChangeText={setName} multiline={false} />
          <DropdownComponent data={categories} value={category} setValue={setCategory} />
          <Input
            placeholder='Describe the Service'
            multiline={true}
            numberOfLines={10}
            style={{
              height: 130,
              textAlignVertical: 'top',
            }}
            value={description} onChangeText={setDescription}
          />

          <ImageSelector image={image} setImage={setImage} />

          <Input placeholder='Service Price' value={servicePrice} onChangeText={setServicePrice} multiline={false} keyboardType='numeric' />

          {/* <View style={styles.stock}>
            <Text style={{ fontSize: 20 }}>
              Is this service available?
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: globalTheme.colors.miniprimary }}
              thumbColor={isAvailable ? globalTheme.colors.primary : '#f4f3f4'}
              ios_backgroundColor={globalTheme.colors.miniprimary}
              onValueChange={toggleSwitch}
              value={isAvailable}
            />
          </View> */}
          <Btn title={'Create Offer'} onPress={handleSubmit} />
        </View>
      </ScrollView>
      <CreateBusinessHourModal visible={isModalVisible} setVisible={setIsModalVisible} id={id} />
      <Loading show={isLoading} />
    </>
  )
}

export default CreateOffer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 20,
    backgroundColor: globalTheme.colors.background,
    gap: 12,
    borderRadius: 10,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10,
  },

  dropdown: {
    width: '100%',
    borderColor: globalTheme.colors.border,
    borderWidth: 1,
    borderRadius: 5
  },
  stock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subheading: {

  }


})