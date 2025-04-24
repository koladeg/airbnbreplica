import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Colors from '@/constants/Colors'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import { useRouter } from 'expo-router'

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}


const Page = () => {

  const router = useRouter();
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO()

  const onSelectAuth = useCallback(
    async (strategy: Strategy) => {
      try {
        const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
          strategy,
          // for Expo web: current URL; for native: supply your scheme
          // redirectUrl: AuthSession.makeRedirectUri({ useProxy: true }),
        });

        if (createdSessionId) {
          // success
          setActive!({ session: createdSessionId });
          router.back();
        } 
      } catch (err) {
        console.error('OAuth error', err);
      }
    },
    [startSSOFlow, router]
  );

  // const onPress = useCallback(async () => {
  //   try {
  //     // Start the authentication process by calling `startSSOFlow()`
  //     const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
  //       strategy: 'oauth_google',
  //       // For web, defaults to current path
  //       // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
  //       // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
  //       redirectUrl: AuthSession.makeRedirectUri(),
  //     })

  //     // If sign in was successful, set the active session
  //     if (createdSessionId) {
  //       setActive!({ session: createdSessionId })
  //       router.back();
  //     }
  //   } catch (err) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error('OAuth error', JSON.stringify(err, null, 2))
  //   }
  // }, [])

  // const { startOAuthFlow: googleAuth } = useSSO({ strategy: 'oauth_google' });
  //   const { startOAuthFlow: appleAuth } = useSSO({ strategy: 'oauth_apple' });
  //   const { startOAuthFlow: facebookAuth } = useSSO({ strategy: 'oauth_facebook' });
  
    // const onSelectAuth = async (strategy: Strategy) => {
    //   const selectedAuth = {
    //     [Strategy.Google]: googleAuth,
    //     [Strategy.Apple]: appleAuth,
    //     [Strategy.Facebook]: facebookAuth,
    //   }[strategy];
  
    //   try {
    //     const { createdSessionId, setActive } = await selectedAuth();
  
    //     if (createdSessionId) {
    //       setActive!({ session: createdSessionId });
    //       router.back();
    //     }
    //   } catch (err) {
    //     console.error('OAuth error', err);
    //   }
    // };

  return (
    <View style={styles.container}>
      
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});