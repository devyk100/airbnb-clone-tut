import { View, Text, SafeAreaView, StyleSheet, Platform, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, useNavigation } from 'expo-router'

const Profile = () => {
  const {signOut} = useAuth()
  const {user} = useUser();
  const [dynamicUser, setDynamicUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0].emailAddress
  })
  const navigation = useNavigation()
  const [edit, setEdit] = useState(false)
  const saveNewUserValues = useCallback(async () => {
    try{
      user?.update({
        firstName: dynamicUser.firstName!,
        lastName: dynamicUser.lastName!
      })
    }
    catch(error){
      console.log("Errored", error)
    }
    finally{
      setEdit(value => !value)
    }
  }, [dynamicUser])

  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      if(edit) {
        event.preventDefault()
        return;
      }
      console.log(event.data)
      console.log("back pressed")
      // navigation.dispatch(event.data.action);

    })
  })
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Profile
        </Text>
        <Ionicons name='notifications' color={Colors.dark} size={24}/>
      </View>
      <SignedIn>
        <View style={styles.profileCard}>

          <TouchableOpacity>
            <Image source={{uri: user?.imageUrl}} style={styles.avatar} />
          </TouchableOpacity>

          {
            !edit? <>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>{dynamicUser.firstName} {dynamicUser.lastName}</Text>
                <TouchableOpacity onPress={() => {
                  setEdit(value => !value);
                }}>
                <Ionicons name='create-outline' size={24}/>
                </TouchableOpacity>
              </View>
            </>: <>
            <View style={styles.nameRow}>
                <TextInput style={[defaultStyles.inputField,styles.nameInput ]} defaultValue={dynamicUser.firstName!} onChangeText={(newValue: string) => setDynamicUser(value => ({
                  ...value, firstName: newValue
                }))}/>
                <TextInput style={[defaultStyles.inputField, styles.nameInput]} defaultValue={dynamicUser.lastName!} onChangeText={(newValue:string) => setDynamicUser(value => ({
                  ...value, lastName: newValue
                }))}/>
                <TouchableOpacity onPress={() => saveNewUserValues()}>
                  <Ionicons name='checkmark-circle-sharp' size={34}/>
                </TouchableOpacity>
            </View>
            </>
          }
          <View style={styles.infoContainer}>
              <Text>{dynamicUser.email}</Text>
              <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
          </View>
        </View>
        <SignedIn>
        <TouchableOpacity style={defaultStyles.btn} onPress={() => signOut()}><Text style={defaultStyles.btnText}>Logout</Text></TouchableOpacity>
        </SignedIn>    
      </SignedIn>

      <SignedOut>
        <Link href={"/(modals)/login"} asChild>
          <TouchableOpacity style={defaultStyles.btn}>
            <Text style={defaultStyles.btnText}>Login</Text>
          </TouchableOpacity>
          </Link>
      </SignedOut>


    </SafeAreaView>
  )
}

export default Profile



const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: Platform.OS === "android" ? 25 : 0,
    // alignItems: "center",

  },
  header: {
    fontSize: 18,
    fontFamily: "mon-b"
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBlockColor: Colors.grey
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    
    backgroundColor: Colors.grey
  },
  profileCard:{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 50
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap:10,
    alignItems: "center"
  },
  nameText: {
    fontSize: 18,
    fontFamily: "mon-sb",
    marginTop: 3
  },
  nameInput: {
    width: 100,
    marginHorizontal: 0
  },
  infoContainer: {

  }
})