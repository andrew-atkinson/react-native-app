import React, {Component} from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import DefaultInput from './UI/DefaultInput'

const PlaceInput = props => (
  <DefaultInput
    placeholder="Place Name"
    value={props.placeName}
    onChangeText={props.onChangeText}
    {...props}
  />
)

export default PlaceInput
