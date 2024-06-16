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
      <Link href={"/listing/12313"} style={{
        color: "white"
      }}>
      Testing route
      </Link>
    </View>
  )
}

export default index