import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: "mon-sb"
      }
    }}>
      <Tabs.Screen name='index' options={{
        tabBarLabel: "Explore",
        tabBarIcon: ({color, size}) => <Ionicons name="search" {...{color, size}}/>
      }}/>
      <Tabs.Screen name='wishlists' options={{
        tabBarLabel: "Wishlists", 
        tabBarIcon: ({size, color}) => <Ionicons name='heart-outline' {...{color, size}}/>
      }}/>
      <Tabs.Screen name='trips' options={{
        tabBarLabel: "Trips",
        tabBarIcon: ({size, color}) => <FontAwesome5 name="airbnb" {...{color, size}}/>
      }}/>
      <Tabs.Screen name='inbox' options={{
        tabBarLabel: "Inbox",
        tabBarIcon: ({size, color}) => <MaterialCommunityIcons name='message-outline' {...{color, size}}/>
      }}/>
      <Tabs.Screen name='profile' options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({size, color}) => <Ionicons name='person-circle-outline' {...{color, size}}/>
      }}/>
    </Tabs>
  )
}

export default Layout