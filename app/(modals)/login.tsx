import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';



enum OAuthStrat{
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook"
}

const Login = () => {
  useWarmUpBrowser();
  const router = useRouter()
  const {startOAuthFlow: googleAuthFlow} = useOAuth({strategy: "oauth_google"})
  const {startOAuthFlow: facebookAuthFlow} = useOAuth({strategy: "oauth_facebook"})
  const {startOAuthFlow: appleAuthFlow} = useOAuth({strategy: "oauth_apple"})
  const onSelectAuth = async (oAuthStrategy : OAuthStrat) => {
    const flowVar = {
      "oauth_google": googleAuthFlow,
      "oauth_facebook": facebookAuthFlow,
      "oauth_apple": appleAuthFlow
    }[oAuthStrategy];
    try{
      const {createdSessionId, authSessionResult, setActive} = await flowVar();
      if(createdSessionId){
        await setActive!({session: createdSessionId});
        console.log(authSessionResult)
        router.back()
      }
    }
    catch(error){
      console.error(error)
    }
  }
  return (
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='email' style={[defaultStyles.inputField, {
        marginBottom: 30
      }]}></TextInput>
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>
          Continue
        </Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View style={styles.seperatorLine}></View>
        <Text style={{
          fontFamily: "mon-sb",
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: "center",
          color: "black",
          fontSize: 14
        }}
        >or</Text>
        <View style={styles.seperatorLine}></View>
      </View>


        <View style={{
          marginTop: 30,
          gap: 10
        }}>
            <TouchableOpacity style={defaultStyles.btnOutline}>
              <Text style={defaultStyles.btnOutlineText}>Continue with phone</Text>
              <Ionicons name='mail-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyles.btnOutline} onPress={() => onSelectAuth(OAuthStrat.Google)}>
              <Text style={defaultStyles.btnOutlineText}>Continue with Google</Text>
              <Ionicons name='logo-google' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyles.btnOutline} onPress={() => onSelectAuth(OAuthStrat.Facebook)}>
              <Text style={defaultStyles.btnOutlineText}>
                Continue with Facebook
              </Text>
              <Ionicons name='logo-facebook' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity style={defaultStyles.btnOutline} onPress={() => onSelectAuth(OAuthStrat.Apple)}>
              <Text style={defaultStyles.btnOutlineText}>
                Continue with Apple
              </Text>
              <Ionicons name='logo-apple' size={24}/>
            </TouchableOpacity>
        </View>


    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: "100%",
    justifyContent: "center",
    // alignItems: ".center"
  },
  seperatorView:{
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10
  },
  seperator: {

  },
  seperatorLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    flex: 1
  }
})