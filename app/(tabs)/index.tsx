import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Link style={{
        color: "white"
      }} href={"/(modals)/login"}>
        Login
      </Link>
      <Link style={{
        color:"white"
      }} href={"/(modals)/booking"}>
        Do bookings
      </Link>
    </View>
  )
}

export default index