import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const SomeComponent = () => {
    const {id} = useLocalSearchParams();
    console.log(id)
  return (
    <View>
      <Text>SomeComponent</Text>
    </View>
  )
}

export default SomeComponent