import { View, Text } from 'react-native'
import React from 'react'
import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Button } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const Page = () => {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  return (
    <View>
      {isSignedIn && <Button title="Log Out" onPress={() => signOut()} color={Colors.dark} />}
      {!isSignedIn && (
        <Link href={'/(modals)/login'} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )}
    </View>
  )
}

export default Page