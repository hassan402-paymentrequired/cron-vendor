import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Order from './Order/Order';
import Insight from './Insight/Insight';
import Dashboard from './Service/service';
import Profile from './Profile/Profile';
import { globalTheme } from '../../constant/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { BlurView } from 'expo-blur';
import { Text } from 'react-native';


const Tab = createBottomTabNavigator();
export default function TabLayout() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarBadgeStyle: '',
                tabBarHideOnKeyboard: true,
                tabBarBackground: () => (
                    <BlurView tint="light" intensity={100} />
                ),
                tabBarStyle: {
                    backgroundColor: globalTheme.colors.background,
                    padding: 10,
                    height: 70,
                    borderTopColor: 'red',
                    overflow: 'hidden',
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    paddingTop: 5,
                    borderColor: '#066AD8',
                },
            })}
        >


            <Tab.Screen name="order" component={Order}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name="basket-outline"
                            size={20}
                            color={focused ? globalTheme.colors.primary : globalTheme.colors.text}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? globalTheme.colors.primary : globalTheme.colors.text,
                                fontSize: 12,
                                fontWeight: focused ? 'bold' : 'normal',
                            }}
                        >
                            order
                        </Text>
                    ),
                }}
            />

            <Tab.Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons
                            name="home-repair-service"
                            size={20}
                            color={focused ? globalTheme.colors.primary : globalTheme.colors.text}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? globalTheme.colors.primary : globalTheme.colors.text,
                                fontSize: 12,
                                fontWeight: focused ? 'bold' : 'normal',
                            }}
                        >
                            Service
                        </Text>
                    ),
                }}
            />

            <Tab.Screen name="insight" component={Insight}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name="stats-chart-outline"
                            size={20}
                            color={focused ? globalTheme.colors.primary : globalTheme.colors.text}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? globalTheme.colors.primary : globalTheme.colors.text,
                                fontSize: 12,
                                fontWeight: focused ? 'bold' : 'normal',
                            }}
                        >
                            insight
                        </Text>
                    ),
                }}
            />
            <Tab.Screen name="profile" component={Profile}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome
                            name="user-o"
                            size={20}
                            color={focused ? globalTheme.colors.primary : globalTheme.colors.text}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                color: focused ? globalTheme.colors.primary : globalTheme.colors.text,
                                fontSize: 12,
                                fontWeight: focused ? 'bold' : 'normal',
                            }}
                        >
                            profile
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
