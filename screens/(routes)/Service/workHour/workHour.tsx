import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Btn from '../../../../components/btn';
import { useProvider } from '../../../../hook/provider/provider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../constant/types';

const WorkHour = ({ route }) => {
  const router = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { AddWorkingHour } = useProvider()
  const { serviceId } = route.params;
  console.log(serviceId);

  const [workHours, setWorkHours] = useState(
    Array(7).fill(null).map((_, index) => ({
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index],
      openTime: new Date(),
      closeTime: new Date(),
      isAvailable: index !== 0,
      error: '',
    }))
  );

  const [showPicker, setShowPicker] = useState({ index: null, type: null });

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const onTimeChange = (event, selectedTime, index, type) => {
    if (selectedTime) {
      setWorkHours((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            if (type === 'closeTime' && selectedTime <= item.openTime) {
              return { ...item, error: 'End time must be later than start time.' };
            }
            return {
              ...item,
              [type]: selectedTime,
              error: type === 'closeTime' ? '' : item.error
            };
          }
          return item;
        })
      );
    }
    setShowPicker({ index: null, type: null });
  };

  const toggleAvailability = (index) => {
    setWorkHours((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...item, isAvailable: !item.isAvailable };
        }
        return item;
      })
    );
  };

  const handleSubmit = async () => {
    const errors = workHours.filter((item) => !item.isAvailable && item.error);
    if (errors.length > 0) {
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
    } else {
      const weekDays = workHours.map(({ day, openTime, closeTime, isAvailable }) => ({
        day,
        open_time: isAvailable ? formatTime(openTime) : '',
        close_time: isAvailable ? formatTime(closeTime) : '',
        is_available: isAvailable,
        provider_offer_id: serviceId,
      }));

      const payload = { week_days: weekDays }

      try {
        await AddWorkingHour(payload);
        Alert.alert('Success', 'Working hours added successfully.');
        router.navigate("tab")
      } catch (error: any) {
        console.log(error.response.data);

      }

    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Operation Time</Text>
      </View>

      {workHours.map((item, index) => (
        <View key={index} style={[styles.inputGroup, !item.isAvailable && styles.disabled]}>
          <Text style={styles.label}>{item.day}</Text>

          <Switch
            value={item.isAvailable}
            onValueChange={() => toggleAvailability(index)}
          />

          {item.isAvailable && (
            <>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowPicker({ index, type: 'openTime' })}
              >
                <Text>{formatTime(item.openTime)}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowPicker({ index, type: 'closeTime' })}
              >
                <Text>{formatTime(item.closeTime)}</Text>
              </TouchableOpacity>
            </>
          )}

          {!item.isAvailable && (
            <Text style={styles.disabledText}>Closed</Text>
          )}

          {showPicker.index === index && showPicker.type && (
            <DateTimePicker
              mode="time"
              value={item[showPicker.type]}
              onChange={(event, selectedTime) =>
                onTimeChange(event, selectedTime, index, showPicker.type)
              }
              is24Hour={false}
            />
          )}

          {item.error ? <Text style={styles.error}>{item.error}</Text> : null}
        </View>
      ))}

      <Btn title={'Add Working Time'} onPress={handleSubmit} />

      <Text style={styles.serviceId}>WorkHour: {serviceId}</Text>
    </ScrollView>
  );
};

export default WorkHour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    flex: 1,
  },
  disabledText: {
    color: 'gray',
    fontSize: 14,
    flex: 1,
  },
  serviceId: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
