import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const _layout = () => {
  return (
      <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarLabel: 'Wishlist',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="airbnb" size={size} color={color} />,
        }}
      />
       <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons  name="message-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      </Tabs>
  )
}

export default _layout