import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const ListItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.ListItem}>
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  ListItem: {
    width: '100%',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 5
  }
})

export default ListItem