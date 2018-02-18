import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

const DefaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
  />
)

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth:1,
    borderColor: "#eee",
    margin:5,
    padding:4
  }
})

export default DefaultInput