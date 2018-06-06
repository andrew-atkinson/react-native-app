import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

import {LISTITEM_BLUE, WHITE} from '../assets/color'

const ListItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image resizeMode="contain" source={props.placeImage} style={styles.placeImage}/> 
      <Text style={styles.textItem}>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: LISTITEM_BLUE
  },
  placeImage: {
    marginRight:8,
    height:30,
    width:30
  },
  textItem: {
    fontFamily:'Merriweather-Regular',
    color: WHITE,
    fontSize: 30 
  }
})

export default ListItem