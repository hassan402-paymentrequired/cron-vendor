import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalTheme } from '../../../constant/theme'
import InsightCard from '../../../components/insight/insightCard'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';


const Insight = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Insight</Text>

      <View style={styles.analityCon}>
        <InsightCard name='Total Sale' value='1,390' percent='10%' icon={<FontAwesome6 name="basket-shopping" size={24} color={globalTheme.colors.secondary} />} color={globalTheme.colors.miniSecondary} />
        <InsightCard name='Total Order Completed' value='1,320' percent='15%' icon={<FontAwesome6 name="basket-shopping" size={24} color={globalTheme.colors.primary} />} color={globalTheme.colors.miniprimary} />
        <InsightCard name='Order Cancelled' value='04' percent='3%' icon={<FontAwesome6 name="basket-shopping" size={24} color={globalTheme.colors.danger} />} color={globalTheme.colors.minidanger} bad={true} />

        {/* <View style={{alignItems: 'center', marginVertical: 20, marginTop: 20}}>
          <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Most Popular
            </Text>
            <Text style={{color: globalTheme.colors.primary}}>View all</Text>
          </View>

        </View> */}
      </View>
    </View>
  )
}

export default Insight

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalTheme.colors.background,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  analityCon: {
    width: '100%',
    flex: 1,
    // borderWidth: 1,
    marginTop: 10,

  }
})