import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ListItem = (props) => (
  <View style={styles.ListItem}>
    <Text>{props.placeName}</Text>
  </View>
)

const styles = StyleSheet.create({
  ListItem:{
    width:'100%',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 5
  }
})

export default ListItem