import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

const ListItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image resizeMode="contain" source={props.placeImage} style={styles.placeImage}/> 
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 5,
    flexDirection:"row",
    alignItems:"center"
  },
  placeImage: {
    marginRight:8,
    height:30,
    width:30
  }
})

export default ListItem