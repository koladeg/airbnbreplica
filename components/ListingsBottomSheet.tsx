import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

interface Props {
    listings: any[];
    category: string;
  }

const ListingsBottomSheet = ({ listings, category }: Props) => {
  return (
    <View>
      <Text>ListingsBottomSheet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});


export default ListingsBottomSheet